User.controller = {};

User.controller.updateInfo = document.getElementById("user-edit-info-form");
if (User.controller.updateInfo) {
	User.controller.updateInfo.addEventListener("submit", async event => {
		event.preventDefault();

		let user = {
			email: event.target.elements.namedItem("email").value
		};

		user = await API.response(User.updateInfo, user);
		if (user) { return false; }
	});
}

User.controller.updatePassword = document.getElementById("user-edit-password-form");
if (User.controller.updatePassword) {
	User.controller.updatePassword.addEventListener("submit", async event => {
		event.preventDefault();

		let user = {
			password: event.target.elements.namedItem("password").value,
			password_confirm: event.target.elements.namedItem("password-confirm").value
		};

		user = await API.response(User.updatePassword, user);
		if (user) { return false; }
	});
}