Product.controller.catalog = {};

Product.view.catalog = {};
Product.view.catalog.filter = async (products, pagination) => {
	var html = "";
	for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
		html += "<div class='box two ground padding-10 margin-top-10'>";
		html += "<div class='container'>";
		html += `<h3 class="box one center pointer" onclick="window.location.href='/product/show/`+products[i].code+`'">`+products[i].code+` - `+products[i].name+` `+products[i].color+` - `+products[i].size+`<h3>`;
		html += "</div>";
		html += "</div>";
	};

	document.getElementById("product-catalog-filter-box").style.visibility = "visible";
	document.getElementById("product-catalog-container").innerHTML = html;
};

Product.view.catalog.card = {
	image: {
		show: (images, pagination, params) => {
			let html = "";
		    if(images.length){
			    for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
					document.getElementById("product-"+images[i].product_id+"-catalog-card-img").src = images[i].url;
				};
		    } else {
				document.getElementById("product-"+params[0]+"-catalog-card-img").src = "/images/product/no-product.png";
		    };
		}
	}
};

Product.controller.catalog.filter = document.getElementById("product-catalog-filter-form");
if(Product.controller.catalog.filter){
	Product.controller.catalog.filter.addEventListener("submit", async (event) => {
		event.preventDefault();
		document.getElementById('ajax-loader').style.visibility = 'visible';

		// event.target.elements.namedItem("brand");

		let product = {
			name: event.target.elements.namedItem("name").value,
			code: event.target.elements.namedItem("code").value,
			color: event.target.elements.namedItem("color").value,
			brand: event.target.elements.namedItem("brand").value
		};

		let products = await Product.filter(product);

		const pagination = { pageSize: 20, page: 0};
		$(() => { lib.carousel.execute("product-catalog-filter-box", Product.view.catalog.filter, products, pagination); });

		document.getElementById('ajax-loader').style.visibility = 'hidden';
	});
};