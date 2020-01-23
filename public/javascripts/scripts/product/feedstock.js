$(() => {
	$("#product-addFeedstock-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('product-addFeedstock-submit').disabled = true;

		let feedstock_id = document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_id').value;
		let amount = document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_amount').value;

		if(feedstock_id < 1 || !feedstock_id){
			alert("É necessário selecionar a matéria-prima");
			return document.getElementById('product-addFeedstock-submit').disabled = false;
		};

		if(amount < 1 || !amount){
			alert("É necessário preencher a quantidade de matéria-prima");
			return document.getElementById('product-addFeedstock-submit').disabled = false;
		};

		$.ajax({
			url: '/product/addfeedstock',
			method: 'post',
			data: $("#product-addFeedstock-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById('product-addFeedstock-submit').disabled = false;
					return;
				};

				alert(response.done);

				productFeedstockRender(response.product_feedstocks, 'product-feedstock-tbl')
				
				document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_amount').value = "";
					
				document.getElementById('product-addFeedstock-submit').disabled = false;
			}
		});
	});
});

function productFeedstockRender(product_feedstocks, tbl){
	document.getElementById('product-feedstock-box').style.display = "block";

	var html = "";

	html += "<tr>";
	html += "<td>Cód</td>";
	html += "<td>Nome</td>";
	html += "<td>Cor</td>";
	html += "<td>Qtd</td>";
	html += "<td>Un.Med</td>";
	html += "</tr>";

	product_feedstocks.sort((a, b) => {
	  return a.code - b.code;
	});

	for(i in product_feedstocks){
		html += "<tr>";
		html += "<td>"+product_feedstocks[i].code+"</td>";
		html += "<td>"+product_feedstocks[i].name+"</td>";
		html += "<td>"+product_feedstocks[i].color+"</td>";
		html += "<td>"+product_feedstocks[i].amount+"</td>";
		html += "<td>"+product_feedstocks[i].uom+"</td>";
		html += "<td><a onclick='removeProductFeedstock("+product_feedstocks[i].id+", "+product_feedstocks[i].product_id+")'>Rem</a></td>";
		html += "</tr>";
	};

	document.getElementById(tbl).innerHTML = html;
};

function productFeedstockClear(tbl){
	document.getElementById('product-feedstock-box').style.display = "none";
	document.getElementById(tbl).innerHTML = "";
};

function removeProductFeedstock(id, product_id){
	let r = confirm('Deseja realmente excluir a matéria prima?');

	if(r){
		$.ajax({
			url: '/product/removefeedstock?id='+id,
			method: 'delete',
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				showProduct(product_id, true);
				alert(response.done);
			}
		});
	};
};