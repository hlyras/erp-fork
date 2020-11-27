const API = {
	verifyResponse(res){
		if(res.unauthorized){
			alert(res.unauthorized);
			return window.location.href = '/login';
		};
		if(res.msg){
			alert(res.msg);
			return true;
		};
		return false;
	}
};