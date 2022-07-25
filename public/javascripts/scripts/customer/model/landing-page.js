Customer.landingPage = {};

Customer.landingPage.filter = async (lead) => {
	let response = await fetch("/customer/landing-page/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ lead })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.leads;
};