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
			alert("É necessário selecionar um produto.");
			return document.getElementById('product-production-kart-submit').disabled = false;
		};

		if(amount < 0.01 || !amount){
			alert("É necessário preencher a quantidade de produtos que serão produzidos.");
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
			amount: parseInt(amount),
			feedstocks: []
		};

		for(i in product_production_kart){
			if(product_production_kart[i].id == product.id){
				document.getElementById('product-production-kart-submit').disabled = false;
				return alert("Você já incluiu este produto na lista de produção.");
			};
		};

		product_production_kart.push(product);

		product_production_kart.sort((a, b) => {
		  return a.code - b.code;
		});

		updateProductProductionLocalStorage(product_production_kart);
		renderProductProductionKart(product_production_kart);

		document.getElementById("product-production-simulation-box").style.display = "none";
		document.getElementById("product-production-form").style.display = "none";
		
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

		if(!product_production_kart.length){
			alert("É necessário selecionar algum produto para solicitar produção.");
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
				var html = "";
				html += "<tr>";
				html += "<td>Cód</td>";
				html += "<td>Nome</td>";
				html += "<td>Cor</td>";
				html += "<td>Metragem</td>";
				html += "<td>Qtd</td>";
				html += "<td>Estoque</td>";
				html += "</tr>";
				for(i in response.production.feedstocks.enough){
					html += "<tr>";
					html += "<td>"+response.production.feedstocks.enough[i].code+"</td>";
					html += "<td>"+response.production.feedstocks.enough[i].name+"</td>";
					html += "<td>"+response.production.feedstocks.enough[i].color+"</td>";
					html += "<td>"+response.production.feedstocks.enough[i].amount+""+response.production.feedstocks.enough[i].uom+"</td>";
					html += "<td>"+lib.roundValue(response.production.feedstocks.enough[i].amount/response.production.feedstocks.enough[i].standard)+"</td>";
					html += "<td>"+response.production.feedstocks.enough[i].amountInStorage+""+response.production.feedstocks.enough[i].uom+"</td>";
					html += "</tr>";
				};
				if(response.production.feedstocks.notEnough.length){
					html += "<tr><td>---</td><td>ESTOQUE INSUFICIENTE</td><td>---</td><td>---</td><td>---</td><td>---</td></tr>";
				};
				for(i in response.production.feedstocks.notEnough){
					html += "<tr>";
					html += "<td>"+response.production.feedstocks.notEnough[i].code+"</td>";
					html += "<td>"+response.production.feedstocks.notEnough[i].name+"</td>";
					html += "<td>"+response.production.feedstocks.notEnough[i].color+"</td>";
					html += "<td>"+response.production.feedstocks.notEnough[i].amount+""+response.production.feedstocks.notEnough[i].uom+"</td>";
					html += "<td>"+lib.roundValue(response.production.feedstocks.notEnough[i].amount/response.production.feedstocks.notEnough[i].standard)+"</td>";
					html += "<td>"+response.production.feedstocks.notEnough[i].amountInStorage+""+response.production.feedstocks.notEnough[i].uom+"</td>";
					html += "</tr>";
				};

				document.getElementById("product-production-simulation-box").style.display = "block";
				document.getElementById("product-production-simulation-tbl").innerHTML = html;

				if(!response.production.feedstocks.notEnough.length){
					document.getElementById("product-production-form").style.display = "block";
					document.getElementById("product-production-form").elements.namedItem("storage_id").value = storage_id;
					document.getElementById("product-production-form").elements.namedItem("storage_id").disabled = true;
				} else {
					document.getElementById("product-production-form").style.display = "none";
				};

				document.getElementById("product-production-simulation").elements.namedItem("submit").disabled = false;
				document.getElementById('ajax-loader').style.visibility = 'hidden';
			}
		});
	});

	$("#product-production-form").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById('product-production-submit').disabled = true;

		const storage_id = document.getElementById("product-production-form").elements.namedItem("storage_id").value;

		if(storage_id < 1 || !storage_id){
			alert("É necessário selecionar o estoque que irá suprir os materiais.");
			return document.getElementById('product-production-submit').disabled = false;
		};

		if(!product_production_kart.length){
			alert("É necessário selecionar algum produto para solicitar produção.");
			return document.getElementById("product-production-simulation").elements.namedItem("submit").disabled = false;
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: "/product/production/save",
			method: "post",
			data: {
				storage_id: storage_id,
				products: JSON.stringify(product_production_kart)
			},
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					alert(response.msg);
					return document.getElementById('product-production-submit').disabled = false;
				};

				alert(response.done);

				product_production_kart = [];

				document.getElementById("product-production-simulation-box").style.display = "block";
				document.getElementById("product-production-simulation-tbl").innerHTML = "";

				updateProductProductionLocalStorage(product_production_kart);
				renderProductProductionKart(product_production_kart);
			
				document.getElementById('product-production-submit').disabled = false;
				
				document.getElementById("product-production-form").style.display = "none";
				document.getElementById('ajax-loader').style.visibility = 'hidden';
			}
		});
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
	document.getElementById("product-production-form").style.display = "none";

};

function updateProductProductionLocalStorage(kart){
	const stringKart = JSON.stringify(kart);
	localStorage.setItem("productProductionKart", stringKart);
	if(kart.length == 0){
		localStorage.setItem("productProductionKart", null);
	};
};