Department.view = {};

Department.view.filter = (departments, setup) => {
	const filter_div = document.getElementById("department-filter-div");
	filter_div.innerHTML = "";

	if(!departments.length){
		filter_div.append(lib.element.create("div", { class: "box b1 lucida-grande bold center" }, "Nenhum departamento foi encontrado"));
	};

	for(let i = setup.page * setup.pageSize; i < departments.length && i < (setup.page + 1) * setup.pageSize; i++){
		let department_div = lib.element.create("div", { class: "box b1 container ground border-lg-st radius-5 padding-5 margin-top-5" });
		department_div.append(lib.element.create("div", { class: "box b8 lucida-grande bold input-show border-lg-st center pointer" }, departments[i].id))
		department_div.append(lib.element.create("div", { class: "box b4 lucida-grande bold center" }, departments[i].code))
		department_div.append(lib.element.create("div", { class: "box b5-8 lucida-grande bold center" }, departments[i].name))
		filter_div.append(department_div);
	}
};