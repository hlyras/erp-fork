Product.controller.catalog = {};

Product.view.catalog = {};
Product.view.catalog.filter = async (products, pagination) => {
	var html = "";
	for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
		html += "<div class='box-4'>";
		html += "<div class='container'>";
		html += "<h1 class='box-1'>"+products[i].name+"<h1>";

		html += "<div id='product-"+products[i].id+"-catalog-card' class='box-1'>"
		html += "<img id='product-"+products[i].id+"-catalog-card-img' class='box-1'>"
		html += `<div name="carousel-navigation">\
					<button name="carousel-previous" class="btn-pagination" autocomplete="off" disabled>&lsaquo;&lsaquo;</button>\
				    <span name="carousel-page"></span>\
				    <button name="carousel-next" class="btn-pagination" autocomplete="off" disabled>&rsaquo;&rsaquo;</button>\
				</div>`;
		html += "</div>";
		html += "</div>";

		const pagination = { pageSize: 1, page: 0};
		$(() => { lib.carousel.execute("product-"+products[i].id+"-catalog-card", Product.view.catalog.card.image.show, products[i].images, pagination, [products[i].id]); });
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
		console.log('Catalog');
		document.getElementById('ajax-loader').style.visibility = 'visible';

		// event.target.elements.namedItem("brand");

		let product = {
			name: event.target.elements.namedItem("name").value,
			code: event.target.elements.namedItem("code").value,
			color: event.target.elements.namedItem("color").value,
			brand: event.target.elements.namedItem("brand").value
		};

		console.log(product);

		let products = await Product.filter(product);

		const pagination = { pageSize: 20, page: 0};
		$(() => { lib.carousel.execute("product-catalog-filter-box", Product.view.catalog.filter, products, pagination); });

		document.getElementById('ajax-loader').style.visibility = 'hidden';
	});
};




// function renderProductCatalog(products, pageSize, page, location){
// 	var html = "";
// 	for (i in products){
// 		html += "<div class='box-4'>";
// 			html += "<div id='product-"+products[i].id+"-image-div' class='box'>";
// 				// html += "<div class='box' id='product-"+products[i].id+"-image-div'>";
// 				html += "<div class='catalog-image-div' onclick='window.location=`/product/id/"+products[i].id+"`' id='product-"+products[i].id+"-image-show'></div>";
// 				html += "<br>";
// 				html += "<span class='impact'>"+products[i].name+" "+products[i].size+" | "+products[i].color+"</span>";
// 					html += "<br>";
// 					html += "<br>";
// 					if(products[i].images.length){
// 						html += "<button id='product"+products[i].id+"imagePrevious' class='btn-pagination' style='float:left;margin-left:15px' autocomplete='off' disabled>&lsaquo;&lsaquo;</button>";
// 						html += "<span class='impact' id='product"+products[i].id+"imagePageNumber'></span>";
// 						html += "<button id='product"+products[i].id+"imageNext' class='btn-pagination' style='float:right;margin-right:15px' autocomplete='off' disabled>&rsaquo;&rsaquo;</button>";
// 					};
// 				// html += "</div>";
// 			html += "</div>";
// 		html += "</div>";
// 	};

// 	document.getElementById("product-catalog").innerHTML = html;

// 	for(i in products){
// 		if(products[i].images.length){
// 			productImagePagination(products[i].images);
// 		} else {
// 			document.getElementById("product-"+products[i].id+"-image-show").innerHTML = "<br><br><br><br><br>SEM IMAGENS<br><br><br><br><br>";
// 			document.getElementById("product-"+products[i].id+"-image-div").style.height = "91%";
// 			// document.getElementById("product"+products[i].id+"imagePageNumber").innerHTML = "0";
// 			// document.getElementById("product"+products[i].id+"imagePrevious").disabled = true;
// 			// document.getElementById("product"+products[i].id+"imageNext").disabled = true;
// 		};
// 	};
// };