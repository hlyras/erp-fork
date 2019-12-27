$(function(){
	// Simple Ajax model
	$("#object-function-btn").on("click", function(event){
		let btn = $(this);btn.attr('disabled', true);
		let rowEl = $(this).closest('tr');
		let obj_cod = rowEl.find('#obj-cod').text();

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
					btn.attr('disabled', false);
					return;
				};

				alert(response.done);
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
		})
	});

	$("#object-function-frm").submit(function(event){
		$.ajax({
			url: '/object/function',
			method: 'post',
			data: {},
			success: function(response){
				
			}
		})
	});

	$("#object-function-select").on("change", function(event){
		
	});
});