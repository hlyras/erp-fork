Feedstock.supplier = {};

Feedstock.supplier.save = async (supplier) => {
	let response = await fetch("/feedstock/supplier/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(supplier)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Feedstock.supplier.filter = async supplier => {
	let response = await fetch("/feedstock/supplier/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ supplier })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.suppliers;
};

Feedstock.supplier.findById = async (id) => {
	let response = await fetch("/feedstock/supplier/id/" + id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.supplier[0];
};

Feedstock.supplier.storage = {};

Feedstock.supplier.storage.open = async (id) => {
	let response = await fetch("/feedstock/supplier/storage/id/" + id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.supplier[0];
};