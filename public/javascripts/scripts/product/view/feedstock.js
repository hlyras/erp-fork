Product.view.feedstock = {
	list: async (feedstocks, pagination) => {
		let html = "";
		for (let i = pagination.page * pagination.pageSize; i < feedstocks.length && i < (pagination.page + 1) * pagination.pageSize;i++){
			// console.log(feedstocks[i].name);
			html += "<div class='box-1'>";
			html += "<h4 class='underline'>"+feedstocks[i].name+"</h4>";
			
			html += "<table class='tbl-info box-1'>";
			html += "<tr style='color:#555'>";
			html += "<td>Cód</td>";
			html += "<td>Nome</td>";
			html += "<td>Cor</td>";
			html += "<td>Qtd</td>";
			html += "<td>Medida</td>";
			html += "<td></td>";
			html += "<td></td>";
			html += "</tr>";
			for(j in feedstocks[i]){
				if(feedstocks[i][j] != feedstocks[i].name){
					html += "<tr class='bold'>";
					html += "<td>"+feedstocks[i][j].code+"</td>";
					html += "<td>"+feedstocks[i][j].name+"</td>";
					html += "<td>"+feedstocks[i][j].color+"</td>";
					html += "<td>"+feedstocks[i][j].amount+"un</td>";
					if(feedstocks[i][j].uom == "cm"){
						html += "<td>"+feedstocks[i][j].measure+"cm</td>";
					} else {
						html += "<td> - </td>";
					};
					html += "<td><img class='img-tbl-btn' src='/images/icon/edit.png' onclick='Product.controller.feedstock.edit("+feedstocks[i][j].id+", "+feedstocks[i][j].code+", `"+feedstocks[i][j].name+"`, `"+feedstocks[i][j].color+"`)'></td>";
					html += "<td><img class='img-tbl-btn' src='/images/icon/trash.png' onclick='Product.controller.feedstock.remove("+feedstocks[i][j].id+", "+feedstocks[i][j].product_id+")'></td>";
					html += "</tr>";
				};
			};
			html += "</table>";
			html += "</div>";
		};
		document.getElementById("product-feedstock-list-box").innerHTML = html;
	}
};