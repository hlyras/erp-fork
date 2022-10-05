Product.seam = {};

Product.seam.create = async (seam) => {
  let response = await fetch("/product/seam/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(seam)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};

Product.seam.findById = async (id) => {
  let response = await fetch(`/product/seam/id/${id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.seam;
};

Product.seam.filter = async (seam) => {
  let response = await fetch("/product/seam/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(seam)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.seams;
};

Product.seam.delete = async (id) => {
  let response = await fetch(`/product/seam/delete/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return true;
};