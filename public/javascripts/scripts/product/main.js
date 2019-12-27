var product_array = [];

$(function(){
	$("#product-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('product-create-submit').disabled = true;

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
					alert(response.msg);
					document.getElementById('product-create-submit').disabled = false;
					return;
				};


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
		let code = document.getElementById("product-filter-form").elements.namedItem('code').value;
		let color = document.getElementById("product-filter-form").elements.namedItem('color').value;

		$.ajax({
			url: "/product/filter?name="+name+"&code="+code+"&color="+color,
			method: 'get',
			success: (products) => {
				if(products.unauthorized){
					alert(products.unauthorized);
					return window.location.href = '/login';
				};

				let pageSize = 10;
				let page = 0;

				function paging(){
					if(products.length){
						if(location==="admin"){
							renderAdminProducts(products, pageSize, page);
						} else if (location==="catalog"){
							renderCatalogProducts(products, pageSize, page);
						}
					} else {
						lib.clearTable('product-admin-filter-tbl','productAdminFilter');
					};
				};

				btn.attr('disabled', false);

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
	});
});

function showProduct(id, admin){
	$.ajax({
		url: '/product/id/'+id,
		method: 'get',
		success: (product) => {
			if(product.unauthorized){
				alert(product.unauthorized);
				window.location.href = '/login';
				return;
			};

			let html = "";
			html += "<tr>";
			html += "<td>"+product[0].code+"</td>";
			html += "<td>"+product[0].name+"</td>";
			html += "<td>"+product[0].size+"</td>";
			html += "<td>"+product[0].color+"</td>";
			html += "<td><a class='tbl-show-link' onclick='hideProduct()'>Esconder</a></td>";
			html += "</tr>";

			document.getElementById('product-show-tbody').innerHTML = html;
			document.getElementById('product-show-box').style.display = 'block';

			if(product[0].images.length){
				productImagePagination(product[0].images, product[0].id, admin);
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
	$.ajax({
		url: "/product/filter?name="+name+"&code="+code+"&color="+color,
		method: 'get',
		success: (products) => {
			if(products.unauthorized){
				alert(products.unauthorized);
				return window.location.href = '/login';
			};

			let pageSize = 10;
			let page = 0;

			function paging(){
				if(products.length){
					if(session==="admin"){
						renderAdminProducts(products, pageSize, page);
					} else if (session==="catalog"){
						renderCatalogProducts(products, pageSize, page);

					}
				} else {
					clearProductTable(products.location);
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
	$.ajax({
		url: '/product/id/'+id,
		method: 'get',
		success: (product) => {
			document.getElementById('product-create-form').style.display = "block";

			document.getElementById('product-create-id').value = product[0].id;
			document.getElementById('product-create-code').value = product[0].code;
			document.getElementById('product-create-name').value = product[0].name;
			document.getElementById('product-create-color').value = product[0].color;
			document.getElementById('product-create-size').value = product[0].size;
		}
	});
};

function removeProduct(id){
	let r = confirm('Deseja realmente excluir o produto?');

	if(r){
		$.ajax({
			url: '/product/remove?id='+id,
			method: 'delete',

			// url: '/product/remove',
			// method: 'post',
			// data: {
			// 	product_id: id
			// },
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				hideProduct();
				alert(response.done);
				$("#product-filter-form").submit();
			}
		});
	};
};