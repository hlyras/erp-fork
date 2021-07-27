Income.origin = {};

Income.origin.save = async origin => {
	let response = await fetch("/financial/income/origin/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ origin })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.origin;
};

Income.origin.findById = async (id) => {
	let response = await fetch("/financial/income/origin/id/"+id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.origin[0];
};

Income.origin.findByCategoryId = async (id) => {
	let response = await fetch("/financial/income/origin/category_id/"+id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.origins;
};

Income.origin.filter = async (origin) => {
	let response = await fetch("/financial/income/origin/filter?category_id="+origin.category_id+"&name="+origin.name);
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.categories;
};

Income.origin.delete = async (id) => {
	let response = await fetch("/financial/income/origin/id/"+id, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	
	alert(response.done);
	
	return true;
};