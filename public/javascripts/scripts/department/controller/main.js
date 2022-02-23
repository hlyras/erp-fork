Department.controller = {};

Department.controller.save = document.getElementById("department-create-form");
if(Department.controller.save){
	Department.controller.save.addEventListener("submit", async e => {
		e.preventDefault();

		let department = {
			id: e.target.elements.namedItem("id").value,
			name: e.target.elements.namedItem("name").value,
			code: e.target.elements.namedItem("code").value
		};

		let response = await API.response(Department.save, department);
		if(!response) { return false; }

		e.target.elements.namedItem("name").value = "";
		e.target.elements.namedItem("code").value = "";
	});
}

Department.controller.filter = document.getElementById("department-filter-form");
if(Department.controller.filter){
	Department.controller.filter.addEventListener("submit", async e => {
		e.preventDefault();

		let department = {
			name: e.target.elements.namedItem("name").value,
			code: e.target.elements.namedItem("code").value
		};

		console.log(department);

		let response = await API.response(Department.filter, department);
		if(!response) { return false; }
	});
}