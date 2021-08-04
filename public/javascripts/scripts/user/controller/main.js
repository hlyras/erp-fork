User.controller = {};

User.controller.updateInfo = document.getElementById("user-edit-info-form");
if(User.controller.updateInfo){
	User.controller.updateInfo.addEventListener("submit", async event => {
		event.preventDefault();

		console.log(event.target.elements.namedItem("email").value);
	});
}