Product.catalog.package = {};

Product.catalog.package.add = async package => {
  let response = await fetch("/product/catalog/package/add", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(package)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};

Product.catalog.package.update = async package => {
  let response = await fetch("/product/catalog/package/update", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(package)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};

Product.catalog.package.remove = async (id) => {
  let response = await fetch(`/product/catalog/package/remove/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};