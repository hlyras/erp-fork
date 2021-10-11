Sale.customer.report.controller = {};

Sale.customer.report.controller.filter = document.getElementById("sale-customer-report-filter-form");
if(Sale.customer.report.controller.filter){
  Sale.customer.report.controller.filter.addEventListener("submit", async event => {
    event.preventDefault();

    let sale = { status: "Enviado" };

    let response = await API.response(Sale.customer.report.filter, sale);
    if(!response){ return false };

    let saleAmountByCustomerId = {};
    response.sales.forEach(function (sale) {
      saleAmountByCustomerId[sale.customer_id] = (saleAmountByCustomerId[sale.customer_id] || 0) + 1;
    });

    let customerTotalSaleValue = {};
    response.sales.forEach(function (sale) {
      customerTotalSaleValue[sale.customer_id] = (customerTotalSaleValue[sale.customer_id] || 0) + (sale.product_value + sale.package_value - sale.discount_value);
    });

    let customers = [];

    for (let [key, amount] of Object.entries(saleAmountByCustomerId)) {
      let customer = { id: key, amount: amount };
      for(let i in response.sales){ 
        if(key == response.sales[i].customer_id){
          customer.name = response.sales[i].customer_name;
          customer.brand = response.sales[i].brand;
          customer.trademark = response.sales[i].trademark;
        }
      };
      customers.push(customer);
    };


    for(let [key, totalValue] of Object.entries(customerTotalSaleValue)) {
    	customers.forEach((customer) => {
    		if(key === customer.id){ customer.totalValue = lib.roundValue(totalValue)};
    	});
    };

   	lib.sort(response.sales, 'sale_date');

   	customers.forEach((customer) => {
   		response.sales.forEach((sale) => {
   			if(customer.id === sale.customer_id) { 
   				customer.lastValue = lib.roundValue((sale.product_value + sale.package_value - sale.discount_value)); 
   				customer.lastDate = lib.timestampToDate(sale.sale_date);
          customer.daysOff = lib.roundToInt((lib.genTimestamp() - sale.sale_date) / lib.timestampDay());
   				customer.user_name = sale.user_name;
   			};
   		});
   	});

    lib.sort(customers, 'daysOff', 'desc');

    const setup = { pageSize: 20, page: 0 };
    (function(){ lib.carousel.execute("sale-customer-report-filter-box", Sale.customer.report.view.filter, customers, setup); }());
  });
};