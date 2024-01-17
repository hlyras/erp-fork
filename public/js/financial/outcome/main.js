const Outcome = {};

Outcome.create = async outcome => {
  let response = await fetch("/financial/outcome/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(outcome)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

Outcome.filter = async outcome => {
  let response = await fetch("/financial/outcome/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(outcome)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.outcomes;
};

Outcome.findById = async (id) => {
  let response = await fetch(`/financial/outcome/id/${id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.outcome;
};

Outcome.delete = async (id) => {
  let response = await fetch(`/financial/outcome/delete/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

Outcome.payment = {};

Outcome.payment.approve = async id => {
  let response = await fetch(`/financial/outcome/payment/approve/${id}`, { method: 'PUT' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

Outcome.payment.confirm = async outcome => {
  let response = await fetch("/financial/outcome/payment/confirm", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(outcome)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};