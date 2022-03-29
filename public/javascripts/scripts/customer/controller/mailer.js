Customer.mailer.controller = {};

Customer.mailer.controller.filter = document.getElementById("customer-mailer-filter-form");
if(Customer.mailer.controller.filter){
    Customer.mailer.controller.filter.addEventListener("submit", async e => {
        e.preventDefault();

        let customers = await API.response(Customer.mailer.filter, {});
        if(!customers) { return false; }

        lib.display("customer-mailer-filter-box", "");

        const pagination = { pageSize: 16, page: 0};
		(function(){ lib.carousel.execute("customer-mailer-filter-box", Customer.mailer.view.filter, customers, pagination); }());
    });
}

Customer.mailer.controller.send = async (customer_id, icon) => {
	let response = await API.response(Customer.mailer.send, customer_id);
	if(!response) { return false; }

    icon.remove();
};