Customer.controller.mailer = {};

Customer.controller.mailer = document.getElementById("send-email");
if(Customer.controller.mailer){
    Customer.controller.mailer.addEventListener("click", async e => {
        e.preventDefault();

        console.log('click');

        let response = await API.response(Customer.mailer.send, 1);
        if(!response) { return false; }

        console.log(response);
    })
}