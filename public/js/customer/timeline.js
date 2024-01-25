const CustomerTimeline = {};

CustomerTimeline.create = async timeline => {
  let response = await fetch("/customer/timeline/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(timeline)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

CustomerTimeline.update = async timeline => {
  let response = await fetch("/customer/timeline/update", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(timeline)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

CustomerTimeline.filter = async timeline => {
  let response = await fetch("/customer/timeline/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(timeline)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.timelines;
};