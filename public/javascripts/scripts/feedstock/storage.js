$(() => {
	$("#feedstock-storage-create-form").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById("feedstock-storage-create-submit").disabled = true;

		var name = document.getElementById('feedstock-storage-create-form').elements.namedItem("name").value;

		if(name.length < 3 || name.length > 30){
			document.getElementById('feedstock-storage-create-form').elements.namedItem("name").value = "";
			document.getElementById("feedstock-storage-create-submit").disabled = false;
			return alert("Nome de estoque inválido!");
		};

		let r = confirm('Realmente deseja criar um novo estoque para as matérias-primas?');

		if(r){
			document.getElementById('ajax-loader').style.visibility = 'visible';
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
						document.getElementById('ajax-loader').style.visibility = 'hidden';
						alert(response.msg);
						return document.getElementById('feedstock-storage-create-submit').disabled = false;
					};

					document.getElementById('ajax-loader').style.visibility = 'hidden';

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
		document.getElementById('feedstock-storage-filter-submit').disabled = true;

		let location = document.getElementById("feedstock-storage-filter-form").elements.namedItem('location').value;
		let storage = document.getElementById("feedstock-storage-filter-form").elements.namedItem('storage').value;
		let code = document.getElementById("feedstock-storage-filter-form").elements.namedItem('feedstock_code').value;
		let name = document.getElementById("feedstock-storage-filter-form").elements.namedItem('name').value;
		let color = document.getElementById("feedstock-storage-filter-form").elements.namedItem('color').value;

		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: "/feedstock/storage/filter?storage="+storage+"&name="+name+"&code="+code+"&color="+color,
			method: 'get',
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					return window.location.href = '/login';
				};

				for(i in response.storageFeedstocks){
					for(j in response.feedstocks){
						if(response.storageFeedstocks[i].feedstock_id == response.feedstocks[j].id){
							response.storageFeedstocks[i].code = response.feedstocks[j].code;
							response.storageFeedstocks[i].name = response.feedstocks[j].name;
							response.storageFeedstocks[i].color = response.feedstocks[j].color;
							response.storageFeedstocks[i].standard = response.feedstocks[j].standard;
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
						} else if(location==="feedstockStorage"){
							renderFeedstockStorage(response.storageFeedstocks, pageSize, page, location);
						};
					} else {
						if(location==="feedstockStorageAdmin"){
							lib.clearTable('feedstock-storage-admin-filter-tbl', location);
						} else if(location==="feedstockStorage"){
							lib.clearTable('feedstock-storage-filter-tbl', location);
						};
					};
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				document.getElementById('feedstock-storage-filter-submit').disabled = false;

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
});

function renderFeedstockStorage(feedstocks, pageSize, page, location){
	var html = "<tr>";
	html += "<td>Estoque</td>";
	html += "<td>Cód</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Qtd</td>";
	html += "<td>Rolo/Caixa</td>";
	html += "<td>Un.m</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < feedstocks.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		// html += "<td><a class='tbl-show-link' onclick='showProduct("+feedstocks[i].id+", "+true+")'>"+feedstocks[i].code+"</a></td>";
		html += "<td class='nowrap'>"+feedstocks[i].storage_id+"</td>";
		html += "<td class='nowrap'>"+feedstocks[i].code+"</td>";
		html += "<td>"+feedstocks[i].name+"</td>";
		html += "<td>"+feedstocks[i].color+"</td>";
		html += "<td class='nowrap'>"+feedstocks[i].amount+"</td>";
		html += "<td class='nowrap'>"+lib.roundValue(feedstocks[i].amount / feedstocks[i].standard)+"</td>";
		html += "<td>"+feedstocks[i].uom+"</td>";
		html += "</tr>";
	};
	document.getElementById('feedstock-storage-admin-filter-tbl').innerHTML = html;
	$('#'+location+'PageNumber').text('' + (page + 1) + ' de ' + Math.ceil(feedstocks.length / pageSize));
};

function renderAdminFeedstockStorage(feedstocks, pageSize, page, location){
	var html = "<tr>";
	html += "<td>Estoque</td>";
	html += "<td>Cód</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Qtd</td>";
	html += "<td>Rolo/Caixa</td>";
	html += "<td>Un.m</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < feedstocks.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		// html += "<td><a class='tbl-show-link' onclick='showProduct("+feedstocks[i].id+", "+true+")'>"+feedstocks[i].code+"</a></td>";
		html += "<td class='nowrap'>"+feedstocks[i].storage_id+"</td>";
		html += "<td class='nowrap'>"+feedstocks[i].code+"</td>";
		html += "<td>"+feedstocks[i].name+"</td>";
		html += "<td>"+feedstocks[i].color+"</td>";
		// html += "<td class='nowrap'><input type='number' value='"+feedstocks[i].amount+"'></td>";
		html += "<td class='nowrap'>"+feedstocks[i].amount+"</td>";
		html += "<td class='nowrap'>"+lib.roundValue(feedstocks[i].amount / feedstocks[i].standard)+"</td>";
		html += "<td>"+feedstocks[i].uom+"</td>";
		html += "<td ><a class='tbl-show-link nowrap' onclick='setFeedstockStorageAmount("+feedstocks[i].id+",this.parentNode.parentNode)'>Update</a></td>";
		html += "</tr>";
	};
	document.getElementById('feedstock-storage-admin-filter-tbl').innerHTML = html;
	$('#'+location+'PageNumber').text('' + (page + 1) + ' de ' + Math.ceil(feedstocks.length / pageSize));
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
		html += "<td class='nowrap'>"+feedstocks[i].storage_id+"</td>";
		html += "<td class='nowrap'>"+feedstocks[i].code+"</td>";
		html += "<td>"+feedstocks[i].name+"</td>";
		html += "<td>"+feedstocks[i].color+"</td>";
		html += "<td class='nowrap'>"+feedstocks[i].amount+"</td>";
		html += "<td>"+feedstocks[i].uom+"</td>";
		html += "</tr>";
	};
	document.getElementById('feedstock-storage-admin-filter-tbl').innerHTML = html;
	document.getElementById('feedstock-storage-admin-filter-div').style.display = 'block';
	$('#feedstockStorageAdminPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(feedstocks.length / pageSize));
};

function setFeedstockStorageAmount(id){
	const newAmount = prompt("Favor inserir a quantidade em estoque.");

	if(isNaN(newAmount) || newAmount < 0 || newAmount == ""){
		alert("O valor inserido é inválido.");
		return;
	};

	document.getElementById('ajax-loader').style.visibility = 'visible';

	$.ajax({
		url: "/feedstock/storage/manage/amount/set?id="+id+"&amount="+newAmount,
		method: 'put',
		success: (response) => {
			if(API.verifyResponse(response)){return};
			
			if(response.unauthorized){
				alert(response.unauthorized);
				window.location.href = '/login';
				return;
			};
			
			if(response.msg){
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				alert(response.msg);
				return;
			};

			document.getElementById('ajax-loader').style.visibility = 'hidden';

			alert(response.done);
			$("#feedstock-storage-filter-form").submit();
		}
	});
};