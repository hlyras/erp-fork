const FeedstockPurchaseFeedstock = {};

FeedstockPurchaseFeedstock.create = async feedstock => {
  let response = await fetch("/feedstock/purchase/feedstock/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedstock)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

FeedstockPurchaseFeedstock.update = async feedstock => {
  let response = await fetch("/feedstock/purchase/feedstock/update", {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedstock)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

FeedstockPurchaseFeedstock.filter = async purchase => {
  let response = await fetch("/feedstock/purchase/feedstock/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(purchase)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.feedstocks;
};

FeedstockPurchaseFeedstock.delete = async id => {
  let response = await fetch(`/feedstock/purchase/feedstock/delete/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};
