$(function(){
	$("#seamstress-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('seamstress-create-submit').disabled = true;

		$.ajax({
			url: '/seamstress/save',
			method: 'post',
			data: $("#seamstress-create-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById('seamstress-create-submit').disabled = false;
					return;
				};

				alert(response.done);
				
				document.getElementById('seamstress-create-name').value = "";

				$("#seamstress-filter-form").submit();

				document.getElementById('seamstress-create-submit').disabled = false;
			}
		});
	});
	
	$("#seamstress-filter-form").on('submit', (event) => {
		event.preventDefault();
		let btn = $(this);btn.attr('disabled', true);

		let name = document.getElementById("seamstress-filter-form").elements.namedItem('name').value;
		console.log(name);

		$.ajax({
			url: "/seamstress/filter?name="+name,
			method: 'get',
			success: (seamstresses) => {
				if(seamstresses.unauthorized){
					alert(seamstresses.unauthorized);
					return window.location.href = '/login';
				};

				let pageSize = 10;
				let page = 0;

				function paging(){
					if(seamstresses.length){
						renderSeamstress(seamstresses, pageSize, page);
					} else {
						clearSeamstressTable(seamstresses.location);
					};
				};

				btn.attr('disabled', false);

				function buttonsPaging(){
					$('#seamstressNext').prop('disabled', seamstresses.length <= pageSize || page >= seamstresses.length / pageSize - 1);
					$('#seamstressPrevious').prop('disabled', seamstresses.length <= pageSize || page == 0);
				};

				$(function(){
				    $('#seamstressNext').click(function(){
				        if(page < seamstresses.length / pageSize - 1){
				            page++;
				            paging();
				            buttonsPaging();
				        };
				    });
				    $('#seamstressPrevious').click(function(){
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

function showSeamstress(id){
	$.ajax({
		url: '/seamstress/id/'+id,
		method: 'get',
		success: (seamstress) => {
			if(seamstress.unauthorized){
				alert(seamstress.unauthorized);
				window.location.href = '/login';
				return;
			};

			let html = "";
			html += "<tr>";
			html += "<td>"+seamstress[0].code+"</td>";
			html += "<td>"+seamstress[0].name+"</td>";
			html += "<td>"+seamstress[0].size+"</td>";
			html += "<td>"+seamstress[0].color+"</td>";
			html += "<td><a onclick='hideSeamstress()'>Esconder</a></td>";
			html += "</tr>";

			document.getElementById('seamstress-show-tbody').innerHTML = html;
			document.getElementById('seamstress-show-box').style.display = 'block';

			if(seamstress[0].images.length){
				seamstressImagePagination(seamstress[0].images, seamstress[0].id);
			} else {
				document.getElementById('seamstress-image-show').innerHTML = "SEM IMAGENS";
				document.getElementById('imagePageNumber').innerHTML = '0';
				document.getElementById('imagePrevious').disabled = true;
				document.getElementById('imageNext').disabled = true;
			};
		}
	});
};