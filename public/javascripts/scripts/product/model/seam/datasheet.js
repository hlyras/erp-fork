Product.seam.datasheet = async (product_id) => {
  let response = await fetch(`/product/feedstock/id/${product_id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.feedstocks;
};

Product.filigran.datasheet = async (product_id) => {
  let response = await fetch(`/product/feedstock/id/${product_id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.feedstocks;
};