Product.select = {
	fill: (products, select) => {
		select.innerHTML = "";
		for(i in products){
			select.innerHTML += "<option value='"+products[i].id+"'>"+products[i].code+" | "+products[i].name+" | "+products[i].color+" | "+products[i].size+"</option>"
		};
	}
};