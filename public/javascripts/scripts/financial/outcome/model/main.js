const Outcome = {};

Outcome.save = async outcome => {
	let response = await fetch("/financial/outcome/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ outcome })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.outcome;
};

Outcome.filter = async outcome => {
	let response = await fetch("/financial/outcome/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ outcome })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.outcomes;
};

Outcome.findById = async (id) => {
	let response = await fetch("/financial/outcome/id/"+id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.outcome[0];
};

Outcome.delete = async (id) => {
	let response = await fetch("/financial/outcome/delete/id/"+id, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);
	
	return true;
};