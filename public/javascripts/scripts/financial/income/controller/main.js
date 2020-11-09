Financial.income.controller = {};

Financial.income.controller.create = document.getElementById("financial-income-create-form");
if(Financial.income.controller.create){
	Financial.income.controller.create.addEventListener("submit", async (event) => {
		event.preventDefault();
		event.target.elements.namedItem("submit").disabled = true;
		document.getElementById("ajax-loader").style.visibility = "visible";
	});
};

Product.controller.manage.create = document.getElementById("product-create-form");
if(Product.controller.manage.create){
	document.getElementById("product-create-form").addEventListener("submit", async (event) => {
		event.preventDefault();
		event.target.elements.namedItem("submit").disabled = true;
		document.getElementById('ajax-loader').style.visibility = 'visible';

		let product = {
			id: event.target.elements.namedItem("id").value,
			code: event.target.elements.namedItem("code").value,
			name: event.target.elements.namedItem("name").value,
			color: event.target.elements.namedItem("color").value,
			size: event.target.elements.namedItem("size").value,
			brand: event.target.elements.namedItem("brand").value
		};

		product = await Product.save(product, "product-create-form");
		if(!product){ return false };

		document.getElementById("product-filter-form").elements.namedItem("code").value = product.code;
		document.getElementById("product-filter-form").submit.click();

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("code").value = "";
		event.target.elements.namedItem("name").value = "";
		event.target.elements.namedItem("color").value = "";
		event.target.elements.namedItem("size").value = "";
		event.target.elements.namedItem("brand").value = "";

		event.target.elements.namedItem("submit").disabled = false;
		document.getElementById('ajax-loader').style.visibility = 'hidden';
	});
};

$("#financial-income-create-form").on('submit', (event) => {
	event.preventDefault();
	document.getElementById('income-create-submit').disabled = true;

	const category = document.getElementById("financial-income-create-form").elements.namedItem('income_category');
	const origin = document.getElementById("financial-income-create-form").elements.namedItem('income_origin');
	const value = document.getElementById("financial-income-create-form").elements.namedItem('income_value').value;
	const obs = document.getElementById("financial-income-create-form").elements.namedItem('income_obs').value;

	const category_id = category.options[category.selectedIndex].value;
	const category_name = category.options[category.selectedIndex].text;

	const origin_id = origin.options[origin.selectedIndex].value;
	const origin_name = origin.options[origin.selectedIndex].text;

	if(category_id == "0"){
		alert("É necessário selecionar uma categoria!");
		return document.getElementById('income-create-submit').disabled = false;
	};

	if(origin_id == "0"){
		alert("É necessário selecionar uma origem!");
		return document.getElementById('income-create-submit').disabled = false;
	};

	if(value < 0.01){
		alert("É necessário cadastrar o valor da receita!");
		return document.getElementById('income-create-submit').disabled = false;	
	};

	document.getElementById('ajax-loader').style.visibility = 'visible';
	
	$.ajax({
		url: '/financial/income/save',
		method: 'post',
		data: {
			category_id: category_id,
			category_name: category_name,
			origin_id: origin_id,
			origin_name: origin_name,
			value: value,
			obs: obs
		},
		success: (response) => {
			if(response.unauthorized){
				alert(response.unauthorized);
				window.location.href = '/login';
				return;
			};
			
			if(response.msg){
				alert(response.msg);
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				document.getElementById('ajax-loader').style.display = 'none';
				return;
			};

			document.getElementById('ajax-loader').style.visibility = 'hidden';
			
			alert(response.done);

			document.getElementById("financial-income-create-form").elements.namedItem('income_category').value = "0";
			document.getElementById("financial-income-create-form").elements.namedItem('income_origin').value = "0";
			document.getElementById("financial-income-create-form").elements.namedItem('income_value').value = "0.00";
			document.getElementById("financial-income-create-form").elements.namedItem('income_obs').value = "";

			return document.getElementById('income-create-submit').disabled = false;	
		}
	});
});