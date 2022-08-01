Sale.financial.controller = {};

Sale.financial.controller.filter = async () => {
	let sale = {
		periodStart: lib.timestampToDate(new Date().getTime()),
		periodEnd: (new Date().getTime() + lib.timestampDay())
	};

	sale.periodStart = lib.splitTextBy(sale.periodStart, "-");
	
	let days = parseInt(sale.periodStart[0]);
	let currentMonth = `${sale.periodStart[1]}-${sale.periodStart[2]}`;

	sale.periodStart = `${sale.periodStart[2]}-${sale.periodStart[1]}-01`;
	sale.periodStart = lib.dateToTimestamp(sale.periodStart);

	let sales = await API.response(Sale.financial.filter, sale);
	if(!sales) { return false; }

	sale.user_id = document.getElementById("sale-filter-form").elements.namedItem("user_id").value;

	let monthlyGoal = Sale.financial.controller.calcMonthlyGoal(currentMonth);

	let metrics = { invoicing: 0, ticket: 0, estimated_invoicing: 0 };
	for(let i in sales) { metrics.invoicing += (sales[i].product_value + sales[i].package_value - sales[i].discount_value); };
	metrics.ticket = metrics.invoicing / days;
	metrics.estimated_invoicing = (metrics.invoicing / days) * 30;

	let individualMetrics = { invoicing: 0, ticket: 0, estimated_invoicing: 0, share: 0 };
	for(let i in sales) {
		if(sales[i].user_id == sale.user_id){
			individualMetrics.invoicing += (sales[i].product_value + sales[i].package_value - sales[i].discount_value); 
		}
	};
	individualMetrics.ticket = individualMetrics.invoicing / days;
	individualMetrics.estimated_invoicing = (individualMetrics.invoicing / days) * 30;
	individualMetrics.share = lib.ruleOfThree(metrics.invoicing, 100, individualMetrics.invoicing) || 0;

	let goalDone = (monthlyGoal > metrics.invoicing) ? false : true;

	let monthlyGoalDiv = document.getElementById("financial-metrics").children['monthly-goal'];
	monthlyGoalDiv.append(lib.element.create("div", { class: "box b1 lucida-grande em08 bold center" }, `Meta atual (${currentMonth})`));
	monthlyGoalDiv.append(lib.element.create("div", { class: "box b1 lucida-grande em09 center" }, `R$${monthlyGoal.toFixed(2)}`));

	let monthlyGoalLeftDiv = document.getElementById("financial-metrics").children['monthly-goal-left'];
	!goalDone && monthlyGoalLeftDiv.append(lib.element.create("div", { class: "box b1 lucida-grande em08 bold center", style: "color: #ff0000" }, `Para concluir a meta`));
	!goalDone && monthlyGoalLeftDiv.append(lib.element.create("div", { class: "box b1 lucida-grande em09 center" }, `R$${(monthlyGoal - metrics.invoicing).toFixed(2)}`));
	goalDone && monthlyGoalLeftDiv.append(lib.element.create("div", { class: "box b1 lucida-grande em08 bold center", style: "color: #0000ff" }, `Meta superada em`));
	goalDone && monthlyGoalLeftDiv.append(lib.element.create("div", { class: "box b1 lucida-grande em09 center" }, `R$${(metrics.invoicing - monthlyGoal).toFixed(2)}`));

	let currentValueSoldDiv = document.getElementById("financial-metrics").children['current-value-sold'];
	currentValueSoldDiv.append(lib.element.create("div", { class: "box b1 lucida-grande em08 bold" }, `Faturamento atual`));
	currentValueSoldDiv.append(lib.element.create("div", { class: "box b1 lucida-grande em09" }, `R$${metrics.invoicing.toFixed(2)}`));

	let dailyTicket = document.getElementById("financial-metrics").children['daily-ticket'];
	dailyTicket.append(lib.element.create("div", { class: "box b1 lucida-grande em08 bold" }, `Ticket diário`));
	dailyTicket.append(lib.element.create("div", { class: "box b1 lucida-grande em09" }, `R$${metrics.ticket.toFixed(2)}`));

	let userValueSold = document.getElementById("financial-metrics").children['user-value-sold'];
	userValueSold.append(lib.element.create("div", { class: "box b1 lucida-grande em08 bold" }, `Faturamento atual`));
	userValueSold.append(lib.element.create("div", { class: "box b1 lucida-grande em09" }, `R$${individualMetrics.invoicing.toFixed(2)}`));

	let userDailyTicket = document.getElementById("financial-metrics").children['user-daily-ticket'];
	userDailyTicket.append(lib.element.create("div", { class: "box b1 lucida-grande em08 bold" }, `Ticket diário`));
	userDailyTicket.append(lib.element.create("div", { class: "box b1 lucida-grande em09" }, `R$${individualMetrics.ticket.toFixed(2)}`));

	let userPercentage = document.getElementById("financial-metrics").children['user-percentage'];
	userPercentage.append(lib.element.create("div", { class: "box b1 lucida-grande em08 bold" }, `Minha participação`));
	userPercentage.append(lib.element.create("div", { class: "box b1 lucida-grande em09" }, `${individualMetrics.share.toFixed(2) || (0).toFixed(2)}%`));

	let userCommission = document.getElementById("financial-metrics").children['user-commission'];
	userCommission.append(lib.element.create("div", { class: "box b1 lucida-grande em08 bold" }, `Minha comissão`));
	!goalDone && userCommission.append(lib.element.create("div", { class: "box b1 lucida-grande em09" }, `R$${(individualMetrics.invoicing * 0.005).toFixed(2) || (0).toFixed(2)}`));
	goalDone && userCommission.append(lib.element.create("div", { class: "box b1 lucida-grande em09" }, `R$${(individualMetrics.invoicing * 0.01).toFixed(2) || (0).toFixed(2)}`));
}

Sale.financial.controller.filter();

Sale.financial.controller.calcMonthlyGoal = (currentMonth) => {
	let initialGoal = 50000;
	let cumulativeGoal = 0;
	let monthlyGoal = 0;
	let month = "";

	let years = [2021,2022,2023];
	let months = [];

	for(let i in years) {
		for(let j = 0; j < 12; j++) {
			if(i == 0 && j == 0) { cumulativeGoal = initialGoal; }
			else {
				month = (j + 1 < 10) ? `0${j + 1}-${years[i]}` : `${j + 1}-${years[i]}`;
				cumulativeGoal = cumulativeGoal + (cumulativeGoal * 0.03);
				monthlyGoal = (month == currentMonth) ? cumulativeGoal : monthlyGoal;
			}
		};
	};

	return monthlyGoal;
};
