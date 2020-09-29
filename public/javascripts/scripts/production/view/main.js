Production.view = {
	simulation: (feedstocks) => {
		var html = "";
		html += "<tr>";
		html += "<td>Cód</td>";
		html += "<td>Nome</td>";
		html += "<td>Cor</td>";
		html += "<td>Metragem</td>";
		html += "<td>Qtd</td>";
		html += "</tr>";
		for(i in feedstocks){
			html += "<tr>";
			html += "<td class='nowrap'>"+feedstocks[i].code+"</td>";
			html += "<td>"+feedstocks[i].name+"</td>";
			html += "<td>"+feedstocks[i].color+"</td>";
			html += "<td class='nowrap'>"+feedstocks[i].total_amount+""+feedstocks[i].uom+"</td>";
			if(feedstocks[i].uom == "cm"){
				html += "<td class='nowrap'>"+lib.roundToInt(feedstocks[i].total_amount/feedstocks[i].standard)+"un</td>";
			} else if(feedstocks[i].uom == "un"){
				html += "<td class='nowrap'>"+feedstocks[i].total_amount+"un</td>";
			};
			html += "</tr>";
		};

		document.getElementById("production-simulation-box").style.display = "block";
		document.getElementById("production-simulation-table").innerHTML = html;
	}
};