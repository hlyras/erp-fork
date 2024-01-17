const OutcomeOriginPayment = {};

OutcomeOriginPayment.create = async payment => {
  let response = await fetch("/financial/outcome/origin/payment/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payment)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

OutcomeOriginPayment.filter = async payment => {
  let response = await fetch("/financial/outcome/origin/payment/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payment)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.payments;
};

OutcomeOriginPayment.findById = async (id) => {
  let response = await fetch(`/financial/outcome/origin/payment/id/${id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.payment;
};

OutcomeOriginPayment.delete = async (id) => {
  let response = await fetch(`/financial/outcome/origin/payment/id/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};