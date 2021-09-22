Product.view.catalog = {};

Product.view.catalog.filter = async (products, pagination) => {
	var html = "";
	for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
		html += `<div class="box b3 ground padding-10 margin-top-10 pointer" onclick="window.location.href='/product/show/`+products[i].code+`'">`;
		html += "<div class='container'>";
		html += `<h3 class="box b1 center">`+products[i].code+` - `+products[i].name+` - `+products[i].color+`<h3>`;
		if(products[i].image){
			html += "<div class='box b1'><img class='image-card' src='"+products[i].image+"' alt=''/></div>";
		} else {
			html += "<div class='box b1'><img class='image-card' src='/images/product/no-product.png' alt=''/></div>";
		};
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