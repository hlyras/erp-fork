$(function(){
	$("#feedstock-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('feedstock-create-form').elements.namedItem("submit").disabled = true;

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: '/feedstock/save',
			method: 'post',
			data: $("#feedstock-create-form").serialize(),
			success: (response) => {
				if(API.verifyResponse(response, "feedstock-create-form")){return};
				
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);
				
				document.getElementById("feedstock-filter-form").elements.namedItem('name').value = document.getElementById("feedstock-create-form").elements.namedItem('name').value;
				
				document.getElementById("feedstock-create-form").elements.namedItem('id').value = "";
				document.getElementById("feedstock-create-form").elements.namedItem('feedstock_code').value = "";
				document.getElementById("feedstock-create-form").elements.namedItem('name').value = "";
				document.getElementById("feedstock-create-form").elements.namedItem('color').value = "";
				document.getElementById("feedstock-create-form").elements.namedItem('standard').value = "";
				document.getElementById("feedstock-create-form").elements.namedItem('uom').value = "";

				document.getElementById('feedstock-create-form').elements.namedItem("submit").disabled = false;
				$("#feedstock-filter-form").submit();
			}
		});
	});
	
	$("#feedstock-filter-form").on('submit', (event) => {
		event.preventDefault();

		let location = document.getElementById("feedstock-filter-form").elements.namedItem('location').value;
		let code = document.getElementById("feedstock-filter-form").elements.namedItem('feedstock_code').value;
		let name = document.getElementById("feedstock-filter-form").elements.namedItem('name').value;
		let color = document.getElementById("feedstock-filter-form").elements.namedItem('color').value;

		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: "/feedstock/filter?name="+name+"&code="+code+"&color="+color,
			method: 'get',
			success: (response) => {
				if(API.verifyResponse(response)){return};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				var pageSize = 10;
				var page = 0;

				function paging(){
					if(response.feedstocks.length){
						if(location==="feedstockAdmin"){
							renderAdminFeedstocks(response.feedstocks, pageSize, page, location);
						} else if (location==="feedstockCatalog"){
							renderFeedstocks(response.feedstocks, pageSize, page, location);
						} else if (location==="productAddFeedstock"){
							fillFeedstockSelect(response.feedstocks, document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_id'));
						} else if (location==="feedstockSupplierAddFeedstock"){
							fillFeedstockSelect(response.feedstocks, document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('feedstock_id'));
						} else if (location==="feedstockRequest"){
							fillFeedstockSelect(response.feedstocks, document.getElementById("feedstock-request-kart-form").elements.namedItem('feedstock_id'));
						} else if (location==="feedstockRegress"){
							fillFeedstockSelect(response.feedstocks, document.getElementById("feedstock-regress-kart-form").elements.namedItem('feedstock_id'));
						};
					} else {
						if(location==="feedstockAdmin"){
							lib.clearTable('feedstock-admin-filter-tbl', location);
						} else if (location==="feedstockCatalog"){
							lib.clearTable('feedstock-catalog-filter-tbl', location);
						} else if (location==="productAddFeedstock"){
							lib.clearSelect(document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_id'));
						} else if (location==="feedstockSupplierAddFeedstock"){
							lib.clearSelect(document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('feedstock_id'));
						} else if (location==="feedstockRequest"){
							lib.clearSelect(document.getElementById("feedstock-request-kart-form").elements.namedItem('feedstock_id'));
						} else if (location==="feedstockRegress"){
							lib.clearSelect(document.getElementById("feedstock-regress-kart-form").elements.namedItem('feedstock_id'));
						};
					};
				};

				function buttonsPaging(){
					$("#"+location+"Next").prop('disabled', response.feedstocks.length <= pageSize || page >= response.feedstocks.length / pageSize - 1);
					$("#"+location+"Previous").prop('disabled', response.feedstocks.length <= pageSize || page == 0);
				};

				$(function(){
				    $("#"+location+"Next").click(function(){
				        if(page < response.feedstocks.length / pageSize - 1){
				            page++;
				            paging();
				            buttonsPaging();
				        };
				    });
				    $("#"+location+"Previous").click(function(){
				        if(page > 0){
				            page--;
				            paging();
				            buttonsPaging();
				        };
				    });
				    paging();
				    buttonsPaging();
				});
			}
		});
	});
});

function editFeedstock(id){
	document.getElementById('ajax-loader').style.visibility = 'visible';
	$.ajax({
		url: '/feedstock/id/'+id,
		method: 'get',
		success: (feedstock) => {
			document.getElementById('feedstock-create-form').style.display = "block";

			document.getElementById("feedstock-create-form").elements.namedItem('id').value = feedstock[0].id;
			document.getElementById("feedstock-create-form").elements.namedItem('feedstock_code').value = feedstock[0].code;
			document.getElementById("feedstock-create-form").elements.namedItem('name').value = feedstock[0].name;
			document.getElementById("feedstock-create-form").elements.namedItem('color').value = feedstock[0].color;
			document.getElementById("feedstock-create-form").elements.namedItem('standard').value = feedstock[0].standard;
			document.getElementById("feedstock-create-form").elements.namedItem('uom').value = feedstock[0].uom;
			
			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function removeFeedstock(id){
	let r = confirm('Deseja realmente excluir a matéria prima?');

	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: '/feedstock/remove?id='+id,
			method: 'delete',
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);
				$("#feedstock-filter-form").submit();
			}
		});
	};
};