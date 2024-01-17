const OutcomeOrigin = {};

OutcomeOrigin.create = async origin => {
  let response = await fetch("/financial/outcome/origin/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(origin)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response;
};

OutcomeOrigin.findById = async id => {
  let response = await fetch(`/financial/outcome/origin/id/${id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.origin;
};

OutcomeOrigin.filter = async origin => {
  let response = await fetch("/financial/outcome/origin/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(origin)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.origins;
};

OutcomeOrigin.delete = async id => {
  let response = await fetch(`/financial/outcome/origin/id/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};