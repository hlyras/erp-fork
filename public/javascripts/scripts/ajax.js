$(function(){
	// Simple Ajax model
	$("#object-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('ajax-loader').style.visibility = 'visible';
		document.getElementById('object-create-form').elements.namedItem("submit").disabled = true;
		// return alert("Esta funcionalidade está em progresso e será implementada em breve!");

		$.ajax({
			url: '/object/manage/save',
			method: 'post',
			data: $("#object-create-form").serialize(),
			success: (response) => {
				if(API.verifyResponse(response, "object-create-form")){return};
				
				document.getElementById('ajax-loader').style.visibility = 'hidden';
				
				console.log(response.done);
				
				document.getElementById("object-create-form").elements.namedItem('name').value = "";
				document.getElementById("object-create-form").elements.namedItem('abbreviation').value = "";
				document.getElementById('object-create-form').elements.namedItem("submit").disabled = false;
				// $("#object-filter-form").submit();
			}
		});
	});

	// Table button
	$("#object-function-table").on("click", "object-function-btn", function(event){
		let btn = $(this);btn.css('pointerEvents', 'none');

		$.ajax({
			url: '/object/function',
			method: 'post',
			data: {
				obj_cod: obj_cod
			},
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					btn.css('pointerEvents', 'auto');
					return;
				};

				alert(response.done);
			}
		});
	});

	$("#object-function-form").submit(function(event){
		$.ajax({
			url: '/object/function',
			method: 'post',
			data: {},
			success: function(response){
				
			}
		});
	});

	$("#object-function-select").on("change", function(event){
		
	});
});