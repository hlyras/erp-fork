Customer.adress = {};

Customer.adress.save = async (customer_adress) => {
	let response = await fetch("/customer/adress/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(customer_adress)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.customer_adress;
};

Customer.adress.findById = async (id) => {
	let response = await fetch("/customer/adress/id/"+id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.customer_adress[0];
};

Customer.adress.delete = async (id) => {
	let response = await fetch("/customer/adress/delete?id="+id, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	
	alert(response.done);
	
	return true;
};