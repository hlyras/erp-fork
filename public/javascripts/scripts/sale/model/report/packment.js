Sale.packment.report = {};

Sale.packment.report.filter = async (sale) => {
	let response = await fetch("/sale/report/packment/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({ sale })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response;
};