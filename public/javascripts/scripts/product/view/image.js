Product.view.image = {
	show: (images, pagination) => {
		let image_div = document.getElementById("product-image-div");
		image_div.innerHTML = "";
	    for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
	    	let image = lib.element.create("img", { class: 'image-box', src: images[i].url });

	    	let remove_div = lib.element.create("div", { class: "box b1 container h-center" });
	    	let remove_btn = lib.element.create("button", {
	    		class: "box b3 submit-generic center pointer",
	    		onclick: "Product.image.controller.remove("+images[i].id+","+images[i].product_id+")"
	    	}, "Excluir imagem");

	    	image_div.appendChild(image);
	    	image_div.appendChild(remove_div);
	    	remove_div.appendChild(remove_btn);
		};
	}
};