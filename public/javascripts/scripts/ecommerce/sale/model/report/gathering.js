Ecommerce.sale.gathering.report = {};

Ecommerce.sale.gathering.report.filter = async (sale) => {
	let response = await fetch("/ecommerce/sale/report/gathering/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response;
};