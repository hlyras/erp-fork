Ecommerce.sale.gathering.report.view = {};

Ecommerce.sale.gathering.report.view.filter = (gatherings, sales) => {
  let user_box = document.getElementById("ecommerce-sale-gathering-report-filter-user");
  user_box.innerHTML = "";

  for(let i in gatherings){
    let user_div = lib.element.create("div", { class: "box a1 container box-hover border margin-top-5" });

    user_div.appendChild(lib.element.create("div", { class: "mobile-box a2 lucida-grande bold padding-10 center" }, gatherings[i].user_name ));
    user_div.appendChild(lib.element.create("div", { class: "mobile-box a4 lucida-grande bold padding-10 center" }, gatherings[i].amount ));
    user_div.appendChild(lib.element.create("div", { class: "mobile-box a4 lucida-grande bold padding-10 center" }, gatherings[i].percentage+"%" ));
    
    user_box.appendChild(user_div);
  };

  const setup = { pageSize: 10, page: 0 };
  (function(){ lib.carousel.execute("ecommerce-sale-gathering-report-filter-box", Ecommerce.sale.gathering.report.view.list, sales, setup); }());
};

Ecommerce.sale.gathering.report.view.list = (sales, setup) => {
  let filter_div = document.getElementById("ecommerce-sale-gathering-report-filter-div");
  filter_div.innerHTML = "";

  filter_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold underline center margin-top-10" }, "Lista dos pedidos" ))

  for(let i = setup.page * setup.pageSize; i < sales.length && i < (setup.page + 1) * setup.pageSize; i++){
    let sale_div = lib.element.create("div", { class: "box b2 container padding-10 margin-top-10 border-st" });
    sale_div.appendChild(lib.element.create("div", { class: "mobile-box b6 em08 margin-top-10" }, sales[i].origin));
    sale_div.appendChild(lib.element.create("div", { class: "mobile-box b3 em08 margin-top-10" }, sales[i].code));
    sale_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, sales[i].customer_name));
    sale_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em08 margin-top-10" }, sales[i].customer_user));
    sale_div.appendChild(lib.element.create("div", { class: "mobile-box b4 em08 margin-top-10" }, sales[i].status));
    sale_div.appendChild(lib.element.create("div", { class: "mobile-box b4 em08 margin-top-10" }, sales[i].user_name));
    sale_div.appendChild(lib.element.createInfo("mobile-box b3 em09 border padding-5 margin-top-10", "Hora da venda", lib.convertDatetime(lib.timestampToDatetime(sales[i].datetime))));
    sale_div.appendChild(lib.element.createInfo("mobile-box b3 em09 border padding-5 margin-top-10", "Hora da coleta", lib.convertDatetime(lib.timestampToDatetime(sales[i].date))));
    sale_div.appendChild(lib.element.createInfo("mobile-box b3 em09 border padding-5 margin-top-10", "Hora do Embalo", lib.convertDatetime(lib.timestampToDatetime(sales[i].packing_datetime))));
    filter_div.appendChild(sale_div);
  };
};