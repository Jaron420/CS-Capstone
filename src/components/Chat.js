// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { connectToChat, sendMessage } from '../utils/chatHandler';

const Chat = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    connectToChat(chatId, message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
  }, [chatId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(chatId, newMessage);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
