const { CloudTasksClient } = require('@google-cloud/tasks');

exports.processTask = async (event, context) => {
  const client = new CloudTasksClient();
  const task = event.data;

  // Extract payload data and custom attributes from the task object
  const payload = JSON.parse(Buffer.from(task.payload, 'base64').toString());
  const email = payload.email;
  const subject = payload.subject;

  // Perform necessary processing using the payload data and custom attributes
  const message = `Sending email to ${email}, subject: ${subject}`;
  console.log(message);

  // Remove the task from the queue
  await client.deleteTask({ name: task.name });
};
