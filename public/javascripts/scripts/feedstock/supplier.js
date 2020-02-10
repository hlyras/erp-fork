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

		const supplier_name = document.getElementById("feedstock-supplier-filter-form").elements.namedItem("supplier_name").value;

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

				renderFeedstockSupplier(response.suppliers, 10, 0);

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
			url: '/feedstock/supplier/addfeedstock',
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

				document.getElementById("feedstock-supplier-addFeedstock-form").elements.namedItem('feedstock_value').value = "0.00";
					
				document.getElementById('feedstock-supplier-addFeedstock-submit').disabled = false;
			}
		});
	});
});

function renderFeedstockSupplier(suppliers, pageSize, page){
	var html = "<tr>";
	html += "<td>Id</td>";
	html += "<td>Nome</td>";
	html += "<td>Telefone</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < suppliers.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		html += "<td><a class='tbl-show-link nowrap' onclick='showSupplier("+suppliers[i].id+", "+true+")'>"+suppliers[i].id+"</a></td>";
		html += "<td>"+suppliers[i].name+"</td>";
		html += "<td class='nowrap'>"+suppliers[i].phone+"</td>";
		// html += "<td><a class='tbl-show-link nowrap' onclick='editFeedstock("+suppliers[i].id+")'>Edit</a></td>";
		// html += "<td><a class='tbl-show-link nowrap' onclick='removeFeedstock("+suppliers[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};
	document.getElementById('feedstock-supplier-filter-tbl').innerHTML = html;
	$('#feedstockSupplierPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(suppliers.length / pageSize));
};

function showSupplier(id, admin){
	console.log(id);
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
				html += `<td><a class="tbl-show-link nowrap" onclick="lib.displayDiv('feedstock-supplier-addFeedstock-div')">+ M-P</a></td>`;
				html += `<td><a class="tbl-show-link" onclick="lib.displayDiv('feedstock-supplier-addFeedstock-box')">Matérias-Primas</a>`;
				html += `<td><a class="tbl-show-link" onclick="lib.displayDiv('feedstock-supplier-show-box')">Fechar</a></td>`;
			};
			html += "</tr>";

			document.getElementById('feedstock-supplier-show-tbl').innerHTML = html;
			document.getElementById('feedstock-supplier-show-box').style.display = "block";
		}
	});
};

function productFeedstockRender(product_feedstocks, tbl){
	var html = "";

	html += "<tr>";
	html += "<td>Cód</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Qtd</td>";
	html += "</tr>";

	product_feedstocks.sort((a, b) => {
	  return a.code - b.code;
	});

	for(i in product_feedstocks){
		html += "<tr>";
		html += "<td class='nowrap'>"+product_feedstocks[i].code+"</td>";
		html += "<td>"+product_feedstocks[i].name+"</td>";
		html += "<td>"+product_feedstocks[i].color+"</td>";
		html += "<td class='nowrap'>"+product_feedstocks[i].amount+""+product_feedstocks[i].uom+"</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeProductFeedstock("+product_feedstocks[i].id+", "+product_feedstocks[i].product_id+")'>Rem</a></td>";
		html += "</tr>";
	};

	document.getElementById(tbl).innerHTML = html;
};

function showSupplierFeedstock(id){
	if(document.getElementById('feedstock-supplier-addFeedstock-box').style.display == "none"){
		document.getElementById('feedstock-supplier-addFeedstock-box').style.display == "block";
	} else {
		document.getElementById('feedstock-supplier-addFeedstock-box').style.display == "block";
	};

	var html = "";
	
	html += "<tr>";
	html += "<td>Cód</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Qtd</td>";
	html += "</tr>";

	product_feedstocks.sort((a, b) => {
	  return a.code - b.code;
	});

	for(i in product_feedstocks){
		html += "<tr>";
		html += "<td class='nowrap'>"+product_feedstocks[i].code+"</td>";
		html += "<td>"+product_feedstocks[i].name+"</td>";
		html += "<td>"+product_feedstocks[i].color+"</td>";
		html += "<td class='nowrap'>"+product_feedstocks[i].amount+""+product_feedstocks[i].uom+"</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeProductFeedstock("+product_feedstocks[i].id+", "+product_feedstocks[i].product_id+")'>Rem</a></td>";
		html += "</tr>";
	};

	document.getElementById(tbl).innerHTML = html;
};