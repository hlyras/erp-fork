Product.view.image = {
	show: (images, pagination) => {
		let html = "";
	    for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
			html += "<img class='image-box' src='"+images[i].url+"'>";
		};


		document.getElementById('product-manage-image-div').innerHTML = html;
	},
	manage: {
		show: (images, pagination) => {
			let html = "";
		    if(images.length){
			    for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
					document.getElementById("product-manage-image-img").src = images[i].url;
					document.getElementById("product-manage-image-remove-button").setAttribute("onClick", "javascript: Product.controller.image.remove('"+images[i].id+"', '"+images[i].product_id+"');" );
					document.getElementById("product-manage-image-remove-button").disabled = false;
				};
		    } else {
				document.getElementById("product-manage-image-img").src = "/images/product/no-product.png";
				document.getElementById("product-manage-image-remove-button").setAttribute("onClick", "javascript: Product.controller.image.remove(0, 0);" );
				document.getElementById("product-manage-image-remove-button").disabled = true;
		    };
		}
	}
};