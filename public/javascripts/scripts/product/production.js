var product_production_kart = [];

// verify if kart is empty
if(JSON.parse(localStorage.getItem("productProductionKart")) != null){
	const parsedProductProductionKart = JSON.parse(localStorage.getItem("productProductionKart"));
	product_production_kart = parsedProductProductionKart;

	renderProductProductionKart(product_production_kart);
};

$(() => {
	$("#product-production-kart-form").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById("product-production-kart-submit").disabled = true;

		var product_id = document.getElementById("product-production-kart-form").elements.namedItem('product_id');
		var amount = document.getElementById("product-production-kart-form").elements.namedItem('product_amount').value;

		if(product_id.value < 1 || !product_id.value){
			alert("É necessário selecionar a matéria-prima");
			return document.getElementById('product-production-kart-submit').disabled = false;
		};

		if(amount < 0.01 || !amount){
			alert("É necessário preencher a quantidade de matéria-prima que será comprada.");
			return document.getElementById('product-production-kart-submit').disabled = false;
		};

		var row = product_id.options[product_id.selectedIndex].text;
		splitedProduct = row.split(" | ");

		product = {
			id: product_id.value,
			code: splitedProduct[0],
			name: splitedProduct[1],
			color: splitedProduct[2],
			size: splitedProduct[3],
			amount: parseInt(amount)
		};

		for(i in product_production_kart){
			if(product_production_kart[i].id == product.id){
				document.getElementById('product-production-kart-submit').disabled = false;
				return alert("Você já incluiu esta matéria-prima na lista de compras.");
			};
		};

		product_production_kart.push(product);

		product_production_kart.sort((a, b) => {
		  return a.code - b.code;
		});

		updateProductProductionLocalStorage(product_production_kart);
		renderProductProductionKart(product_production_kart);

		document.getElementById("product-production-simulation-box").style.display = "none";
		
		document.getElementById("product-production-kart-form").elements.namedItem('product_amount').value = "";
		document.getElementById("product-production-kart-submit").disabled = false;
	});

	$("#product-production-simulation").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById("product-production-simulation").elements.namedItem("submit").disabled = true;

		const storage_id = document.getElementById("product-production-simulation").elements.namedItem("storage_id").value;

		if(storage_id < 1 || !storage_id){
			alert("É necessário selecionar o estoque que irá suprir os materiais.");
			return document.getElementById("product-production-simulation").elements.namedItem("submit").disabled = false;
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: "/product/production/simulate",
			method: "post",
			data: {
				storage_id: storage_id,
				products: JSON.stringify(product_production_kart)
			},
			success: (response) => {
				console.log(response);
				response.feedstocks = response.production_feedstocks.reduce((array, production_feedstock) => {
					for(i in array){
						if(array[i].id == production_feedstock.feedstock_id){
							array[i].amount = production_feedstock.amount;
						};
					}
					return array;
				}, response.feedstocks);

				var html = "";
				html += "<tr>";
				html += "<td>Cód</td>";
				html += "<td>Nome</td>";
				html += "<td>Cor</td>";
				html += "<td>Metragem</td>";
				html += "<td>Qtd</td>";
				html += "</tr>";
				for(i in response.feedstocks){
					html += "<tr>";
					html += "<td>"+response.feedstocks[i].code+"</td>";
					html += "<td>"+response.feedstocks[i].name+"</td>";
					html += "<td>"+response.feedstocks[i].color+"</td>";
					html += "<td>"+response.feedstocks[i].amount+""+response.feedstocks[i].uom+"</td>";
					html += "<td>"+lib.roundValue(response.feedstocks[i].amount/response.feedstocks[i].standard)+"</td>";
					html += "</tr>";
				};

				document.getElementById("product-production-simulation-box").style.display = "block";
				document.getElementById("product-production-simulation-tbl").innerHTML = html;

				document.getElementById("product-production-simulation").elements.namedItem("submit").disabled = false;
				document.getElementById('ajax-loader').style.visibility = 'hidden';
			}
		});
	});

	$("#product-production-form").on('submit', (event)=>{
		event.preventDefault();

		const storage_id = document.getElementById("product-production-form").elements.namedItem("storage_id").value;

		if(storage_id < 1 || !storage_id){
			alert("É necessário selecionar o estoque que irá suprir os materiais.");
			return document.getElementById('product-production-submit').disabled = false;
		};

	});
});

function renderProductProductionKart(products){
	var html = "";
	html += "<tr>";
	html += "<td>Código</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Tamanho</td>";
	html += "<td>Qtd</td>";
	html += "</tr>";
	for(i in products){
		html += "<tr>";
		html += "<td class='nowrap'>"+products[i].code+"</td>";
		html += "<td>"+products[i].name+"</td>";
		html += "<td>"+products[i].color+"</td>";
		html += "<td>"+products[i].size+"</td>";
		html += "<td class='nowrap'>"+products[i].amount+"un</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeProductFromProductionKart("+products[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};

	document.getElementById("product-production-kart-tbl").innerHTML = html;
};

function removeProductFromProductionKart(id){
	var kart_backup = [];
	for(i in product_production_kart){
		if(product_production_kart[i].id != id){
			kart_backup.push(product_production_kart[i]);
		};
	}

	product_production_kart = kart_backup;

	updateProductProductionLocalStorage(product_production_kart);
	renderProductProductionKart(product_production_kart);
	document.getElementById("product-production-simulation-box").style.display = "none";
};

function updateProductProductionLocalStorage(kart){
	const stringKart = JSON.stringify(kart);
	localStorage.setItem("productProductionKart", stringKart);
	if(kart.length == 0){
		localStorage.setItem("productProductionKart", null);
	};
};