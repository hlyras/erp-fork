// Sale.package.view = {};

// Sale.package.view.kart = {
// 	list: async (products) => {
// 		if(products.length){
// 			var html = "";
// 			html += "<tr>";
// 			html += "<td>Código</td>";
// 			html += "<td>Nome</td>";
// 			html += "<td>Cor</td>";
// 			html += "<td>Tamanho</td>";
// 			html += "<td></td>";
// 			html += "<td>Qtd</td>";
// 			html += "<td></td>";
// 			html += "<td></td>";
// 			html += "</tr>";
// 			for(i in products){
// 				html += "<tr>";
// 				html += "<td class='nowrap'>"+products[i].code+"</td>";
// 				html += "<td>"+products[i].name+"</td>";
// 				html += "<td>"+products[i].color+"</td>";
// 				html += "<td>"+products[i].size+"</td>";
// 				html += "<td class='nowrap'><img class='img-tbl-btn' src='/images/icon/decrease.png' onclick='Sale.controller.kart.product.decrease("+products[i].id+")'></td>";
// 				html += "<td class='nowrap'><input type='text' id='kart-product-"+products[i].id+"' onchange='Sale.controller.kart.product.updateAmount("+products[i].id+",this.value);lib.focus(this)' value='"+products[i].amount+"'></td>";
// 				html += "<td class='nowrap'><img class='img-tbl-btn' src='/images/icon/increase.png' onclick='Sale.controller.kart.product.increase("+products[i].id+")'></td>";
// 				html += "<td><img class='img-tbl-btn' src='/images/icon/trash.png' onclick='Sale.controller.kart.product.remove("+products[i].id+")'></td>";
// 				html += "</tr>";
// 			};
// 			document.getElementById("sale-kart-product-table").innerHTML = html;
// 		} else {
// 			document.getElementById("sale-kart-product-table").innerHTML = "";
// 		};
// 	}
// };