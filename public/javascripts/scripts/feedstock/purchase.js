var feedstock_purchase_kart = [];

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

		if(amount < 1 || !amount){
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
			amount: amount
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

		renderFeedstockpurchaseKart(feedstock_purchase_kart);

		document.getElementById("feedstock-purchase-kart-form").elements.namedItem('feedstock_amount').value = "";
		document.getElementById("feedstock-purchase-kart-submit").disabled = false;
	});

	$("#feedstock-purchase-form").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById("feedstock-purchase-submit").disabled = true;

		var storage_id = document.getElementById("feedstock-purchase-form").elements.namedItem("storage_id").value;
		var supplier_id = document.getElementById("feedstock-purchase-form").elements.namedItem("supplier_id").value;

		if(feedstock_purchase_kart.length < 1){
			alert("É necessário adicionar produtos ao carrinho antes de finalizar a compra.");
			return document.getElementById('feedstock-purchase-submit').disabled = false;
		};

		if(supplier_id < 1 || !supplier_id){
			alert("É necessário selecionar o fornecedor");
			return document.getElementById('feedstock-purchase-submit').disabled = false;
		};

		if(storage_id < 1 || !storage_id){
			alert("É necessário selecionar o estoque que irá receber os materiais.");
			return document.getElementById('feedstock-purchase-submit').disabled = false;
		};

		// $.ajax({
		// 	url: "/feedstock/purchase/create"
		// })

		document.getElementById("feedstock-purchase-submit").disabled = false;
	});
});

function renderFeedstockpurchaseKart(feedstocks){
	var html = "";
	html += "<tr>";
	html += "<td>Código</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Qtd</td>";
	html += "</tr>";
	for(i in feedstocks){
		html += "<tr>";
		html += "<td class='nowrap'>"+feedstocks[i].code+"</td>";
		html += "<td>"+feedstocks[i].name+"</td>";
		html += "<td>"+feedstocks[i].color+"</td>";
		html += "<td class='nowrap'>"+feedstocks[i].amount+""+feedstocks[i].uom+"</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeFeedstockFrompurchaseKart("+feedstocks[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};

	document.getElementById("feedstock-purchase-kart-tbl").innerHTML = html;
}

function removeFeedstockFrompurchaseKart(id){
	var kart_backup = [];
	for(i in feedstock_purchase_kart){
		if(feedstock_purchase_kart[i].id != id){
			kart_backup.push(feedstock_purchase_kart[i]);
		};
	}
	feedstock_purchase_kart = kart_backup;
	renderFeedstockpurchaseKart(feedstock_purchase_kart);
};