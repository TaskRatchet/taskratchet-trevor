type Task = Record<string, unknown>;

export async function getTasks(): Promise<Array<Task>> {
  const res = await fetch("https://api.taskratchet.com/api1/me/tasks", {
    headers: {
      "X-Taskratchet-Userid": process.env.TASKRATCHET_USER_ID || "",
      "X-Taskratchet-Token": process.env.TASKRATCHET_API_TOKEN || "",
    },
  });

  return res.json();
}
