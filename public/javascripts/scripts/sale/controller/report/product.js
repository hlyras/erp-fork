Sale.product.report.controller = {};

Sale.product.report.controller.filter = document.getElementById("sale-product-report-filter-form");
if(Sale.product.report.controller.filter){
  Sale.product.report.controller.filter.addEventListener("submit", async event => {
    event.preventDefault();

    let sale = {
      product_name: event.target.elements.namedItem("product-name").value,
      product_color: event.target.elements.namedItem("product-color").value,
      periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
      periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
      status: event.target.elements.namedItem("status").value
    };

    let response = await API.response(Sale.product.report.filter, sale);
    if(!response){ return false };

    let productAmountById = {};
    response.sale_products.forEach(function (product) {
      productAmountById[product.product_id] = (productAmountById[product.product_id] || 0) + product.amount;
    });

    response.sale_package_products.forEach(function (product) {
      productAmountById[product.product_id] = (productAmountById[product.product_id] || 0) + product.amount;
    });

    let products = [];

    for (let [key, value] of Object.entries(productAmountById)) {
      let product = { id: key, code: 0, name: "", color: "", amount: value };
      for(let i in response.sale_products){ 
        if(key == response.sale_products[i].product_id){
          product.code = response.sale_products[i].code;
          product.name = response.sale_products[i].name;
          product.color = response.sale_products[i].color;
          product.size = response.sale_products[i].size;
        }
      };
      for(let i in response.sale_package_products){ 
        if(key == response.sale_package_products[i].product_id){ 
          product.code = response.sale_package_products[i].code;
          product.name = response.sale_package_products[i].name;
          product.color = response.sale_package_products[i].color;
          product.size = response.sale_package_products[i].size;
        }
      };
      products.push(product);
    };

    if(event.target.elements.namedItem("order").value == "amount"){
      products = lib.sort(products, "amount", "desc");
    } else {
      products = lib.sort(products, "code");
    }

    document.getElementById("sale-product-report-filter-box").style.display = "";

    const setup = { pageSize: 10, page: 0, status: sale.status };
    (function(){ lib.carousel.execute("sale-product-report-filter-box", Sale.product.report.view.filter, products, setup); }());
  });
};