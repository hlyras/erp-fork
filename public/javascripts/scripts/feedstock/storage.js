$(() => {
	$("#feedstock-storage-create-form").on('submit', (event)=>{
		event.preventDefault();
		document.getElementById("feedstock-storage-create-submit").disabled = true;

		var name = document.getElementById('feedstock-storage-create-form').elements.namedItem("name").value;

		if(name.length < 3 || name.length > 20){
			document.getElementById('feedstock-storage-create-form').elements.namedItem("name").value = "";
			document.getElementById("feedstock-storage-create-submit").disabled = false;
			return alert("Nome de estoque inválido!");
		};

		let r = confirm('Realmente deseja criar um novo estoque para as matérias-primas?');

		if(r){
			$.ajax({
				url: '/feedstock/storage/create',
				method: 'post',
				data: $("#feedstock-storage-create-form").serialize(),
				success: (response) => {
					if(response.unauthorized){
						alert(response.unauthorized);
						window.location.href = '/login';
						return;
					};
					
					if(response.msg){
						alert(response.msg);
						return document.getElementById('feedstock-storage-create-submit').disabled = false;
					};

					alert(response.done);
					document.getElementById('feedstock-storage-create-form').elements.namedItem("name").value = "";
					document.getElementById("feedstock-storage-create-submit").disabled = false;
				}
			});
		} else {
			return document.getElementById("feedstock-storage-create-submit").disabled = false;
		}
	});
});