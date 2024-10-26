// src/utils/pubnubClient.js
import PubNub from 'pubnub';

const pubnub = new PubNub({
  publishKey: 'YOUR_PUBLISH_KEY', // Replace with PubNub publish key
  subscribeKey: 'YOUR_SUBSCRIBE_KEY', // Replace with PubNub subscribe key
  uuid: 'YOUR_UUID', // Replace with a unique identifier for the user
});

// Function to subscribe to a channel
export const subscribeToChannel = (channel, onMessage) => {
  pubnub.subscribe({ channels: [channel] });
  pubnub.addListener({
    message: event => {
      console.log('New message received:', event.message);
      if (onMessage) onMessage(event.message);
    },
  });
};

// Function to publish a message to a channel
export const publishMessage = (channel, message) => {
  pubnub.publish({ channel, message }, (status, response) => {
    if (status.error) {
      console.error('Failed to publish message:', status);
    } else {
      console.log('Message published:', response);
    }
  });
};

export default pubnub;
