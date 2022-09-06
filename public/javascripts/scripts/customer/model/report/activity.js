Customer.activity = {};

Customer.activity.filter = async (customer) => {
	let response = await fetch("/customer/activity/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(customer)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.sales;
};

Customer.activity.findById = async (customer_id) => {
	let response = await fetch(`/customer/activity/id/${id}`);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.customer;
};