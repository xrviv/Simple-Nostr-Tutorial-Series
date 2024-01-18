const https = require("https"); // use 'http' if the relay URL is not HTTPS

function queryRelayInfo(relayUrl) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        Accept: "application/nostr+json",
      },
    };

    https
      .get(relayUrl, options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const info = JSON.parse(data);
            resolve(info);
          } catch (error) {
            reject("Error parsing JSON response: " + error.message);
          }
        });
      })
      .on("error", (error) => {
        reject("Request failed: " + error.message);
      });
  });
}

// Example usage
const relayUrl = "https://nostr.wine"; // Replace with the actual relay URL
queryRelayInfo(relayUrl)
  .then((info) => console.log(info))
  .catch((error) => console.error(error));
