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
});

function renderFeedstockSupplier(suppliers, pageSize, page){
	var html = "<tr>";
	html += "<td>Id</td>";
	html += "<td>Nome</td>";
	html += "<td>Telefone</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < suppliers.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		html += "<td class='nowrap'>"+suppliers[i].id+"</td>";
		html += "<td>"+suppliers[i].name+"</td>";
		html += "<td class='nowrap'>"+suppliers[i].phone+"</td>";
		// html += "<td ><a class='tbl-show-link nowrap' onclick='editFeedstock("+suppliers[i].id+")'>Edit</a></td>";
		// html += "<td><a class='tbl-show-link nowrap' onclick='removeFeedstock("+suppliers[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};
	document.getElementById('feedstock-supplier-filter-tbl').innerHTML = html;
	$('#feedstockSupplierPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(suppliers.length / pageSize));
};