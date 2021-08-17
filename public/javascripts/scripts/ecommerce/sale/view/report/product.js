Ecommerce.sale.product.report.view = {};

Ecommerce.sale.product.report.view.filter = (products, setup) => {
  let html = "";
  html += "<div class='box b1 container box-hover border-explicit'>";
    html += "<div class='mobile-box a9 em06 padding-10 center'>Código</div>";
    html += "<div class='mobile-box a2 em08 padding-10 center'>Nome</div>";
    html += "<div class='mobile-box a9 em07 padding-10 center'>Cor</div>";
    html += "<div class='mobile-box a9 em06 padding-10 center'>Tamanho</div>";
    html += "<div class='mobile-box a6 em06 padding-10 center'>Quantidade</div>";
  html += "</div>";
  for(let i = setup.page * setup.pageSize; i < products.length && i < (setup.page + 1) * setup.pageSize; i++){
    html += "<div class='box a1 container box-hover border margin-top-5'>";
      html += "<div class='mobile-box a9 em12 padding-10 center'>"+products[i].code+"</div>";
      html += "<div class='mobile-box a2 em12 padding-10'>"+products[i].name+"</div>";
      html += "<div class='mobile-box a9 padding-10 center'>"+products[i].color+"</div>";
      html += "<div class='mobile-box a9 padding-10 center'>"+products[i].size+"</div>";
      html += "<div class='mobile-box a6 em12 bold padding-10 center'>"+products[i].amount+"</div>";
    html += "</div>";
  };
  document.getElementById("ecommerce-sale-product-report-filter-div").innerHTML = html;
};