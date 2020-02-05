$(() => {
	$("#feedstock-storage-create-form").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById("feedstock-storage-create-submit").disabled = true;

		var name = document.getElementById('feedstock-storage-create-form').elements.namedItem("name").value;

		if(name.length < 3 || name.length > 20){
			document.getElementById('feedstock-storage-create-form').elements.namedItem("name").value = "";
			document.getElementById("feedstock-storage-create-submit").disabled = false;
			return alert("Nome de estoque inválido!");
		};

		let r = confirm('Realmente deseja criar um novo estoque para as matérias-primas?');

		if(r){
			$.ajax({
				url: '/feedstock/storage/create',
				method: 'post',
				data: $("#feedstock-storage-create-form").serialize(),
				success: (response) => {
					if(response.unauthorized){
						alert(response.unauthorized);
						window.location.href = '/login';
						return;
					};
					
					if(response.msg){
						alert(response.msg);
						return document.getElementById('feedstock-storage-create-submit').disabled = false;
					};

					alert(response.done);
					document.getElementById('feedstock-storage-create-form').elements.namedItem("name").value = "";
					document.getElementById("feedstock-storage-create-submit").disabled = false;
				}
			});
		} else {
			return document.getElementById("feedstock-storage-create-submit").disabled = false;
		}
	});

	$("#feedstock-storage-filter-form").on('submit', (event) => {
		event.preventDefault();
		let btn = $(this);btn.attr('disabled', true);

		let location = document.getElementById("feedstock-storage-filter-form").elements.namedItem('location').value;
		let storage = document.getElementById("feedstock-storage-filter-form").elements.namedItem('storage').value;
		let code = document.getElementById("feedstock-storage-filter-form").elements.namedItem('feedstock_code').value;
		let name = document.getElementById("feedstock-storage-filter-form").elements.namedItem('name').value;
		let color = document.getElementById("feedstock-storage-filter-form").elements.namedItem('color').value;

		document.getElementById('ajax-loader').style.display = 'block';

		$.ajax({
			url: "/feedstock/storage/filter?storage="+storage+"&name="+name+"&code="+code+"&color="+color,
			method: 'get',
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					return window.location.href = '/login';
				};

				document.getElementById('ajax-loader').style.display = 'none';

				for(i in response.storageFeedstocks){
					for(j in response.feedstocks){
						if(response.storageFeedstocks[i].feedstock_id == response.feedstocks[j].id){
							response.storageFeedstocks[i].code = response.feedstocks[j].code;
							response.storageFeedstocks[i].name = response.feedstocks[j].name;
							response.storageFeedstocks[i].color = response.feedstocks[j].color;
							response.storageFeedstocks[i].uom = response.feedstocks[j].uom;
						};
					};
				};

				var pageSize = 10;
				var page = 0;

				function paging(){
					if(response.storageFeedstocks.length){
						if(location==="feedstockStorageAdmin"){
							renderAdminFeedstockStorage(response.storageFeedstocks, pageSize, page, location);
						};
					} else {
						if(location==="feedstockStorageAdmin"){
							lib.clearTable('feedstock-storage-admin-filter-tbl', location);
						};
					};
				};

				btn.attr('disabled', false);

				function buttonsPaging(){
					$("#"+location+"Next").prop('disabled', response.storageFeedstocks.length <= pageSize || page >= response.storageFeedstocks.length / pageSize - 1);
					$("#"+location+"Previous").prop('disabled', response.storageFeedstocks.length <= pageSize || page == 0);
				};

				$(function(){
				    $("#"+location+"Next").click(function(){
				        if(page < response.storageFeedstocks.length / pageSize - 1){
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

	$("#feedstock-storages-list-form").on('submit', (event) => {
		event.preventDefault();
		let btn = $(this);btn.attr('disabled', true);

		let location = document.getElementById("feedstock-storages-filter-form").elements.namedItem('location').value;

		$.ajax({
			url: "/feedstock/storage/list",
			method: 'get',
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					return window.location.href = '/login';
				};

				var pageSize = 10;
				var page = 0;

				function paging(){
					if(response.storages.length){
						if(location==="feedstockStorageAdmin"){
							renderFeedstockStorages(response.storages, pageSize, page, location);
						};
					} else {
						if(location==="feedstockStorageAdmin"){
							lib.clearTable('feedstock-storage-admin-filter-tbl', location);
						};
					};
				};

				btn.attr('disabled', false);

				function buttonsPaging(){
					$("#"+location+"Next").prop('disabled', response.storages.length <= pageSize || page >= response.storages.length / pageSize - 1);
					$("#"+location+"Previous").prop('disabled', response.storages.length <= pageSize || page == 0);
				};

				$(function(){
				    $("#"+location+"Next").click(function(){
				        if(page < response.storages.length / pageSize - 1){
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

function renderAdminFeedstockStorage(feedstocks, pageSize, page){
	var html = "<tr>";
	html += "<td>Estoque</td>";
	html += "<td>Cód</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Qtd</td>";
	html += "<td>Un.med</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < feedstocks.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		// html += "<td><a class='tbl-show-link' onclick='showProduct("+feedstocks[i].id+", "+true+")'>"+feedstocks[i].code+"</a></td>";
		html += "<td>"+feedstocks[i].storage_id+"</td>";
		html += "<td>"+feedstocks[i].code+"</td>";
		html += "<td>"+feedstocks[i].name+"</td>";
		html += "<td>"+feedstocks[i].color+"</td>";
		html += "<td>"+feedstocks[i].amount+"</td>";
		html += "<td>"+feedstocks[i].uom+"</td>";
		html += "</tr>";
	};
	document.getElementById('feedstock-storage-admin-filter-tbl').innerHTML = html;
	document.getElementById('feedstock-storage-admin-filter-div').style.display = 'block';
	$('#feedstockStorageAdminPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(feedstocks.length / pageSize));
};

function renderFeedstockStorages(feedstocks, pageSize, page){
	var html = "<tr>";
	html += "<td>Estoque</td>";
	html += "<td>Cód</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Qtd</td>";
	html += "<td>Un.med</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < feedstocks.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		// html += "<td><a class='tbl-show-link' onclick='showProduct("+feedstocks[i].id+", "+true+")'>"+feedstocks[i].code+"</a></td>";
		html += "<td>"+feedstocks[i].storage_id+"</td>";
		html += "<td>"+feedstocks[i].code+"</td>";
		html += "<td>"+feedstocks[i].name+"</td>";
		html += "<td>"+feedstocks[i].color+"</td>";
		html += "<td>"+feedstocks[i].amount+"</td>";
		html += "<td>"+feedstocks[i].uom+"</td>";
		html += "</tr>";
	};
	document.getElementById('feedstock-storage-admin-filter-tbl').innerHTML = html;
	document.getElementById('feedstock-storage-admin-filter-div').style.display = 'block';
	$('#feedstockStorageAdminPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(feedstocks.length / pageSize));
};