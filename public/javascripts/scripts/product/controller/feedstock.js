Product.controller.feedstock = {
	list: async (product_id) => {
		document.getElementById('ajax-loader').style.visibility = 'visible';

		let product = { id: product_id };
		product.feedstocks = await Product.feedstock.list(product_id);
		product.feedstock_categories = await Product.feedstock.category.list(product_id);

		let feedstocks = [];

		for(i in product.feedstock_categories){
			product.feedstock_categories[i].feedstocks = [];
			product.feedstock_categories[i].feedstocks.name = product.feedstock_categories[i].name;
			for(j in product.feedstocks){
				if(product.feedstock_categories[i].id == product.feedstocks[j].category_id){
					product.feedstocks[j].category_name = product.feedstock_categories[i].name;
					product.feedstock_categories[i].feedstocks.push(product.feedstocks[j]);
				};
			};
			if(product.feedstock_categories[i].feedstocks.length){
				feedstocks.push(product.feedstock_categories[i].feedstocks);
			};
		};

		let noCategory = [];
		for(i in product.feedstocks){
			noCategory.name = "Sem categoria";
			if(!product.feedstocks[i].category_id){
				product.feedstocks[i].category_name = noCategory.name;
				noCategory.push(product.feedstocks[i]);
			};
		};
		if(noCategory.length){ feedstocks.push(noCategory); };

		const pagination = { pageSize: 3, page: 0 };
		$(() => { lib.carousel.execute("product-feedstock-box", Product.view.feedstock.list, feedstocks, pagination); });

		return document.getElementById('ajax-loader').style.visibility = 'hidden';
	},
	edit: async (product_feedstock_id, feedstock_code, feedstock_name, feedstock_color) => {
		document.getElementById('ajax-loader').style.visibility = 'visible';

		let product_feedstock = await Product.feedstock.findById(product_feedstock_id);
		await Product.controller.feedstock.form.display(product_feedstock.product_id);

		document.getElementById("product-feedstock-add-box").style.display = "block";

		document.getElementById("product-feedstock-add-form").elements.namedItem("id").value = product_feedstock_id;
		document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_id").innerHTML = "<option value="+product_feedstock.id+">"+feedstock_code+" | "+feedstock_name+" | "+feedstock_color+" | "+product_feedstock.uom+"</option>";
		document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_id").disabled = true;
		if(product_feedstock.uom == "un"){
			document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").value = product_feedstock.amount;
			document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").disabled = false;
			document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = true;
			document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").value = "";
			document.getElementById("product-feedstock-add-form").elements.namedItem("category_id").value = product_feedstock.category_id;
		} else if(product_feedstock.uom == "cm"){
			document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").value = product_feedstock.amount;
			document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").disabled = false;
			document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").value = product_feedstock.measure;
			document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = false;
			document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_category_id").value = product_feedstock.category_id;
		};

		document.getElementById('ajax-loader').style.visibility = 'hidden';
	},
	remove: async (product_feedstock_id, product_id) => {
		let r = confirm('Deseja realmente excluir a matéria prima?');
		if(r){
			document.getElementById('ajax-loader').style.visibility = 'visible';
			if(!await Product.feedstock.remove(product_feedstock_id)){ return false };
			if(!await Product.controller.feedstock.list(product_id)){ return false };
			document.getElementById('ajax-loader').style.visibility = 'hidden';
		};
	},
	form: {
		display: async (product_id) => {
			document.getElementById("product-feedstock-category-create-form").elements.namedItem("product_id").value = product_id;
			document.getElementById("product-feedstock-add-form").elements.namedItem("product_id").value = product_id;

			const product_feedstock_categories = await Product.feedstock.category.list(product_id);

			let html = "";
			html += "<option value='0'>Sem Categoria</option>"
			for(i in product_feedstock_categories){
				html += "<option value='"+product_feedstock_categories[i].id+"'>"+product_feedstock_categories[i].name+"</option>";
			};

			document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_category_id").innerHTML = html;
		}
	},
	uom: {
		inputs: (uom) => {
			if(uom){
				uom = uom.options[uom.selectedIndex].text.split(' | ');
				if(uom[3] == "un"){
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").disabled = false;
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = true;
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").value = "";
				} else if(uom[3] == "cm"){
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").disabled = false;
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = false;
				};
			} else {
				if(document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_uom").value == "un"){
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = true;
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").value = "";
				} else if(document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_uom").value == "cm"){
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").disabled = false;
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = false;
				};
			};
		}
	}
};

document.getElementById("product-feedstock-category-create-form").addEventListener("submit", async (event) => {
	event.preventDefault();
	document.getElementById('ajax-loader').style.visibility = 'visible';

	let category = {
		id: document.getElementById("product-feedstock-category-create-form").elements.namedItem("id").value,
		product_id: document.getElementById("product-feedstock-category-create-form").elements.namedItem("product_id").value,
		category_name: document.getElementById("product-feedstock-category-create-form").elements.namedItem("category_name").value
	};

	if(!await Product.feedstock.category.save(category)){ return false };

	await Product.controller.feedstock.form.display(category.product_id);
	
	document.getElementById("product-feedstock-category-create-form").elements.namedItem("category_name").value = "";
	document.getElementById('ajax-loader').style.visibility = 'hidden';
});

document.getElementById("product-feedstock-add-form").addEventListener("submit", async (event) => {
		event.preventDefault();
		document.getElementById('ajax-loader').style.visibility = 'visible';

		if(!document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_id").value){ return alert("É necessário preencher o produto") };

		let product_feedstock = {
			id: document.getElementById("product-feedstock-add-form").elements.namedItem('id').value,
			product_id: document.getElementById("product-feedstock-add-form").elements.namedItem('product_id').value,
			feedstock_id: document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_id').value,
			uom: document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_id").options[document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_id").selectedIndex].text.split(' | ')[3],
			amount: document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_amount').value,
			measure: document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_measure').value,
			category_id: document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_category_id").value
		};

		if(!await Product.feedstock.add(product_feedstock)){ return false };

		document.getElementById("product-feedstock-box").style.display = "block";
		if(!await Product.controller.feedstock.list(product_feedstock.product_id)){ return false };
				
		document.getElementById("product-feedstock-add-form").elements.namedItem('id').value = "";
		document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_id').innerHTML = "";
		document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_id').disabled = false;
		document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_amount').value = "";
		document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_measure').value = "";
		document.getElementById('product-feedstock-add-form').elements.namedItem("submit").disabled = false;

		document.getElementById('ajax-loader').style.visibility = 'hidden';
});