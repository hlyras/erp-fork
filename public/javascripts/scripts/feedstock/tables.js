function hideDiv(div){
	document.getElementById(div).style.display = "none";
};

function renderAdminFeedstocks(feedstocks, pageSize, page){
	var html = "<tr>";
	html += "<td>Cód</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Padrão</td>";
	html += "<td>Un.med</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < feedstocks.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		// html += "<td><a class='tbl-show-link' onclick='showProduct("+feedstocks[i].id+", "+true+")'>"+feedstocks[i].code+"</a></td>";
		html += "<td>"+feedstocks[i].code+"</td>";
		html += "<td>"+feedstocks[i].name+"</td>";
		html += "<td>"+feedstocks[i].color+"</td>";
		html += "<td>"+feedstocks[i].standard+"</td>";
		html += "<td>"+feedstocks[i].uom+"</td>";
		html += "<td ><a onclick='editFeedstock("+feedstocks[i].id+")'>Edit</a></td>";
		html += "<td><a onclick='removeFeedstock("+feedstocks[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};
	document.getElementById('feedstock-admin-filter-tbl').innerHTML = html;
	document.getElementById('feedstock-admin-filter-div').style.display = 'block';
	$('#feedstockAdminPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(feedstocks.length / pageSize));
};

function fillFeedstockSelect(feedstocks, select){
	select.innerHTML = "";
	for(i in feedstocks){
		select.innerHTML += "<option value='"+feedstocks[i].id+"'>"+feedstocks[i].code+" | "+feedstocks[i].name+" | "+feedstocks[i].color+" | "+feedstocks[i].uom+"</option>"
	};
};