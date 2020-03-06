$(() => {
	$("#product-addFeedstock-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('product-addFeedstock-form').elements.namedItem("submit").disabled = true;

		let feedstock_id = document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_id').value;
		let amount = document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_amount').value;

		if(feedstock_id < 1 || !feedstock_id){
			alert("É necessário selecionar a matéria-prima");
			return document.getElementById('product-addFeedstock-form').elements.namedItem("submit").disabled = false;
		};

		if(amount < 0.01 || !amount){
			alert("É necessário preencher a quantidade de matéria-prima");
			return document.getElementById('product-addFeedstock-form').elements.namedItem("submit").disabled = false;
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: '/product/feedstock/add',
			method: 'post',
			data: $("#product-addFeedstock-form").serialize(),
			success: (response) => {
				if(API.verifyResponse(response, "product-addFeedstock-form")){return};
				
				document.getElementById('ajax-loader').style.visibility = 'hidden';

				alert(response.done);

				productFeedstockRender(document.getElementById("product-addFeedstock-form").elements.namedItem('product_id').value);

				document.getElementById("product-addFeedstock-form").elements.namedItem('id').value = "";
				document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_id').innerHTML = "";
				document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_id').disabled = false;
				document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_amount').value = "";
				document.getElementById('product-addFeedstock-form').elements.namedItem("submit").disabled = false;
			}
		});
	});
});


function productFeedstockRender(product_id){
	document.getElementById('ajax-loader').style.visibility = 'visible';

	document.getElementById("product-feedstock-box").style.display = "block";
	
	$.ajax({
		url: "/product/feedstock/list/id/"+product_id,
		method: "get",
		success: (response) => {
			if(API.verifyResponse(response, "product-addFeedstock-form")){return};
			
			document.getElementById('ajax-loader').style.visibility = 'hidden';

			for(i in response.product_feedstocks){
				for(j in response.feedstocks){
					if(response.product_feedstocks[i].feedstock_id == response.feedstocks[j].id){
						response.product_feedstocks[i].feedstock_code = response.feedstocks[j].code;
						response.product_feedstocks[i].feedstock_name = response.feedstocks[j].name;
						response.product_feedstocks[i].feedstock_color = response.feedstocks[j].color;
						response.product_feedstocks[i].feedstock_uom = response.feedstocks[j].uom;
					};
				};
			};

			if(response.product_feedstocks.length){
				var html = "";

				html += "<tr>";
				html += "<td>Cód</td>";
				html += "<td>Nome</td>";
				html += "<td>Cor</td>";
				html += "<td>Qtd</td>";
				html += "</tr>";

				response.product_feedstocks.sort((a, b) => {
				  return a.feedstock_code - b.feedstock_code;
				});

				for(i in response.product_feedstocks){
					html += "<tr>";
					html += "<td class='nowrap'>"+response.product_feedstocks[i].feedstock_code+"</td>";
					html += "<td>"+response.product_feedstocks[i].feedstock_name+"</td>";
					html += "<td>"+response.product_feedstocks[i].feedstock_color+"</td>";
					html += "<td>"+response.product_feedstocks[i].amount+""+response.product_feedstocks[i].feedstock_uom+"</td>";
					html += "<td><a class='tbl-show-link nowrap' onclick='editProductFeedstock("+response.product_feedstocks[i].id+", "+response.product_feedstocks[i].feedstock_id+", "+response.product_feedstocks[i].amount+", "+response.product_feedstocks[i].product_id+")'>Edit</a></td>";
					html += "<td><a class='tbl-show-link nowrap' onclick='removeProductFeedstock("+response.product_feedstocks[i].id+", "+response.product_feedstocks[i].product_id+")'>Rem</a></td>";
					html += "</tr>";
				};

				document.getElementById("product-feedstock-tbl").innerHTML = html;
			} else {
				document.getElementById("product-feedstock-tbl").innerHTML = "Sem registros!";
			};

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function productFeedstockClear(tbl){
	document.getElementById(tbl).innerHTML = "Sem registros";
};

function editProductFeedstock(id, feedstock_id, feedstock_amount, product_id){
	document.getElementById('ajax-loader').style.visibility = 'visible';
	
	$.ajax({
		url: '/feedstock/id/'+feedstock_id,
		method: 'get',
		success: function(feedstock){
			document.getElementById("product-feedstock-div").style.display = "block";

			document.getElementById("product-addFeedstock-form").elements.namedItem('id').value = id;
			document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_id').innerHTML = "<option value="+feedstock[0].id+">"+feedstock[0].code+" | "+feedstock[0].name+" | "+feedstock[0].color+" | "+feedstock[0].uom+"</option>";
			document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_id').disabled = true;
			document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_amount').value = feedstock_amount;

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function removeProductFeedstock(id, product_id){
	let r = confirm('Deseja realmente excluir a matéria prima?');

	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: '/product/feedstock/remove?id='+id,
			method: 'delete',
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';

				productFeedstockRender(product_id);
				alert(response.done);
			}
		});
	};
};