Sale.packment.report.view = {};

Sale.packment.report.view.filter = (packments, setup) => {
  let html = "";
  html += "<div class='box b1 container box-hover border-explicit'>";
    html += "<div class='mobile-box a3-5 em06 padding-10 center'>Embalador</div>";
    html += "<div class='mobile-box a5 em06 padding-10 center'>Quantidade</div>";
    html += "<div class='mobile-box a5 em06 padding-10 center'>Porcentagem</div>";
    html += "<div class='mobile-box a5 em06 padding-10 center'>Comissão</div>";
  html += "</div>";
  for(let i = setup.page * setup.pageSize; i < packments.length && i < (setup.page + 1) * setup.pageSize; i++){
    html += "<div class='box a1 container box-hover border margin-top-5'>";
    if(!packments[i].packment_user_name){
      html += "<div class='mobile-box a3-5 em12 padding-10 center'>Não embalados</div>";
    } else {
      html += "<div class='mobile-box a3-5 em12 padding-10 center'>"+packments[i].packment_user_name+"</div>";
    }
    html += "<div class='mobile-box a5 em12 bold padding-10 center'>"+packments[i].amount+"</div>";
    html += "<div class='mobile-box a5 em12 bold padding-10 center'>"+packments[i].percentage+"%</div>";
    // html += "<div class='mobile-box a5 em12 bold padding-10 center'>"+packments[i].commission+"%</div>";
    html += "</div>";
  };
  document.getElementById("sale-packment-report-filter-div").innerHTML = html;
};