const FeedstockPurchaseOrder = {};

FeedstockPurchaseOrder.create = async order_feedstock => {
  let response = await fetch("/feedstock/purchase/order/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order_feedstock)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

FeedstockPurchaseOrder.update = async order_feedstock => {
  let response = await fetch("/feedstock/purchase/order/update", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order_feedstock)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

FeedstockPurchaseOrder.confirm = async supplier_id => {
  let response = await fetch("/feedstock/purchase/order/confirm", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ supplier_id })
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

FeedstockPurchaseOrder.filter = async order_feedstock => {
  let response = await fetch("/feedstock/purchase/order/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order_feedstock)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.orders;
};

FeedstockPurchaseOrder.delete = async id => {
  let response = await fetch(`/feedstock/purchase/order/delete/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};