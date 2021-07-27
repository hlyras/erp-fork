const Income = {};

Income.save = async income => {
	let response = await fetch("/financial/income/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ income })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.income;
};

Income.filter = async (income) => {
	let response = await fetch("/financial/income/filter?id="+income.id+"&periodStart="+income.periodStart+"&periodEnd="+income.periodEnd+"&category_id="+income.category_id+"&origin_id="+income.origin_id);
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.incomes;
};

Income.findById = async (id) => {
	let response = await fetch("/financial/income/id/"+id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.income[0];
};

Income.delete = async (id) => {
	let response = await fetch("/financial/income/delete/id/"+id, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	
	alert(response.done);
	
	return true;
};