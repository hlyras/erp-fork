Product.feedstock = {};

Product.feedstock.add = async (feedstock) => {
  let response = await fetch("/product/feedstock/add", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedstock)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};

Product.feedstock.findById = async (id) => {
  let response = await fetch(`/product/feedstock/id/${id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.feedstock;
};

Product.feedstock.filter = async (feedstock) => {
  let response = await fetch("/product/feedstock/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedstock)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.feedstocks;
};

Product.feedstock.remove = async (id) => {
  let response = await fetch(`/product/feedstock/remove/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};