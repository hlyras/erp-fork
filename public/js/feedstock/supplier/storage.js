const FeedstockSupplierStorage = {};

FeedstockSupplierStorage.open = async id => {
  let response = await fetch(`/feedstock/supplier/storage/id/${id}`);
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.supplier[0];
};

FeedstockSupplierStorage.create = async storage => {
  let response = await fetch("/feedstock/supplier/storage/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(storage)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };
  alert(response.done);

  return response.done;
};

FeedstockSupplierStorage.filter = async storage => {
  let response = await fetch("/feedstock/supplier/storage/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(storage)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.storages;
};

FeedstockSupplierStorage.update = async storage => {
  let response = await fetch("/feedstock/supplier/storage/update", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(storage)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

FeedstockSupplierStorage.delete = async id => {
  let response = await fetch(`/feedstock/supplier/storage/delete/${id}`, { method: 'DELETE' });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};