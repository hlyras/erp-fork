const API = {
	verifyResponse(res){
		if(res.unauthorized){
			alert(res.unauthorized);
			return window.location.href = '/login';
		};
		if(res.msg){
			alert(res.msg);
			document.getElementById('ajax-loader').style.visibility = 'hidden';
			return true;
		};
		return false;
	}
};