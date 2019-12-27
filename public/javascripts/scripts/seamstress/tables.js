function clearSeamstressTable(location){
	document.getElementById("seamstress-tbl").innerHTML = "SEM PRODUTOS COM ESSAS CORES OU CATEGORIAS";
	$('#seamstressPrevious').prop('disabled');
	$('#seamstressNext').prop('disabled');
	$('#seamstressPageNumber').text('0');
};

function renderSeamstress(seamstresses, pageSize, page){
	var html = "<tr>";
	html += "<td>Id</td>";
	html += "<td>Nome</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < seamstresses.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		// html += "<td><a onclick='showSeamstress("+seamstresses[i].id+")'>"+seamstresses[i].id+"</a></td>";
		html += "<td>"+seamstresses[i].id+"</td>";
		html += "<td>"+seamstresses[i].name+"</td>";
		html += "</tr>";
	};
	document.getElementById('seamstress-tbl').innerHTML = html;
	document.getElementById('seamstress-div').style.display = 'block';
	$('#seamstressPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(seamstresses.length / pageSize));
};