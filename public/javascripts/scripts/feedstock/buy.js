var feedstock_buy_kart = [];

$(() => {
	$("#feedstock-buy-kart-form").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById("feedstock-buy-kart-submit").disabled = true;

		var feedstock_id = document.getElementById("feedstock-buy-kart-form").elements.namedItem('feedstock_id');
		var amount = document.getElementById("feedstock-buy-kart-form").elements.namedItem('feedstock_amount').value;

		if(feedstock_id.value < 1 || !feedstock_id.value){
			alert("É necessário selecionar a matéria-prima");
			return document.getElementById('feedstock-buy-kart-submit').disabled = false;
		};

		if(amount < 1 || !amount){
			alert("É necessário preencher a quantidade de matéria-prima que será comprada.");
			return document.getElementById('feedstock-buy-kart-submit').disabled = false;
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

		for(i in feedstock_buy_kart){
			if(feedstock_buy_kart[i].id == feedstock.id){
				document.getElementById('feedstock-buy-kart-submit').disabled = false;
				return alert("Você já incluiu esta matéria-prima na lista de compras.");
			};
		};

		feedstock_buy_kart.push(feedstock);

		feedstock_buy_kart.sort((a, b) => {
		  return a.code - b.code;
		});

		renderFeedstockBuyKart(feedstock_buy_kart);

		document.getElementById("feedstock-buy-kart-form").elements.namedItem('feedstock_amount').value = "";
		document.getElementById("feedstock-buy-kart-submit").disabled = false;
	});

	$("#feedstock-buy-form").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById("feedstock-buy-submit").disabled = true;

		var storage_id = document.getElementById("feedstock-buy-form").elements.namedItem("storage_id").value;
		var supplier_id = document.getElementById("feedstock-buy-form").elements.namedItem("supplier_id").value;

		if(supplier_id < 1 || !supplier_id){
			alert("É necessário selecionar a matéria-prima");
			return document.getElementById('feedstock-buy-kart-submit').disabled = false;
		};

		if(storage_id < 1 || !storage_id){
			alert("É necessário selecionar o fornecedor");
			return document.getElementById('feedstock-buy-kart-submit').disabled = false;
		};

		document.getElementById("feedstock-buy-submit").disabled = false;
	});
});

function renderFeedstockBuyKart(feedstocks){
	var html = "";
	html += "<tr>";
	html += "<td>Código</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Qtd</td>";
	html += "<td>Un.Med</td>";
	html += "</tr>";
	for(i in feedstocks){
		html += "<tr>";
		html += "<td class='nowrap'>"+feedstocks[i].code+"</td>";
		html += "<td>"+feedstocks[i].name+"</td>";
		html += "<td>"+feedstocks[i].color+"</td>";
		html += "<td class='nowrap'>"+feedstocks[i].amount+"</td>";
		html += "<td>"+feedstocks[i].uom+"</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeFeedstockFromBuyKart("+feedstocks[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};

	document.getElementById("feedstock-buy-kart-tbl").innerHTML = html;
}

function removeFeedstockFromBuyKart(id){
	var kart_backup = [];
	for(i in feedstock_buy_kart){
		if(feedstock_buy_kart[i].id != id){
			kart_backup.push(feedstock_buy_kart[i]);
		};
	}
	feedstock_buy_kart = kart_backup;
	renderFeedstockBuyKart(feedstock_buy_kart);
};