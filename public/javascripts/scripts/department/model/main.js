const Department = {};

Department.save = async (department) => {
	let response = await fetch("/department/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(department)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Department.filter = async department => {
	let response = await fetch("/department/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(department)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.departments;
};