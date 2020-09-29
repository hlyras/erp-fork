Production.simulate = async (products) => {
	let response = await fetch("/production/simulate", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ products })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.production;
};

// $.ajax({
// 	url: "/product/production/simulate",
// 	method: "post",
// 	data: {
// 		storage_id: storage_id,
// 		products: JSON.stringify(Product.production.kart)
// 	},
// 	success: (response) => {
// 		if(API.verifyResponse(response, "product-production-simulation")){return};
		
// 		response.production.feedstocks.sort((a, b) => {
// 			return a.code - b.code;
// 		});

// 		var html = "";
// 		html += "<tr>";
// 		html += "<td>Cód</td>";
// 		html += "<td>Nome</td>";
// 		html += "<td>Cor</td>";
// 		html += "<td>Metragem</td>";
// 		// html += "<td>Qtd</td>";
// 		html += "</tr>";
// 		for(i in response.production.feedstocks){
// 			html += "<tr>";
// 			html += "<td class='nowrap'>"+response.production.feedstocks[i].code+"</td>";
// 			html += "<td>"+response.production.feedstocks[i].name+"</td>";
// 			html += "<td>"+response.production.feedstocks[i].color+"</td>";
// 			html += "<td class='nowrap'>"+response.production.feedstocks[i].amount+""+response.production.feedstocks[i].uom+"</td>";
// 			// html += "<td class='nowrap'>"+response.production.feedstocks[i].standard+"un</td>";
// 			// html += "<td class='nowrap'>"+lib.roundValue(response.production.feedstocks[i].amount/response.production.feedstocks[i].standard)+"</td>";
// 			html += "</tr>";
// 		};

// 		document.getElementById("product-production-simulation-box").style.display = "block";
// 		document.getElementById("product-production-simulation-tbl").innerHTML = html;

// 		if(!response.production.feedstocks.length){
// 			document.getElementById("product-production-form").style.display = "block";
// 			document.getElementById("product-production-form").elements.namedItem("storage_id").value = storage_id;
// 			document.getElementById("product-production-form").elements.namedItem("storage_id").disabled = true;
// 		} else {
// 			document.getElementById("product-production-form").style.display = "none";
// 		};

// 		document.getElementById("product-production-simulation").elements.namedItem("submit").disabled = false;
// 		document.getElementById('ajax-loader').style.visibility = 'hidden';
// 	}
// });