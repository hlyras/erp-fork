Customer.address = {};

Customer.address.save = async (customer_address) => {
	let response = await fetch("/customer/address/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(customer_address)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.customer_address;
};

Customer.address.findById = async (id) => {
	let response = await fetch("/customer/address/id/"+id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.customer_address[0];
};

Customer.address.findByCustomerId = async (customer_id) => {
	let response = await fetch("/customer/address/list/customer_id/"+customer_id);
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	
	return response.addresses;
};

Customer.address.delete = async (id) => {
	let response = await fetch("/customer/address/delete?id="+id, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	
	alert(response.done);
	
	return true;
};