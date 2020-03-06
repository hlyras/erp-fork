const API = {
	verifyResponse(res, form){
		if(res.unauthorized){
			alert(res.unauthorized);
			return window.location.href = '/login';
		};
		if(res.msg){
			alert(res.msg);
			if(btn){
				document.getElementById(form).elements.namedItem("submit").disabled = false;
			};
			document.getElementById('ajax-loader').style.visibility = 'hidden';
			return true;
		};
		return false;
	}
};