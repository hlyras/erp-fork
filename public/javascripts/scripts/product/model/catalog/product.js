Product.catalog.product = {};

Product.catalog.product.add = async product => {
  let response = await fetch("/product/catalog/product/add", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};

Product.catalog.product.update = async product => {
  let response = await fetch("/product/catalog/product/update", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};

Product.catalog.product.filter = async product => {
  let response = await fetch("/product/catalog/product/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response;
};

Product.catalog.product.remove = async (id) => {
  let response = await fetch(`/product/catalog/product/remove/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};