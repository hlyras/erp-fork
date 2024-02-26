const GoalTaskComment = {};

GoalTaskComment.create = async comment => {
  let response = await fetch("/goal/task/comment/create", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.done;
};

GoalTaskComment.filter = async comment => {
  let response = await fetch("/goal/task/comment/filter", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response.task_comments;
};