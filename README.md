Remover sessão de despesas - transferir para outcome
Passos para transferência - 
1 - Criar todas as props em Outcome
2 - Transferir todos os valores de Expense para Outcome

Fluxo Outcome

Create - diretamente da adm - (status pago)

Create - das despesas:
  Nova despesa
  'status' - 'Ag. aprovação'
  
  Após aprovar a despesa
  'status' - 'Ag. pagamento'
  
  Após realizar pagamento
  'status' - 'Pago'

Banco de dados
  outcome
	  - this.date;

  	this.id;
    this.expense_id;
    this.datetime;
    this.category_id;
    this.origin_id;
	  this.income_category_id;
    this.cost;
	  this.description;
	  this.status;
    this.user_id;

  	this.payment_method;
	  this.payment_date;
    this.payment_user_id;

    this.approval_date;
    this.approval_user_id;

  	this.billet_bank;
    this.billet_receiver;
    this.billet_code;

    this.pix_receiver;
    this.pix_key;

    this.check_bank;
    this.check_receiver;
    this.check_number;

    this.transfer_receiver;
    this.transfer_register;
    this.transfer_bank;
    this.transfer_agency;
    this.transfer_account;
    this.transfer_account_type;

  Production
  + receipt_datetime
  + receipt_user_id