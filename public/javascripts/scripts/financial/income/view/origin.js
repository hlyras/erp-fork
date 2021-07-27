Income.origin.view = {};

Income.origin.view.show = (origin) => {
	let html = "";
	html += "<div class='mobile-box b4 em12 avant-garde center'>"+origin.id+"</div>";
	html += "<div class='mobile-box b2 avant-garde center'>"+origin.name+"</div>";
	document.getElementById("income-origin-show-title").innerHTML = html;
};

Income.origin.view.filter = (categories, pagination) => {
	if(categories.length){
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < categories.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<div class='box b1 container border-explicit padding-5 margin-top-5'>";
				html += "<div class='mobile-box b7 border-explicit avant-garde bold center nowrap tbl-show-link'>"+categories[i].id+"</div>";
				html += "<div class='mobile-box b4-7 padding-5 v-center'>"+categories[i].name+"</div>";
				html += "<div class='mobile-box b7 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/edit.png' onclick='Income.origin.controller.edit("+categories[i].id+")'></div>";
				html += "<div class='mobile-box b7 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/trash.png' onclick='Income.origin.controller.delete("+categories[i].id+")'></div>";
			html += "</div>";
		};
		document.getElementById("income-origin-filter-div").innerHTML = html;
		document.getElementById("income-origin-filter-box").children.namedItem("carousel-navigation").style.display = "";
		document.getElementById("income-origin-filter-box").style.display = "";
	} else {
		document.getElementById("income-origin-filter-div").innerHTML = "<div class='box b1 border-explicit padding-5 margin-top-5 center'>Sem resultados</div>";
		document.getElementById("income-origin-filter-box").children.namedItem("carousel-navigation").style.display = "";
		document.getElementById("income-origin-filter-box").style.display = "";
	};
};