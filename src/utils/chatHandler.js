// src/utils/chatHandler.js
import { subscribeToChannel, publishMessage } from './pubnubClient';
import api from './api';

// Function to connect to the chat channel
export const connectToChat = (chatId, onMessage) => {
  subscribeToChannel(chatId, onMessage);
};

// Function to send a message to the chat channel
export const sendMessage = (chatId, message) => {
  publishMessage(chatId, message);
};

// Function to fetch chat history from the backend
export const fetchChatHistory = async chatId => {
  try {
    const response = await api.get(`/chats/${chatId}/history/`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch chat history:', error);
    throw error;
  }
};
