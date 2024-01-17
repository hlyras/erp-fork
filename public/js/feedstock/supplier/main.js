const FeedstockSupplier = {};

FeedstockSupplier.create = async supplier => {
  let response = await fetch("/feedstock/supplier/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(supplier)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

FeedstockSupplier.filter = async supplier => {
  let response = await fetch("/feedstock/supplier/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(supplier)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.suppliers;
};

FeedstockSupplier.delete = async id => {
  let response = await fetch(`/feedstock/supplier/delete/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};