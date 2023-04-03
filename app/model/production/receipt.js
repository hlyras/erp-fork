const db = require('../../../config/connection');
const lib = require("jarmlib");

class Receipt {
  constructor() {
    this.id;
    this.production_id;
    this.datetime;
    this.pouch;
    this.seal;
    this.status = "Ag. contagem"; // "Ag. conferência", "Ag. armazenamento"
    this.user_id;

    this.create = () => {
      if (!this.production_id) { return { err: "É necessário registrar de qual produção pertence o produto." }; };
      if (!this.datetime) { return { err: "A data é inválida." }; };
      if (!this.pouch) { return { err: "É necessário informar o número do malote que está sendo coletado." }; };
      if (!this.seal) { return { err: "É necessário informar o número do lacre." }; };
      if (!this.user_id) { return { err: "É necessário registrar o usuário que está coletando o malote." }; };
      if (!this.status) { return { err: "É necessário informar o status do recebimento." }; };

      let obj = lib.convertTo.object(this);
      let query = lib.Query.save(obj, 'cms_wt_erp.production_receipt');

      return db(query);
    };

    this.update = () => {
      if (!this.id) { return { err: "O id do produto é inválido." }; }
      if (!this.production_id) { return { err: "É necessário registrar de qual produção pertence o produto." }; };
      if (!this.product_id) { return { err: "É necessário registrar o produto." }; };
      if (!this.amount) { return { err: "É necessário a quantidade de produtos." }; };

      let obj = lib.convertTo.object(this);
      let query = lib.Query.update(obj, 'cms_wt_erp.production_receipt', 'id');

      return db(query);
    };
  }

  static filter(props, inners, period, params, strict_params, order_params, limit) {
    let query = new lib.Query().select().props(props).table("cms_wt_erp.production_receipt")
      .inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).build().query;
    return db(query);
  }
}


// Receipt.remove = async (id) => {
//   let query = `DELETE FROM cms_wt_erp.production_receipt WHERE id='${id}';`;
//   return db(query);
// };

module.exports = Receipt;