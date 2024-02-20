const Goal = {};

Goal.create = async goal => {
  let response = await fetch("/goal/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

Goal.filter = async goal => {
  let response = await fetch("/goal/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.goals;
};

// Goal.findById = async (id) => {
//   let response = await fetch(`/financial/outcome/id/${id}`);
//   response = await response.json();

//   if (API.verifyResponse(response)) { return false };

//   return response.outcome;
// };

// Goal.delete = async (id) => {
//   let response = await fetch(`/financial/outcome/delete/${id}`, { method: 'DELETE' });
//   response = await response.json();

//   if (API.verifyResponse(response)) { return false };

//   return response.done;
// };

// Goal.payment = {};

// Goal.payment.approve = async id => {
//   let response = await fetch(`/financial/outcome/payment/approve/${id}`, { method: 'PUT' });
//   response = await response.json();

//   if (API.verifyResponse(response)) { return false };

//   return response.done;
// };

// Goal.payment.confirm = async outcome => {
//   let response = await fetch("/financial/outcome/payment/confirm", {
//     method: "POST",
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(outcome)
//   });
//   response = await response.json();

//   if (API.verifyResponse(response)) { return false };

//   return response.done;
// };