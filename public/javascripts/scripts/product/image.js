function productAddImage(product_id){
	let image_url = prompt("Preencha com a URL da imagem");
	if(image_url){
		if(image_url.length < 7){
			return alert('URL inválida!');
		};
		if(image_url.length > 200){
			return alert('URL inválida!');
		};
		let img = '<img src="'+ image_url +'" />';
		$(img).on("load", () =>  {
			document.getElementById('ajax-loader').style.visibility = 'visible';
			$.ajax({
				url: '/product/addimage?product_id='+product_id+'&image_url='+image_url,
				method: 'post',
				success: (response) => {
					if(response.unauthorized){
						alert(response.unauthorized);
						window.location.href = '/login';
						return;
					};

					document.getElementById('ajax-loader').style.visibility = 'hidden';

					showProduct(product_id, true);
					alert(response.done);
				}
			});
		}).bind('error', () =>  {
			return alert('URL inválida!');
		});
	};
};

function productRemoveImage(image_id, product_id){
	let r = confirm("Deseja realmente excluir a image?");
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: '/product/removeimage?id='+image_id,
			method: 'delete',
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';

				showProduct(product_id, true);
				alert(response.done);
			}
		});
	};
};

function productImagePagination(images, product_id, admin){
	let pageSize = 1;
	let page = 0;

	function paging(){
		let htmlImage = "";
	    for (let i = page * pageSize; i < images.length && i < (page + 1) * pageSize;i++){
			htmlImage += "<img class='image' src='"+images[i].url+"'>";
			htmlImage += "<div clas='box-1'>";
			htmlImage += "<br>";
			if(admin){
				htmlImage += "<button class='btn-generic-big' onclick='productRemoveImage("+images[i].id+", "+product_id+")'>Excluir</button>";
			};
			htmlImage += "</div>";
		};

		document.getElementById('product-image-show').innerHTML = htmlImage;
		document.getElementById('product-image-show').style.display = 'block';
		
	    $('#imagePageNumber').text('' + (page + 1) + ' de ' + Math.ceil(images.length / pageSize));
	};

	function saleButtonsPaging(){
	    $('#imageNext').prop('disabled', images.length <= pageSize || page >= images.length / pageSize - 1);
	    $('#imagePrevious').prop('disabled', images.length <= pageSize || page == 0);
	};

	$(() => {
	    $('#imageNext').click(() => {
	        if(page < images.length / pageSize - 1){
	            page++;
	            paging();
	            saleButtonsPaging();
	        };
	    });
	    $('#imagePrevious').click(() => {
	        if(page > 0){
	            page--;
	            paging();
	            saleButtonsPaging();
	        };
	    });
	    paging();
	    saleButtonsPaging();
	});
};