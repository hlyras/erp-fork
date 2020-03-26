var feedstock_request_kart = [];

// verify if kart is empty
if(JSON.parse(localStorage.getItem("requestKart")) != null){
	const parsedKart = JSON.parse(localStorage.getItem("requestKart"));
	feedstock_request_kart = parsedKart;

	renderFeedstockRequestKart(feedstock_request_kart);
};

$(() => {
	$("#feedstock-request-kart-form").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById("feedstock-request-kart-form").elements.namedItem("submit").disabled = true;

		var feedstock_id = document.getElementById("feedstock-request-kart-form").elements.namedItem('feedstock_id');
		var amount = document.getElementById("feedstock-request-kart-form").elements.namedItem('feedstock_amount').value;

		if(feedstock_id.value < 1 || !feedstock_id.value){
			alert("É necessário selecionar a matéria-prima");
			return document.getElementById('feedstock-request-kart-form').elements.namedItem("submit").disabled = false;
		};

		if(amount < 1 || !amount){
			alert("É necessário preencher a quantidade de matéria-prima que será comprada.");
			return document.getElementById('feedstock-request-kart-form').elements.namedItem("submit").disabled = false;
		};

		var row = feedstock_id.options[feedstock_id.selectedIndex].text;
		splitedFeedstock = row.split(" | ");

		feedstock = {
			id: feedstock_id.value,
			code: splitedFeedstock[0],
			name: splitedFeedstock[1],
			color: splitedFeedstock[2],
			uom: splitedFeedstock[3],
			amount: parseInt(amount)
		};

		for(i in feedstock_request_kart){
			if(feedstock_request_kart[i].id == feedstock.id){
				document.getElementById('feedstock-request-kart-form').elements.namedItem("submit").disabled = false;
				return alert("Você já incluiu esta matéria-prima na solicitação.");
			};
		};

		feedstock_request_kart.push(feedstock);

		feedstock_request_kart.sort((a, b) => {
		  return a.code - b.code;
		});

		updateFeedstockRequestLocalStorage(feedstock_request_kart);
		renderFeedstockRequestKart(feedstock_request_kart);

		document.getElementById("feedstock-request-kart-form").elements.namedItem('feedstock_amount').value = "";
		document.getElementById("feedstock-request-kart-form").elements.namedItem("submit").disabled = false;
	});

	$("#feedstock-request-form").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById("feedstock-request-form").elements.namedItem("submit").disabled = true;

		var storage_id = document.getElementById("feedstock-request-form").elements.namedItem("storage_id").value;
		var obs = document.getElementById("feedstock-request-form").elements.namedItem("obs").value;

		if(feedstock_request_kart.length < 1){
			alert("É necessário adicionar produtos ao carrinho antes de finalizar o pedido.");
			return document.getElementById('feedstock-request-form').elements.namedItem("submit").disabled = false;
		};

		if(storage_id < 1 || !storage_id){
			alert("É necessário selecionar o estoque que irá retirar os materiais.");
			return document.getElementById('feedstock-request-form').elements.namedItem("submit").disabled = false;
		};

		if(obs.length < 10 || !obs){
			alert("É necessário informar o motivo da solicitação.");
			return document.getElementById('feedstock-request-form').elements.namedItem("submit").disabled = false;	
		};

		const r = confirm("Deseja realmente cadastrar este pedido?");

		if(r){
			document.getElementById('ajax-loader').style.visibility = 'visible';

			$.ajax({
				url: "/feedstock/request/save",
				method: "post",
				data: {
					feedstocks: JSON.stringify(feedstock_request_kart),
					storage_id: storage_id,
					obs: obs
				},
				success: (response) => {
					if(API.verifyResponse(response, "feedstock-request-form")){return};

					alert(response.done);

					feedstock_request_kart = [];
					updateFeedstockRequestLocalStorage(feedstock_request_kart);
					renderFeedstockRequestKart(feedstock_request_kart);
					document.getElementById("feedstock-request-kart-form").elements.namedItem("feedstock_id").innerHTML = "<option value=''></option>";
					document.getElementById("feedstock-request-form").elements.namedItem("obs").value = "";	
					document.getElementById("ajax-loader").style.visibility = "hidden";

					document.getElementById("feedstock-request-form").elements.namedItem("submit").disabled = false;
				}
			});
		} else {
			document.getElementById("feedstock-request-form").elements.namedItem("submit").disabled = false;
		};
	});
});

function renderFeedstockRequestKart(feedstocks){
	var total_value = 0;
	var html = "";

	html += "<tr>";
	html += "<td>Código</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Rolo/Caixa</td>";
	html += "</tr>";
	for(i in feedstocks){
		html += "<tr>";
		html += "<td class='nowrap'>"+feedstocks[i].code+"</td>";
		html += "<td>"+feedstocks[i].name+"</td>";
		html += "<td>"+feedstocks[i].color+"</td>";
		html += "<td class='nowrap'>"+feedstocks[i].amount+"un</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeFeedstockFromRequestKart("+feedstocks[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};

	document.getElementById("feedstock-request-kart-tbl").innerHTML = html;
};

function removeFeedstockFromRequestKart(id){
	var kart_backup = [];
	for(i in feedstock_request_kart){
		if(feedstock_request_kart[i].id != id){
			kart_backup.push(feedstock_request_kart[i]);
		};
	}

	feedstock_request_kart = kart_backup;

	updateFeedstockRequestLocalStorage(feedstock_request_kart);
	renderFeedstockRequestKart(feedstock_request_kart);
};

function updateFeedstockRequestLocalStorage(kart){
	const stringKart = JSON.stringify(kart);
	localStorage.setItem("requestKart", stringKart);
	if(kart.length == 0){
		localStorage.setItem("requestKart", null);
	};
};