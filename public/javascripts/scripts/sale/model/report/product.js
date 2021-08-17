Sale.product.report = {};

Sale.product.report.filter = async (sale) => {
	let response = await fetch("/sale/report/product/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response;
};