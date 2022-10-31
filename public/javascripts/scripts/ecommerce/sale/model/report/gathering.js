Ecommerce.report.gathering = {};

Ecommerce.report.gathering.filter = async (sale) => {
	let response = await fetch("/ecommerce/report/gathering/filter", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ sale })
	});
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};