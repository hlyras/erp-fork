$(() => {
	$("#get").on("submit", (e) => {
		e.preventDefault();
		$.ajax({
			url: "/api",
			method: "GET",
			success: (response) => {
				alert(response.message);
			}
		});
	});

	$("#post").on("submit", (e) => {
		e.preventDefault();
		$.ajax({
			url: "/api",
			method: "POST",
			success: (response) => {
				alert(response.message);
			}
		});
	});

	$("#put").on("submit", (e) => {
		e.preventDefault();
		$.ajax({
			url: "/api",
			method: "PUT",
			success: (response) => {
				alert(response.message);
			}
		});
	});

	$("#patch").on("submit", (e) => {
		e.preventDefault();
		$.ajax({
			url: "/api",
			method: "PATCH",
			success: (response) => {
				alert(response.message);
			}
		});
	});

	$("#delete").on("submit", (e) => {
		e.preventDefault();
		$.ajax({
			url: "/api",
			method: "DELETE",
			success: (response) => {
				alert(response.message);
			}
		});
	});
});