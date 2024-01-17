const FeedstockPurchase = {};

FeedstockPurchase.create = async purchase => {
  let response = await fetch("/feedstock/purchase/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(purchase)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

FeedstockPurchase.filter = async purchase => {
  let response = await fetch("/feedstock/purchase/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(purchase)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.purchases;
};

FeedstockPurchase.update = async purchase => {
  let response = await fetch("/feedstock/purchase/update", {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(purchase)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

FeedstockPurchase.delete = async id => {
  let response = await fetch(`/feedstock/purchase/delete/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

FeedstockPurchase.checkout = async (checkout) => {
  let response = await fetch("/feedstock/purchase/checkout", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(checkout)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};