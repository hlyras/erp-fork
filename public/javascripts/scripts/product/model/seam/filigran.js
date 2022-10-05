Product.filigran = {};

Product.filigran.create = async (filigran) => {
  let response = await fetch("/product/filigran/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filigran)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};

Product.filigran.findById = async (id) => {
  let response = await fetch(`/product/filigran/id/${id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.filigran;
};

Product.filigran.filter = async (filigran) => {
  let response = await fetch("/product/filigran/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filigran)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.filigrans;
};

Product.filigran.delete = async (id) => {
  let response = await fetch(`/product/filigran/delete/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};