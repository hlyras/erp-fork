const Sale = {};

Sale.save = async (sale) => {
	let response = await fetch("/sale/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.sale;
};

let options = [{
 cepori: "06233200",
 cepdes: "17213580",
 frap: null,
 peso: 13.78,
 cnpj: 12345678901234,
 conta: "000001",
 contrato: "123",
 modalidade: 3,
 tpentrega: "D",
 tpseguro: "N",
 vldeclarado: 149.97,
 vlcoleta: null
}]


Sale.frete = async (options) => {
	let response = await fetch("https://www.jadlog.com.br/embarcador/api/frete/valor", {
		method: "POST",
		withCredentials: true,
		headers: {
			'Authorization': 'Bearer '+btoa('14114604000173:OLPYFrv'),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		mode: 'cors',
		cache: 'default',
	    body: JSON.stringify({ options })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	return response.sale;
};

Sale.calcular = async () => {
	console.log(await Sale.frete(options));
};

Sale.calcular();

Sale.cancel = async sale_id => {
	let response = await fetch("/sale/cancel/id/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.done;	
};

Sale.filter = async (sale) => {
	let response = await fetch("/sale/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.sales;
};

Sale.findById = async (sale_id) => {
	let response = await fetch("/sale/id/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.sale[0];
};

Sale.confirmPayment = async sale_id => {
	let response = await fetch("/sale/confirm-payment/id/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.done;	
};

Sale.confirmPackment = async sale_id => {
	let response = await fetch("/sale/confirm-packment/id/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.done;	
};

Sale.confirmNF = async (sale) => {
	let response = await fetch("/sale/confirm-nf", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.done;
};

Sale.confirmShipment = async sale_id => {
	let response = await fetch("/sale/confirm-shipment/id/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.done;	
};