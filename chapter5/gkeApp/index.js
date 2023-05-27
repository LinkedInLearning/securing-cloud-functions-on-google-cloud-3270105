const request = require('request');
const { google } = require('googleapis');

async function main() {
  // Use workload identity to authenticate with GCP services
  const auth = await google.auth.getClient({
    scopes: ['<https://www.googleapis.com/auth/cloud-platform>']
  });

  // Construct the URL for the Cloud Function
  const url = 'https://us-central1-myapp-5655e.cloudfunctions.net/simpleGCF';

  // Set the message to send to the Cloud Function
  const message = 'Hello, Cloud Function!';

  // Construct the request options
  const options = {
    url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: {
      message
    },
    auth
  };

  // Send the request to the Cloud Function
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(`Response: ${body}`);
    } else {
      console.error(`Error: ${error}`);
    }
  });
}

main();
