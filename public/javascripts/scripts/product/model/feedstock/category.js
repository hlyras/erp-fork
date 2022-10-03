Product.feedstock.category = {};

Product.feedstock.category.create = async (category) => {
  let response = await fetch("/product/feedstock/category/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};

Product.feedstock.category.findById = async (id) => {
  let response = await fetch(`/product/feedstock/category/id/${id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.category;
};

Product.feedstock.category.filter = async (category) => {
  let response = await fetch("/product/feedstock/category/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.categories;
};

Product.feedstock.category.delete = async (id) => {
  let response = await fetch(`/product/feedstock/category/delete/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};