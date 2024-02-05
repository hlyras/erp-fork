const FeedstockSupplierController = {};

FeedstockSupplierController.create = document.getElementById("supplier-create-form");
if (FeedstockSupplierController.create) {
	FeedstockSupplierController.create.addEventListener("submit", async event => {
		event.preventDefault();

		let supplier = {
			id: event.target.elements.namedItem("id").value || null,
			cnpj: event.target.elements.namedItem("cnpj").value || null,
			trademark: event.target.elements.namedItem("trademark").value || null,
			brand: event.target.elements.namedItem("brand").value || null,
			name: event.target.elements.namedItem("name").value || null,
			phone: event.target.elements.namedItem("phone").value || null,
			origin_id: event.target.elements.namedItem("origin_id").value || null,
		};

		let response = await API.response(FeedstockSupplier.create, supplier);
		if (!response) { return false; }

		event.target.elements.namedItem('id').value = "";
		event.target.elements.namedItem('cnpj').value = "";
		event.target.elements.namedItem('trademark').value = "";
		event.target.elements.namedItem('brand').value = "";
		event.target.elements.namedItem('name').value = "";
		event.target.elements.namedItem('phone').value = "";
		event.target.elements.namedItem('origin_id').value = "";

		FeedstockSupplierController.filter.submit.click();
	});
}

FeedstockSupplierController.filter = document.getElementById("supplier-filter-form");
if (FeedstockSupplierController.filter) {
	FeedstockSupplierController.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let supplier = {
			cnpj: event.target.elements.namedItem("cnpj").value,
			trademark: event.target.elements.namedItem("trademark").value,
			brand: event.target.elements.namedItem("brand").value,
			name: event.target.elements.namedItem("name").value
		};

		let suppliers = await API.response(FeedstockSupplier.filter, supplier);
		if (!suppliers) { return false; }

		document.getElementById("supplier-filter-box").style.display = "";
		document.getElementById("supplier-storage-box").style.display = "none";

		const pagination = { pageSize: 10, page: 0 };
		(function () { lib.carousel.execute("supplier-filter-box", FeedstockSupplierView.filter, suppliers, pagination); }());
	});
}

FeedstockSupplierController.edit = async (id) => {
	let supplier = (await API.response(FeedstockSupplier.filter, { id }))[0];
	if (!supplier) { return false; }

	document.getElementById("supplier-create-form").elements.namedItem("id").value = supplier.id;
	document.getElementById("supplier-create-form").elements.namedItem("cnpj").value = supplier.cnpj;
	document.getElementById("supplier-create-form").elements.namedItem("trademark").value = supplier.trademark;
	document.getElementById("supplier-create-form").elements.namedItem("brand").value = supplier.brand;
	document.getElementById("supplier-create-form").elements.namedItem("name").value = supplier.name;
	document.getElementById("supplier-create-form").elements.namedItem("phone").value = supplier.phone;
	document.getElementById("supplier-create-form").elements.namedItem("origin_id").value = supplier.origin_id;
};

FeedstockSupplierController.delete = async (supplier_id) => {
	let r = confirm('Deseja realmente excluir o fornecedor?\n \n Essa ação não pode ser revertida!');
	if (r) {
		if (!await API.response(FeedstockSupplier.delete, supplier_id)) { return false; };
		FeedstockSupplierController.filter.submit.click();
	}
};

const FeedstockSupplierStorageController = {};

FeedstockSupplierStorageController.open = async (supplier_id) => {
	let supplier = await API.response(FeedstockSupplierStorage.open, supplier_id);
	if (!supplier) { return false; }

	document.getElementById("supplier-filter-box").style.display = "none";
	document.getElementById("supplier-storage-box").style.display = "";

	FeedstockSupplierStorageView.open(supplier);
};

FeedstockSupplierStorageController.add = document.getElementById("supplier-storage-add-form");
if (FeedstockSupplierStorageController.add) {
	FeedstockSupplierStorageController.add.addEventListener("submit", async event => {
		event.preventDefault();

		let feedstock = event.target.elements.namedItem("feedstock");
		if (!feedstock.readOnly) { return alert("Matéria-prima inválida"); };
		let supplier_id = event.target.elements.namedItem("supplier-id").value;
		let price = event.target.elements.namedItem("price").value;

		if (!feedstock) { return alert("É necessário selecionar um produto."); }
		if (price < 0.001 || !price) { return alert("É necessário preencher o preço do produto."); }

		let insert = {
			supplier_id: supplier_id,
			feedstock_id: feedstock.dataset.id,
			price: price
		};

		let response = await API.response(FeedstockSupplierStorage.create, insert);
		if (!response) { return false; }

		FeedstockSupplierStorageController.filter.submit.click();
	});
};

FeedstockSupplierStorageController.update = async (feedstock_id) => {
	let r = confirm('Confirmar alteração do preço?');
	if (r) {
		let feedstock = {
			id: feedstock_id,
			price: document.getElementById("storage-feedstock-" + feedstock_id).value
		};

		let response = await API.response(FeedstockSupplierStorage.update, feedstock);
		if (!response) { return false; }

		FeedstockSupplierStorageController.filter.submit.click();
	}
};

FeedstockSupplierStorageController.remove = async (feedstock_id) => {
	let r = confirm('Deseja realmente remover a matéria-prima do catálogo?');
	if (r) {
		let response = await API.response(FeedstockSupplierStorage.delete, feedstock_id);
		if (!response) { return false; }

		FeedstockSupplierStorageController.filter.submit.click();
	}
};

FeedstockSupplierStorageController.filter = document.getElementById("supplier-storage-filter-form");
if (FeedstockSupplierStorageController.filter) {
	FeedstockSupplierStorageController.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let feedstock = {
			supplier_id: event.target.elements.namedItem("supplier-id").value,
			code: event.target.elements.namedItem("code").value,
			name: event.target.elements.namedItem("name").value,
			color_id: event.target.elements.namedItem("color-id").value
		};

		let feedstocks = await API.response(FeedstockSupplierStorage.filter, feedstock);
		if (!feedstocks) { return false; }

		const pagination = { pageSize: 15, page: 0 };
		(function () { lib.carousel.execute("supplier-feedstock-box", FeedstockSupplierStorageView.filter, feedstocks, pagination); }());
	});
};

FeedstockSupplierStorageController.dropdown = {
	filter: async (input, dropdown_id, supplier_id) => {
		let feedstock = {
			name: input.value,
			supplier_id: supplier_id
		};

		let properties = ["code", "name", "color_name", "unit", "uom", "price"];

		if (feedstock.name.length > 2) {
			let feedstocks = await API.response(FeedstockSupplierStorage.filter, feedstock);
			if (!feedstocks) { return false; };

			lib.dropdown.render(feedstocks, input.id, dropdown_id, "input", "id", properties);
		} else {
			lib.dropdown.render([], input.id, dropdown_id, "input", "id", properties);
		};
	}
};