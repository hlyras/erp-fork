Department.controller = {};

Department.controller.save = document.getElementById("department-create-form");
if (Department.controller.save) {
	Department.controller.save.addEventListener("submit", async e => {
		e.preventDefault();

		let department = {
			id: e.target.id.value,
			name: e.target.name.value,
			code: e.target.code.value
		};

		let response = await API.response(Department.save, department);
		if (!response) { return false; }

		e.target.name.value = "";
		e.target.code.value = "";
	});
}

Department.controller.filter = document.getElementById("department-filter-form");
if (Department.controller.filter) {
	Department.controller.filter.addEventListener("submit", async e => {
		e.preventDefault();

		let department = {
			name: e.target.name.value,
			code: e.target.code.value
		};

		let departments = await API.response(Department.filter, department);
		if (!departments) { return false; }

		lib.display("department-filter-box", "");

		const setup = { pageSize: 10, page: 0 };
		(function () { lib.carousel.execute("department-filter-box", Department.view.filter, departments, setup); }());
	});
}