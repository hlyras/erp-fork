Ecommerce.sale.product.report = {};

Ecommerce.sale.product.report.filter = async (sale) => {
	let response = await fetch("/ecommerce/sale/report/product/filter", {
	  method: "POST",
	  headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response;
};