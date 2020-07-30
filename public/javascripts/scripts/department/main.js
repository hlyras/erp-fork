$(() => {
	$("department-create-form").on('submit', event => {
		event.preventDefault();
		console.log('ok deu certo');
	});
});

alert('functionou');