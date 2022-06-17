const Sale = {};

Sale.findById = async (sale_id) => {
	let response = await fetch("/sale/id/" + sale_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.sale[0];
};

Sale.metrics = {};