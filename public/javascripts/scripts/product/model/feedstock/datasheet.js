Product.feedstock.datasheet = async (product_id) => {
  let response = await fetch(`/product/feedstock/datasheet/${product_id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.feedstocks;
};