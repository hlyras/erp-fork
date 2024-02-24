const GoalTaskTimeline = {};

GoalTaskTimeline.create = async timeline => {
  let response = await fetch("/goal/task/timeline/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(timeline)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

GoalTaskTimeline.filter = async timeline => {
  let response = await fetch("/goal/task/timeline/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(timeline)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.task_timelines;
};