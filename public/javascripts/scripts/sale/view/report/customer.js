Sale.customer.report.view = {};

Sale.customer.report.view.filter = (customers, setup) => {
  let reportDiv = document.getElementById("sale-customer-report-filter-div");
  reportDiv.innerHTML = "";
  
  for(let i = setup.page * setup.pageSize; i < customers.length && i < (setup.page + 1) * setup.pageSize; i++){
    let div = lib.element.create("div", { class: "mobile-box b1 container border-explicit radius-10 padding-5 margin-top-10 shadow-2-hover" });

    div.appendChild(lib.element.info("b4", "Id", customers[i].id));
    div.appendChild(lib.element.info("b2", "Nome", customers[i].name));
    div.appendChild(lib.element.info("b4", "Dias sem comprar", customers[i].daysOff));
    div.appendChild(lib.element.info("b4", "Vendas", customers[i].amount));
    div.appendChild(lib.element.info("b4", "Ultima compra", customers[i].lastDate));
    div.appendChild(lib.element.info("b4", "Valor da Ult. compra", "$"+customers[i].lastValue));
    div.appendChild(lib.element.info("b4", "Total em compras", "$"+customers[i].totalValue));
    if(customers[i].trademark){ div.appendChild(lib.element.info("b3", "Razão social", customers[i].trademark)); }
    if(customers[i].brand){ div.appendChild(lib.element.info("b3", "Marca", customers[i].brand)); }
    div.appendChild(lib.element.info("b3", "Vendedor", customers[i].user_name));
    
    reportDiv.appendChild(div);
  };

  document.getElementById("sale-customer-report-filter-box").style.display = "";
};