const Feedstock = {};

Feedstock.create = async feedstock => {
  let response = await fetch("/feedstock/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedstock)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

Feedstock.filter = async feedstock => {
  let response = await fetch("/feedstock/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedstock)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.feedstocks;
};

Feedstock.delete = async id => {
  let response = await fetch(`/feedstock/delete/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};