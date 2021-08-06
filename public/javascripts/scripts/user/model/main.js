const User = {};

User.updateInfo = async user => {
	let response = await fetch("/user/updateInfo", {
		method: "PUT",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ user })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.user[0];
};

User.updatePassword = async user => {
	let response = await fetch("/user/updatePassword", {
		method: "PUT",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ user })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.user[0];
};