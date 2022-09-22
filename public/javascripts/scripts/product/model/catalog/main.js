Product.catalog = {};

Product.catalog.create = async catalog => {
  console.log(catalog);
  let response = await fetch("/product/catalog/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(catalog)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};

Product.catalog.findById = async (id) => {
  let response = await fetch(`/product/catalog/id/${id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.catalog;
};

Product.catalog.filter = async catalog => {
  let response = await fetch("/product/catalog/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(catalog)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.catalogs;
};

Product.catalog.delete = async (id) => {
  let response = await fetch(`/product/catalog/delete/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  alert(response.done);

  return true;
};