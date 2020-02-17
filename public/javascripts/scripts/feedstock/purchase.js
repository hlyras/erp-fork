var feedstock_purchase_kart = [];

// verify if kart is empty
if(JSON.parse(localStorage.getItem("purchaseKart")) != null){
	const parsedKart = JSON.parse(localStorage.getItem("purchaseKart"));
	feedstock_purchase_kart = parsedKart;

	listFeedstockSupplierStorage(localStorage.getItem("purchaseSupplier"), "select");

	document.getElementById("feedstock-supplier-storage-filter-form").elements.namedItem("supplier_id").disabled = true;
	document.getElementById("feedstock-supplier-storage-filter-form").elements.namedItem("supplier_id").value = localStorage.getItem("purchaseSupplier");
	
	renderFeedstockpurchaseKart(feedstock_purchase_kart);
};

$(() => {
	$("#feedstock-purchase-kart-form").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById("feedstock-purchase-kart-submit").disabled = true;

		var feedstock_id = document.getElementById("feedstock-purchase-kart-form").elements.namedItem('feedstock_id');
		var amount = document.getElementById("feedstock-purchase-kart-form").elements.namedItem('feedstock_amount').value;

		if(feedstock_id.value < 1 || !feedstock_id.value){
			alert("É necessário selecionar a matéria-prima");
			return document.getElementById('feedstock-purchase-kart-submit').disabled = false;
		};

		if(amount < 0.01 || !amount){
			alert("É necessário preencher a quantidade de matéria-prima que será comprada.");
			return document.getElementById('feedstock-purchase-kart-submit').disabled = false;
		};

		var row = feedstock_id.options[feedstock_id.selectedIndex].text;
		splitedFeedstock = row.split(" | ");

		feedstock = {
			id: feedstock_id.value,
			code: splitedFeedstock[0],
			name: splitedFeedstock[1],
			color: splitedFeedstock[2],
			uom: splitedFeedstock[3],
			amount: parseFloat(amount),
			value: splitedFeedstock[4]
		};

		for(i in feedstock_purchase_kart){
			if(feedstock_purchase_kart[i].id == feedstock.id){
				document.getElementById('feedstock-purchase-kart-submit').disabled = false;
				return alert("Você já incluiu esta matéria-prima na lista de compras.");
			};
		};

		feedstock_purchase_kart.push(feedstock);

		feedstock_purchase_kart.sort((a, b) => {
		  return a.code - b.code;
		});

		updatePurchaseLocalStorage(feedstock_purchase_kart, document.getElementById("feedstock-supplier-storage-filter-form").elements.namedItem("supplier_id").value);
		renderFeedstockpurchaseKart(feedstock_purchase_kart);

		document.getElementById("feedstock-supplier-storage-filter-form").elements.namedItem("supplier_id").disabled = true;
		
		document.getElementById("feedstock-purchase-kart-form").elements.namedItem('feedstock_amount').value = "";
		document.getElementById("feedstock-purchase-kart-submit").disabled = false;
	});

	$("#feedstock-purchase-form").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById("feedstock-purchase-submit").disabled = true;

		var storage_id = document.getElementById("feedstock-purchase-form").elements.namedItem("storage_id").value;
		var supplier_id = document.getElementById("feedstock-supplier-storage-filter-form").elements.namedItem("supplier_id");

		if(feedstock_purchase_kart.length < 1){
			alert("É necessário adicionar produtos ao carrinho antes de finalizar a compra.");
			return document.getElementById('feedstock-purchase-submit').disabled = false;
		};

		if(supplier_id.value < 1 || !supplier_id.value){
			alert("É necessário selecionar o fornecedor");
			return document.getElementById('feedstock-purchase-submit').disabled = false;
		};

		if(storage_id < 1 || !storage_id){
			alert("É necessário selecionar o estoque que irá receber os materiais.");
			return document.getElementById('feedstock-purchase-submit').disabled = false;
		};

		var supplier_name = supplier_id.options[supplier_id.selectedIndex].text;
		var total_value = 0;

		for(i in feedstock_purchase_kart){
			if(feedstock_purchase_kart[i].uom == "cm"){
				total_value += lib.roundValue((feedstock_purchase_kart[i].value / 100) * feedstock_purchase_kart[i].amount);
			} else if(feedstock_purchase_kart[i].uom == "un"){
				total_value += lib.roundValue(feedstock_purchase_kart[i].value * feedstock_purchase_kart[i].amount);
			};
		};

		const r = confirm("Deseja realmente cadastrar esta venda?");

		if(r){
			document.getElementById('ajax-loader').style.visibility = 'visible';

			$.ajax({
				url: "/feedstock/purchase/save",
				method: "post",
				data: {
					supplier_id: supplier_id.value,
					supplier_name: supplier_name,
					feedstocks: JSON.stringify(feedstock_purchase_kart),
					total_value: lib.roundValue(total_value),
					storage_id: storage_id
				},
				success: (response) => {
					if(response.unauthorized){
						alert(response.unauthorized);
						window.location.href = '/login';
						return;
					};
					
					if(response.msg){
						document.getElementById('ajax-loader').style.visibility = 'hidden';
						document.getElementById("feedstock-purchase-submit").disabled = false;
						return alert(response.msg);
					};

					alert(response.done);

					feedstock_purchase_kart = [];
					updatePurchaseLocalStorage(feedstock_purchase_kart);
					renderFeedstockpurchaseKart(feedstock_purchase_kart);
					document.getElementById("feedstock-supplier-storage-filter-form").elements.namedItem("supplier_id").disabled = false;
					document.getElementById("feedstock-purchase-kart-form").elements.namedItem("feedstock_id").innerHTML = "<option value=''></option>";

					document.getElementById('ajax-loader').style.visibility = 'hidden';

					document.getElementById("feedstock-purchase-submit").disabled = false;
				}
			});
		} else {
			document.getElementById("feedstock-purchase-submit").disabled = false;
		};
	});
});

function renderFeedstockpurchaseKart(feedstocks){
	var total_value = 0;
	var html = "";

	html += "<tr>";
	html += "<td>Código</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Qtd</td>";
	html += "<td>Valor un</td>";
	html += "<td>Valor</td>";
	html += "</tr>";
	for(i in feedstocks){
		html += "<tr>";
		html += "<td class='nowrap'>"+feedstocks[i].code+"</td>";
		html += "<td>"+feedstocks[i].name+"</td>";
		html += "<td>"+feedstocks[i].color+"</td>";
		html += "<td class='nowrap'>"+feedstocks[i].amount+""+feedstocks[i].uom+"</td>";
		html += "<td class='nowrap'>$"+feedstocks[i].value+"</td>";
		if(feedstocks[i].uom == "cm"){
			html += "<td class='nowrap'>$"+lib.roundValue((feedstocks[i].value / 100) * feedstocks[i].amount)+"</td>";
			total_value += lib.roundValue((feedstocks[i].value / 100) * feedstocks[i].amount);
		} else if(feedstocks[i].uom == "un"){
			html += "<td class='nowrap'>$"+lib.roundValue(feedstocks[i].value * feedstocks[i].amount)+"</td>";
			total_value += lib.roundValue(feedstocks[i].value * feedstocks[i].amount);
		};
		html += "<td><a class='tbl-show-link nowrap' onclick='removeFeedstockFromPurchaseKart("+feedstocks[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};
	html += "<tr>";
	html += "<td>---</td>";
	html += "<td>---</td>";
	html += "<td>---</td>";
	html += "<td>---</td>";
	html += "<td>---</td>";
	html += "<td>---</td>";
	html += "</tr>";
	
	html += "<tr>";
	html += "<td></td>";
	html += "<td></td>";
	html += "<td></td>";
	html += "<td></td>";
	html += "<td></td>";
	html += "<td>Valor Total</td>";
	html += "</tr>";

	html += "<tr>";
	html += "<td></td>";
	html += "<td></td>";
	html += "<td></td>";
	html += "<td></td>";
	html += "<td></td>";
	html += "<td>$"+lib.roundValue(total_value)+"</td>";
	html += "</tr>";

	document.getElementById("feedstock-purchase-kart-tbl").innerHTML = html;
};

function removeFeedstockFromPurchaseKart(id){
	var kart_backup = [];
	for(i in feedstock_purchase_kart){
		if(feedstock_purchase_kart[i].id != id){
			kart_backup.push(feedstock_purchase_kart[i]);
		};
	}

	feedstock_purchase_kart = kart_backup;

	if(feedstock_purchase_kart.length == 0){
		document.getElementById("feedstock-supplier-storage-filter-form").elements.namedItem("supplier_id").disabled = false;
	};

	updatePurchaseLocalStorage(feedstock_purchase_kart, document.getElementById("feedstock-supplier-storage-filter-form").elements.namedItem("supplier_id").value);
	renderFeedstockpurchaseKart(feedstock_purchase_kart);
};

function updatePurchaseLocalStorage(kart, supplier_id){
	const stringKart = JSON.stringify(kart);
	localStorage.setItem("purchaseKart", stringKart);
	localStorage.setItem("purchaseSupplier", supplier_id);
	if(kart.length == 0){
		localStorage.setItem("purchaseKart", null);
		localStorage.setItem("purchaseSupplier", null);
	};
};