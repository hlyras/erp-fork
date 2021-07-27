Income.category = {};

Income.category.save = async category => {
	let response = await fetch("/financial/income/category/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ category })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.category;
};

Income.category.findById = async (id) => {
	let response = await fetch("/financial/income/category/id/"+id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.category[0];
};

Income.category.filter = async (category) => {
	let response = await fetch("/financial/income/category/filter?name="+category.name);
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.categories;
};

Income.category.delete = async (id) => {
	let response = await fetch("/financial/income/category/id/"+id, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	
	alert(response.done);
	
	return true;
};