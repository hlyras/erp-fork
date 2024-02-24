const GoalTask = {};

GoalTask.create = async task => {
  let response = await fetch("/goal/task/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

GoalTask.update = async task => {
  let response = await fetch("/goal/task/update", {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

GoalTask.filter = async task => {
  let response = await fetch("/goal/task/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.goal_tasks;
};