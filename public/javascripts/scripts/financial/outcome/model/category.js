Outcome.category = {};

Outcome.category.save = async category => {
	let response = await fetch("/financial/outcome/category/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ category })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.category;
};

Outcome.category.findById = async (id) => {
	let response = await fetch("/financial/outcome/category/id/"+id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.category[0];
};

Outcome.category.filter = async (category) => {
	let response = await fetch("/financial/outcome/category/filter?name="+category.name);
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.categories;
};

Outcome.category.delete = async (id) => {
	let response = await fetch("/financial/outcome/category/id/"+id, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	
	alert(response.done);
	
	return true;
};