Ecommerce.sale.gathering.report.controller = {};

Ecommerce.sale.gathering.report.controller.filter = document.getElementById("ecommerce-sale-gathering-report-filter-form");
if (Ecommerce.sale.gathering.report.controller.filter) {
  Ecommerce.sale.gathering.report.controller.filter.addEventListener("submit", async event => {
    event.preventDefault();

    let sale = {
      origin: event.target.elements.namedItem("origin").value,
      status: event.target.elements.namedItem("status").value,
      periodStart: lib.datetimeToTimestamp(event.target.elements.namedItem("periodStart").value),
      periodEnd: lib.datetimeToTimestamp(event.target.elements.namedItem("periodEnd").value),
      user_id: event.target.elements.namedItem("user-id").value
    };

    let response = await API.response(Ecommerce.sale.gathering.report.filter, sale);
    if (!response) { return false };

    console.log(response);

    let gatheringAmountByUserId = {};
    response.sale_gatherings.forEach(function (sale) {
      gatheringAmountByUserId[sale.user_id] = (gatheringAmountByUserId[sale.user_id] || 0) + 1;
    });

    let gatherings = [];

    for (let [key, value] of Object.entries(gatheringAmountByUserId)) {
      let gathering = { id: key, amount: value };
      for (let i in response.sale_gatherings) {
        if (key == response.sale_gatherings[i].user_id) {
          gathering.user_name = response.sale_gatherings[i].user_name;
        }
      };
      gatherings.push(gathering);
    };

    if (gatherings.length) {
      let index = gatherings.reduce((total, gathering) => total + gathering.amount, 0); //Total embalado
      for (let i in gatherings) {
        gatherings[i].percentage = lib.ruleOfThree(index, 100, gatherings[i].amount).toFixed(2);
        gatherings[i].commission = lib.ruleOfThree(100, 20, gatherings[i].percentage).toFixed(2);
      };
    }

    lib.display("ecommerce-sale-gathering-report-filter-box", "");

    Ecommerce.sale.gathering.report.view.filter(gatherings, response.sale_gatherings);
  });
};