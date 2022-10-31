Ecommerce.report.product = {};

Ecommerce.report.product.filter = async (sale) => {
	let response = await fetch("/ecommerce/report/product/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ sale })
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};