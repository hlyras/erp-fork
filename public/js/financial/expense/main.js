const FinancialExpense = {};

FinancialExpense.create = async (expense) => {
  let response = await fetch("/financial/expense/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

FinancialExpense.findById = async id => {
  let response = await fetch(`/financial/expense/id/${id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.expense;
};

FinancialExpense.filter = async expense => {
  let response = await fetch("/financial/expense/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.expenses;
};