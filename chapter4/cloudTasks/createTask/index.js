//include @google-cloud/tasks library
const { CloudTasksClient } = require('@google-cloud/tasks');

//create a task client
const client = new CloudTasksClient();

async function createTask(projectId, locationId, queueId, url) {
  const parent = client.queuePath(projectId, locationId, queueId);
  const task = 
  {
    httpRequest: {
      httpMethod: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {data: data}
    }
  };

  // set task properties - optional
  task.name = client.taskPath(projectId, locationId, queueName, taskId);
  task.scheduleTime = {
    seconds: Math.floor(Date.now() / 1000) + 10 // Schedule task to run in 10 seconds
  }
  task.priority = 1; // Set task priority to high

  //add task to the queue
  const [response] = await client.createTask({
    parent: parent,
    task: task
  });

  console.log(`Task ${response.name} created.`);
}