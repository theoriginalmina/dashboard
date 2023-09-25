// C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\vision-ui-dashboard-react-main\src\layouts\ia\components\imperialai\index.js

import React, { useState, useEffect } from "react";
import { Avatar, Button, InputBase, Paper, Typography, Switch } from "@mui/material";
import axios from 'axios';
import "./imperialai.css";

function ImperialAI() {
  const [inputText, setInputText] = useState("");
  const [chat, setChat] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleResetChat = () => {
    localStorage.removeItem('chat'); // Remove the chat from local storage
    setChat([]);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleGenerateResponse = async () => {
    const userMessage = {
      text: inputText,
      user: true,
    };
  
    setChat((prevChat) => [...prevChat, userMessage]);
    setInputText('');
  
    // Generate chatbot response
    await fetchChatbotResponse();
  };
  
  const fetchChatbotResponse = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: inputText + '??',
          max_tokens: 200,
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
          },
        }
      );
  
      const generatedResponse = response.data.choices[0].text.trim();
  
      const chatbotResponse = {
        text: generatedResponse,
        user: false,
      };
  
      setChat((prevChat) => [...prevChat, chatbotResponse]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }
  };

  const handleInputKeyPress = (event) => {
    // Check if Shift key and Enter key are pressed together
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      setInputText(inputText + '\n'); // Add a newline to the input text
    } else if (event.key === 'Enter') {
      // If only Enter key is pressed, generate the response
      event.preventDefault();
      handleGenerateResponse();
    }
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // On component mount, retrieve the chat from local storage (if exists)
    const savedChat = localStorage.getItem('chat');
    if (savedChat) {
      setChat(JSON.parse(savedChat));
    }
  }, []);

  useEffect(() => {
    // On chat change, save the chat to local storage
    localStorage.setItem('chat', JSON.stringify(chat));
  }, [chat]);

  return (
    <div className={`imperial-ai ${darkMode ? 'dark-mode' : ''}`}>
      {/* Contact Info Section */}
      <div className="contact-info">
        <div className="contact-details">
          <Avatar 
            className="contact-avatar" 
            src="https://cdn.discordapp.com/attachments/1116531444626497678/1116531483268624464/Inspired_AI_Logo.png"
          />
          <Typography variant="h5" className="contact-name">Imperial AI</Typography>
        </div>
        {/* Dark Mode Toggle Switch */}
        <Switch checked={darkMode} onChange={handleDarkModeToggle} />
      </div>

      {/* Chat Container */}
      <Paper elevation={3} className="chat-container">
        {chat.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user ? "user" : "chatbot"}`}
          >
            <Typography variant="body1" className="message-text">
              {message.text}
            </Typography>
          </div>
        ))}
      </Paper>

      {/* Input Container */}
      <Paper component="form" elevation={0} className="input-container">
        <InputBase
          placeholder="Enter your message"
          multiline
          minRows={1}
          maxRows={8}
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          fullWidth
          className="input-field"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateResponse}
          className="send-button"
        >
          Send
        </Button>
      </Paper>

      {/* Reset Chat Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleResetChat}
        className="reset-button"
      >
        Reset Chat
      </Button>
    </div>
  );
}

export default ImperialAI;
