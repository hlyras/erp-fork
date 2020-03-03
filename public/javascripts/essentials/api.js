const API = {
	verifyResponse(res, btn){
		if(res.unauthorized){
			alert(res.unauthorized);
			return window.location.href = '/login';
		};

		if(res.msg){
			alert(res.msg);
			if(btn){
				document.getElementById(btn).disabled = false;
			};
			document.getElementById('ajax-loader').style.visibility = 'hidden';
			return true;
		};
		
		return false;
	}
};