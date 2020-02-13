$(function(){
	$("#product-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('product-create-submit').disabled = true;

		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		$.ajax({
			url: '/product/save',
			method: 'post',
			data: $("#product-create-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					alert(response.msg);
					document.getElementById('product-create-submit').disabled = false;
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				alert(response.done);
				
				filterProduct(document.getElementById('product-create-name').value, "", "", "admin");

				document.getElementById('product-create-id').value = "";
				document.getElementById('product-create-code').value = "";
				document.getElementById('product-create-color').value = "";
				document.getElementById('product-create-name').value = "";
				document.getElementById('product-create-size').value = "";

				document.getElementById('product-create-submit').disabled = false;
			}
		});
	});
	
	$("#product-filter-form").on('submit', (event) => {
		event.preventDefault();
		let btn = $(this);btn.attr('disabled', true);

		let location = document.getElementById("product-filter-form").elements.namedItem('location').value;
		let name = document.getElementById("product-filter-form").elements.namedItem('name').value;
		let code = document.getElementById("product-filter-form").elements.namedItem('product_code').value;
		let color = document.getElementById("product-filter-form").elements.namedItem('color').value;

		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: "/product/filter?name="+name+"&code="+code+"&color="+color,
			method: 'get',
			success: (products) => {
				if(products.unauthorized){
					alert(products.unauthorized);
					return window.location.href = '/login';
				};
				
				document.getElementById('ajax-loader').style.visibility = 'hidden';

				var pageSize = 15;
				var page = 0;

				function paging(){
					if(products.length){
						if(location==="productAdmin"){
							renderAdminProducts(products, pageSize, page, location);
						} else if (location==="productCatalog"){
							renderCatalogProducts(products, pageSize, page, location);
						};
					} else {
						if(location==="productAdmin"){
							lib.clearTable('product-admin-filter-tbl', location);
						} else if (location==="productCatalog"){
							lib.clearTable('product-catalog-filter-tbl', location);
						};
					};
				};

				btn.attr('disabled', false);

				function buttonsPaging(){
					$("#"+location+"Next").prop('disabled', products.length <= pageSize || page >= products.length / pageSize - 1);
					$("#"+location+"Previous").prop('disabled', products.length <= pageSize || page == 0);
				};

				$(function(){
				    $("#"+location+"Next").click(function(){
				        if(page < products.length / pageSize - 1){
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
			if(response.unauthorized){
				alert(response.unauthorized);
				window.location.href = '/login';
				return;
			};

			document.getElementById('ajax-loader').style.visibility = 'hidden';

			let html = "";
			html += "<tr>";
			html += "<td class='nowrap'>"+response.product[0].code+"</td>";
			html += "<td>"+response.product[0].name+"</td>";
			html += "<td>"+response.product[0].size+"</td>";
			html += "<td>"+response.product[0].color+"</td>";
			html += "</tr>";
			html += "<tr>";
			if(admin){
				document.getElementById("product-addFeedstock-form").elements.namedItem('product_id').value = response.product[0].id;
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
		}
	});
};

function filterProduct(name, code, color, session){
	document.getElementById('ajax-loader').style.visibility = 'visible';
	$.ajax({
		url: "/product/filter?name="+name+"&code="+code+"&color="+color,
		method: 'get',
		success: (products) => {
			if(products.unauthorized){
				alert(products.unauthorized);
				return window.location.href = '/login';
			};

			document.getElementById('ajax-loader').style.visibility = 'hidden';

			var pageSize = 10;
			var page = 0;

			function paging(){
				if(products.length){
					if(session==="admin"){
						renderAdminProducts(products, pageSize, page);
					} else if (session==="catalog"){
						renderCatalogProducts(products, pageSize, page);

					}
				} else {
					lib.clearTable('product-admin-filter-tbl', products.location);
				};
			};

			function buttonsPaging(){
				$('#productNext').prop('disabled', products.length <= pageSize || page >= products.length / pageSize - 1);
				$('#productPrevious').prop('disabled', products.length <= pageSize || page == 0);
			};

			$(function(){
			    $('#productNext').click(function(){
			        if(page < products.length / pageSize - 1){
			            page++;
			            paging();
			            buttonsPaging();
			        };
			    });
			    $('#productPrevious').click(function(){
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
};

function editProduct(id){
	document.getElementById('ajax-loader').style.visibility = 'visible';
	$.ajax({
		url: '/product/id/'+id,
		method: 'get',
		success: (product) => {
			document.getElementById('ajax-loader').style.visibility = 'hidden';

			document.getElementById('product-create-id').value = product[0].id;
			document.getElementById('product-create-code').value = product[0].code;
			document.getElementById('product-create-name').value = product[0].name;
			document.getElementById('product-create-color').value = product[0].color;
			document.getElementById('product-create-size').value = product[0].size;

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
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';

				lib.displayDiv('product-show-box');
				alert(response.done);
				$("#product-filter-form").submit();
			}
		});
	};
};