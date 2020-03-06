$(function(){
	$("#product-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('product-create-form').elements.namedItem("submit").disabled = true;

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: '/product/save',
			method: 'post',
			data: $("#product-create-form").serialize(),
			success: (response) => {
				if(API.verifyResponse(response, "product-create-form")){return};

				alert(response.done);
				
				document.getElementById("product-filter-form").elements.namedItem("name").value = document.getElementById("product-create-form").elements.namedItem("name").value;
				$("#product-filter-form").submit();

				document.getElementById("product-create-form").elements.namedItem("id").value = "";
				document.getElementById("product-create-form").elements.namedItem("code").value = "";
				document.getElementById("product-create-form").elements.namedItem("name").value = "";
				document.getElementById("product-create-form").elements.namedItem("color").value = "";
				document.getElementById("product-create-form").elements.namedItem("size").value = "";

				document.getElementById('product-create-form').elements.namedItem("submit").disabled = false;
				document.getElementById('ajax-loader').style.visibility = 'hidden';
			}
		});
	});
	
	$("#product-filter-form").on('submit', (event) => {
		event.preventDefault();

		let location = document.getElementById("product-filter-form").elements.namedItem('location').value;
		let name = document.getElementById("product-filter-form").elements.namedItem('name').value;
		let code = document.getElementById("product-filter-form").elements.namedItem('code').value;
		let color = document.getElementById("product-filter-form").elements.namedItem('color').value;

		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: "/product/filter?name="+name+"&code="+code+"&color="+color,
			method: 'get',
			success: (response) => {
				if(API.verifyResponse(response)){return};
				
				let pageSize = 15;
				let page = 0;

				function paging(){
					if(response.products.length){
						if(location==="productManage"){
							renderManageProducts(response.products, pageSize, page, location);
						} else if (location==="productCatalog"){
							renderCatalogProducts(response.products, pageSize, page, location);
						} else if (location==="productProduction"){
							fillProductSelect(response.products, document.getElementById("product-production-kart-form").elements.namedItem('product_id'));
						};
					} else {
						if(location==="productManage"){
							lib.clearTable('product-manage-filter-tbl', location);
						} else if (location==="productCatalog"){
							lib.clearTable('product-catalog-filter-tbl', location);
						} else if (location==="productProduction"){
							document.getElementById("product-production-kart-form").elements.namedItem("product_id").innerHTML = "<option value=''>Sem registros</option>";
						};
					};
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';

				function buttonsPaging(){
					$("#"+location+"Next").prop('disabled', response.products.length <= pageSize || page >= response.products.length / pageSize - 1);
					$("#"+location+"Previous").prop('disabled', response.products.length <= pageSize || page == 0);
				};

				$(function(){
				    $("#"+location+"Next").click(function(){
				        if(page < response.products.length / pageSize - 1){
				            page++;
				            paging();
				            buttonsPaging();
				        };
				    });
				    $("#"+location+"Previous").click(function(){
				        if(page > 0){
				            page--;
				            paging();
				            buttonsPaging();
				        };
				    });
				    paging();
				    buttonsPaging();
				});
			}
		});
	});
});

function showProduct(id, admin){
	document.getElementById('ajax-loader').style.visibility = 'visible';
	$.ajax({
		url: '/product/id/'+id,
		method: 'get',
		success: (response) => {
			if(API.verifyResponse(response)){return};
			
			let html = "";
			html += "<tr>";
			html += "<td class='nowrap'>"+response.product[0].code+"</td>";
			html += "<td>"+response.product[0].name+"</td>";
			html += "<td>"+response.product[0].size+"</td>";
			html += "<td>"+response.product[0].color+"</td>";
			html += "</tr>";
			html += "<tr>";
			if(admin){
				document.getElementById("product-addFeedstock-form").elements.namedItem('id').value = "";
				document.getElementById("product-addFeedstock-form").elements.namedItem('product_id').value = response.product[0].id;
				document.getElementById("product-addFeedstock-form").elements.namedItem('feedstock_id').disabled = false;
				document.getElementById('product-feedstock-box').style.display = "none";

				html += "<td><a class='tbl-show-link nowrap' onclick='productAddImage("+response.product[0].id+")'>+ Img</a></td>";
				html += `<td><a class="tbl-show-link nowrap" onclick="lib.displayDiv('product-feedstock-div')">+ M-P</a></td>`;
				html += `<td><a class="tbl-show-link" onclick="\
							if(document.getElementById('product-feedstock-box').style.display == 'none'){\
								productFeedstockRender(`+response.product[0].id+`)\
							} else { \
								document.getElementById('product-feedstock-box').style.display = 'none' \
							}">Matérias</a>`;
			} else {
				html += "<td></td>";
				html += "<td></td>";
				html += "<td></td>";
			};
			html += `<td><a class="tbl-show-link" onclick="lib.displayDiv('product-show-box')">Fechar</a></td>`;
			html += "</tr>";

			document.getElementById('product-show-tbody').innerHTML = html;
			document.getElementById('product-show-box').style.display = "block";

			if(response.product[0].images.length){
				productImagePagination(response.product[0].images, response.product[0].id, admin);
			} else {
				document.getElementById('product-image-show').innerHTML = "SEM IMAGENS";
				document.getElementById('imagePageNumber').innerHTML = '0';
				document.getElementById('imagePrevious').disabled = true;
				document.getElementById('imageNext').disabled = true;
			};
			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function editProduct(id){
	document.getElementById('ajax-loader').style.visibility = 'visible';
	$.ajax({
		url: '/product/id/'+id,
		method: 'get',
		success: (response) => {
			if(API.verifyResponse(response)){return};

			document.getElementById('ajax-loader').style.visibility = 'hidden';

			document.getElementById('product-create-form').elements.namedItem("id").value = response.product[0].id;
			document.getElementById('product-create-form').elements.namedItem("name").value = response.product[0].name;
			document.getElementById('product-create-form').elements.namedItem("code").value = response.product[0].code;
			document.getElementById('product-create-form').elements.namedItem("color").value = response.product[0].color;
			document.getElementById('product-create-form').elements.namedItem("size").value = response.product[0].size;

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function removeProduct(id){
	let r = confirm('Deseja realmente excluir o produto?');

	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: '/product/remove?id='+id,
			method: 'delete',
			success: function(response){
				if(API.verifyResponse(response)){return};

				document.getElementById('product-show-box').style.display = "none";
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);

				$("#product-filter-form").submit();
			}
		});
	};
};