Sale.financial = {};

Sale.financial.filter = async (sale) => {
	let response = await fetch("/sale/metrics/financial/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.sales;
};