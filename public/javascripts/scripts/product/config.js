function productColorList(form, session){
	$.ajax({
		url: '/product/colorList',
		method: 'get',
		success: (response) => {
			var html = "";
			html += "<option value=''>Cor</option>";
			response.forEach((color) => {
				html += "<option value='"+color.shortcut+"'>"+color.name+"</option>";
			});
			
			if(session){
				document.getElementById("product-"+session+"-color").innerHTML = html;
			} else {
				document.getElementById("product-color").innerHTML = html;
			};
		}
	});
};