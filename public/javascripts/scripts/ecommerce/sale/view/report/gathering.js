Ecommerce.sale.gathering.report.view = {};

Ecommerce.sale.gathering.report.view.filter = (gatherings, setup) => {
  let html = "";
  html += "<div class='box b1 container box-hover border-explicit'>";
    html += "<div class='mobile-box a2-5 em06 padding-10 center'>Embalador</div>";
    html += "<div class='mobile-box a5 em06 padding-10 center'>Quantidade</div>";
    html += "<div class='mobile-box a5 em06 padding-10 center'>Porcentagem</div>";
    html += "<div class='mobile-box a5 em06 padding-10 center'>Comissão</div>";
  html += "</div>";
  for(let i = setup.page * setup.pageSize; i < gatherings.length && i < (setup.page + 1) * setup.pageSize; i++){
    html += "<div class='box a1 container box-hover border margin-top-5'>";
    if(!gatherings[i].gathering_user_name){
      html += "<div class='mobile-box a2-5 em12 padding-10 center'>Não embalados</div>";
    } else {
      html += "<div class='mobile-box a2-5 em12 padding-10 center'>"+gatherings[i].gathering_user_name+"</div>";
    }
    html += "<div class='mobile-box a5 em12 bold padding-10 center'>"+gatherings[i].amount+"</div>";
    html += "<div class='mobile-box a5 em12 bold padding-10 center'>"+gatherings[i].percentage+"%</div>";
    html += "<div class='mobile-box a5 em12 bold padding-10 center'>R$"+gatherings[i].commission+"</div>";
    html += "</div>";
  };
  document.getElementById("ecommerce-sale-gathering-report-filter-div").innerHTML = html;
};