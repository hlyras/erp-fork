$(() => {
	$("#feedstock-supplier-create-form").on("submit", (event) => {
		event.preventDefault();
		document.getElementById("feedstock-supplier-create-form").disabled = true;

		const supplier_name = document.getElementById("feedstock-supplier-create-form").elements.namedItem("supplier_name").value;
		const supplier_phone = document.getElementById("feedstock-supplier-create-form").elements.namedItem("supplier_phone").value;

		if(!supplier_name || supplier_name.length < 3){
			document.getElementById("feedstock-supplier-create-form").disabled = false;
			return alert("É necessário preencher o nome do fornecedor.");
		};

		if(!supplier_phone){
			document.getElementById("feedstock-supplier-create-form").disabled = false;
			return alert("É necessário preencher o nome do fornecedor.");
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: "/feedstock/supplier/create",
			method: "post",
			data: $("#feedstock-supplier-create-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					alert(response.msg);
					return document.getElementById('feedstock-supplier-create-submit').disabled = false;
				};

				alert(response.done);

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				document.getElementById("feedstock-supplier-create-form").disabled = false;
			}
		});
	});

	$("#feedstock-supplier-filter-form").on("submit", (event) => {
		event.preventDefault();
		document.getElementById("feedstock-supplier-filter-submit").disabled = true;

		const location = document.getElementById("feedstock-supplier-filter-form").elements.namedItem("location").value;
		
		const supplier_name = document.getElementById("feedstock-supplier-filter-form").elements.namedItem("supplier_name").value;
		
		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: "/feedstock/supplier/filter?supplier_name="+supplier_name,
			method: "get",
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					alert(response.msg);
					return document.getElementById('feedstock-supplier-filter-submit').disabled = false;
				};

				var pageSize = 10;
				var page = 0;

				function paging(){
					if(response.suppliers.length){
						renderFeedstockSupplier(response.suppliers, pageSize, page, location);
					} else {
						lib.clearTable('feedstock-supplier-filter-tbl', location);
					};
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';

				function buttonsPaging(){
					$("#"+location+"Next").prop('disabled', response.suppliers.length <= pageSize || page >= response.suppliers.length / pageSize - 1);
					$("#"+location+"Previous").prop('disabled', response.suppliers.length <= pageSize || page == 0);
				};

				$(function(){
				    $("#"+location+"Next").click(function(){
				        if(page < response.suppliers.length / pageSize - 1){
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

				document.getElementById("feedstock-supplier-filter-submit").disabled = false;
			}
		});
	});

	$("#feedstock-supplier-addFeedstock-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('feedstock-supplier-addFeedstock-submit').disabled = true;

		let feedstock_id = document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('feedstock_id').value;
		let feedstock_value = document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('feedstock_value').value;

		if(feedstock_id < 1 || !feedstock_id){
			alert("É necessário selecionar a matéria-prima");
			return document.getElementById('feedstock-supplier-addFeedstock-submit').disabled = false;
		};

		if(feedstock_value < 0.01 || !feedstock_value){
			alert("É necessário preencher o valor da matéria-prima");
			return document.getElementById('feedstock-supplier-addFeedstock-submit').disabled = false;
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: '/feedstock/supplier/storage/add',
			method: 'post',
			data: $("#feedstock-supplier-addFeedstock-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					document.getElementById('feedstock-supplier-addFeedstock-submit').disabled = false;
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';

				alert(response.done);
				
				if(document.getElementById('feedstock-supplier-storage-box').style.display == "block"){
					listFeedstockSupplierStorage(document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('supplier_id').value, "table", true);
				};

				document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('id').value = "";
				document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('feedstock_id').disabled = false;
				document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('feedstock_value').value = "0.00";

				document.getElementById('feedstock-supplier-addFeedstock-submit').disabled = false;
			}
		});
	});

	$("#feedstock-supplier-storage-filter-form").on("submit", (event) => {
		event.preventDefault();
		document.getElementById("feedstock-supplier-storage-filter-submit").disabled = true;

		const supplier_id = document.getElementById("feedstock-supplier-storage-filter-form").elements.namedItem("supplier_id").value;
		
		if(!supplier_id || supplier_id < 1){
			alert("É necessário selecionar um fornecedor");
			return document.getElementById("feedstock-supplier-storage-filter-submit").disabled = false;
		};

		listFeedstockSupplierStorage(supplier_id, "select", false);

		document.getElementById("feedstock-supplier-storage-filter-submit").disabled = false;
	});
});

function renderFeedstockSupplier(suppliers, pageSize, page, location){
	var html = "<tr>";
	html += "<td>Id</td>";
	html += "<td>Nome</td>";
	html += "<td>Telefone</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < suppliers.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		html += "<td><a class='tbl-show-link nowrap' onclick='showFeedstockSupplier("+suppliers[i].id+", "+true+")'>"+suppliers[i].id+"</a></td>";
		html += "<td>"+suppliers[i].name+"</td>";
		html += "<td class='nowrap'>"+suppliers[i].phone+"</td>";
		// html += "<td><a class='tbl-show-link nowrap' onclick='editFeedstock("+suppliers[i].id+")'>Edit</a></td>";
		// html += "<td><a class='tbl-show-link nowrap' onclick='removeFeedstock("+suppliers[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};
	
	document.getElementById('feedstock-supplier-filter-tbl').innerHTML = html;
	$("#"+location+"PageNumber").text('' + (page + 1) + ' de ' + Math.ceil(suppliers.length / pageSize));
};

function showFeedstockSupplier(id, admin){
	document.getElementById('ajax-loader').style.visibility = 'visible';
	$.ajax({
		url: '/feedstock/supplier/id/'+id,
		method: 'get',
		success: (response) => {
			if(response.unauthorized){
				alert(response.unauthorized);
				window.location.href = '/login';
				return;
			};

			document.getElementById('ajax-loader').style.visibility = 'hidden';

			let html = "";
			html += "<tr>";
			html += "<td>Id</td>";
			html += "<td>Nome</td>";
			html += "<td>Telefone</td>";
			html += "</tr>";

			html += "<tr>";
			html += "<td class='nowrap'>"+response.supplier[0].id+"</td>";
			html += "<td>"+response.supplier[0].name+"</td>";
			html += "<td>"+response.supplier[0].phone+"</td>";
			html += "</tr>";

			html += "<tr>";
			if(admin){
				document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('supplier_id').value = response.supplier[0].id;	
				document.getElementById('feedstock-supplier-storage-box').style.display = "none";
				
				html += `<td><a class="tbl-show-link nowrap" onclick="lib.displayDiv('feedstock-supplier-addFeedstock-div')">Incluir</a></td>`;
				html += `<td><a class="tbl-show-link nowrap" onclick="\
							if(document.getElementById('feedstock-supplier-storage-box').style.display == 'none'){\
								listFeedstockSupplierStorage(`+response.supplier[0].id+`, 'table', `+true+`)\
							} else { \
								document.getElementById('feedstock-supplier-storage-box').style.display = 'none' \
							}">Tabela</a>`;
				html += `<td><a class="tbl-show-link" onclick="lib.displayDiv('feedstock-supplier-show-box')">Fechar</a></td>`;
			};
			html += "</tr>";

			document.getElementById('feedstock-supplier-show-tbl').innerHTML = html;
			document.getElementById('feedstock-supplier-show-box').style.display = "block";
		}
	});
};

function listFeedstockSupplierStorage(supplier_id, target, admin){
	document.getElementById('ajax-loader').style.visibility = 'visible';
	
	$.ajax({
		url: "/feedstock/supplier/storage/list/id/"+supplier_id,
		method: "get",
		success: (response) => {
			if(response.unauthorized){
				alert(response.unauthorized);
				window.location.href = '/login';
				return;
			};
			
			if(response.msg){
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				document.getElementById("feedstock-supplier-storage-box").style.display = "none";
				return alert(response.msg);
			};

			for(i in response.supplier_storage){
				for(j in response.feedstocks){
					if(response.supplier_storage[i].feedstock_id == response.feedstocks[j].id){
						response.supplier_storage[i].feedstock_code = response.feedstocks[j].code;
						response.supplier_storage[i].feedstock_name = response.feedstocks[j].name;
						response.supplier_storage[i].feedstock_color = response.feedstocks[j].color;
						response.supplier_storage[i].feedstock_uom = response.feedstocks[j].uom;
					};
				};
			};

			response.supplier_storage.sort((a, b) => {
			  return a.feedstock_code - b.feedstock_code;
			});

			if(response.supplier_storage.length){
				if(target == "table"){
					renderFeedstockSupplierStorage(response.supplier_storage, admin);
				} else if(target == "select"){
					fillFeedstockSupplierStorage(response.supplier_storage);
				};
			} else {
				if(target == "table"){
					document.getElementById("feedstock-supplier-storage-tbl").innerHTML = "Sem registros!";
				} else if(target == "select"){
					document.getElementById("feedstock-purchase-kart-form").elements.namedItem("feedstock_id").innerHTML = "<option value=''>Sem registros</option>";
				};
			};

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function renderFeedstockSupplierStorage(feedstocks, admin){
	document.getElementById("feedstock-supplier-storage-box").style.display = "block";

	var html = "";

	html += "<tr>";
	html += "<td>Cód</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Valor</td>";
	html += "</tr>";

	for(i in feedstocks){
		html += "<tr>";
		html += "<td class='nowrap'>"+feedstocks[i].feedstock_code+"</td>";
		html += "<td>"+feedstocks[i].feedstock_name+"</td>";
		html += "<td>"+feedstocks[i].feedstock_color+"</td>";
		if(feedstocks[i].feedstock_uom == "cm"){
			html += "<td class='nowrap'>$"+feedstocks[i].value+"/m</td>";
		} else {
			html += "<td class='nowrap'>$"+feedstocks[i].value+"/"+feedstocks[i].feedstock_uom+"</td>";
		};
		if(admin){
			html += "<td><a class='tbl-show-link nowrap' onclick='editSupplierFeedstock("+feedstocks[i].id+", "+feedstocks[i].feedstock_id+", "+feedstocks[i].value+", "+feedstocks[i].supplier_id+")'>Edit</a></td>";
			html += "<td><a class='tbl-show-link nowrap' onclick='removeSupplierFeedstock("+feedstocks[i].id+", "+feedstocks[i].supplier_id+")'>Rem</a></td>";
		}
		html += "</tr>";
	};

	document.getElementById("feedstock-supplier-storage-tbl").innerHTML = html;
};

function fillFeedstockSupplierStorage(feedstocks){
	var html = "";

	for(i in feedstocks){
		html += "<option value="+feedstocks[i].feedstock_id+">"+feedstocks[i].feedstock_code+" | "+feedstocks[i].feedstock_name+" | "+feedstocks[i].feedstock_color+" | "+feedstocks[i].feedstock_uom+" | "+feedstocks[i].value+"</option>";
	};

	document.getElementById("feedstock-purchase-kart-form").elements.namedItem("feedstock_id").innerHTML = html;
};

function editSupplierFeedstock(id, feedstock_id, feedstock_value, supplier_id){
	document.getElementById('ajax-loader').style.visibility = 'visible';
		
	$.ajax({
		url: '/feedstock/id/'+feedstock_id,
		method: 'get',
		success: function(feedstock){
			document.getElementById("feedstock-supplier-addFeedstock-div").style.display = "block";

			document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('id').value = id;
			document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('feedstock_id').innerHTML = "<option value="+feedstock[0].id+">"+feedstock[0].code+" | "+feedstock[0].name+" | "+feedstock[0].color+" | "+feedstock[0].uom+"</option>";
			document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('feedstock_id').disabled = true;
			document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('feedstock_value').value = feedstock_value;

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function removeSupplierFeedstock(id, supplier_id){
	let r = confirm("Deseja realmente remover esta matéria-prima? Não será possível recupera-lá.");
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: "/feedstock/supplier/storage/remove/id/"+id,
			method: "get",
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					return alert(response.msg);
				};

				alert(response.done);

				document.getElementById('ajax-loader').style.visibility = 'hidden';

				if(document.getElementById('feedstock-supplier-storage-box').style.display == "block"){
					listFeedstockSupplierStorage(supplier_id, "table", true);
				};
			}
		});
	};
};