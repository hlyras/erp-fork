Outcome.category.view = {};

Outcome.category.view.show = (category) => {
	let html = "";
	html += "<div class='mobile-box b4 em12 bold avant-garde center'>"+category.id+"</div>";
	html += "<div class='mobile-box b2 em15 bold avant-garde center'>"+category.name+"</div>";

	document.getElementById("outcome-category-show-box").innerHTML = html;
	
	document.getElementById("outcome-category-show-box").style.display = "";
};

Outcome.category.view.filter = (categories, pagination) => {
	if(categories.length){
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < categories.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			html += "<div class='box b1 container border-explicit padding-5 margin-top-5'>";
				html += "<div class='mobile-box b7 border-explicit avant-garde bold center nowrap tbl-show-link' onclick='Outcome.category.controller.show("+categories[i].id+")'>"+categories[i].id+"</div>";
				html += "<div class='mobile-box b4-7 padding-5 v-center'>"+categories[i].name+"</div>";
				html += "<div class='mobile-box b7 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/edit.png' onclick='Outcome.category.controller.edit("+categories[i].id+")'></div>";
				html += "<div class='mobile-box b7 padding-5 margin-top-5 center'><img class='icon size-20' src='/images/icon/trash.png' onclick='Outcome.category.controller.delete("+categories[i].id+")'></div>";
			html += "</div>";
		};
		document.getElementById("outcome-category-filter-div").innerHTML = html;
	} else {
		document.getElementById("outcome-category-filter-div").innerHTML = "<div class='box b1 border-explicit padding-5 margin-top-5 center'>Sem resultados</div>";
	};
};