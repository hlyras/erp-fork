const OutcomeCategory = {};

OutcomeCategory.create = async category => {
  let response = await fetch("/financial/outcome/category/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response;
};

OutcomeCategory.findById = async id => {
  let response = await fetch(`/financial/outcome/category/id/${id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.category;
};

OutcomeCategory.filter = async category => {
  let response = await fetch("/financial/outcome/category/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.categories;
};

OutcomeCategory.delete = async id => {
  let response = await fetch(`/financial/outcome/category/id/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  console.log(response);

  return response.done;
};