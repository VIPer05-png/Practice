import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { sendMessage } from '../services/api';
import { useUser } from '../contexts/UserContext';

const ChatPage = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello! 👋 I\'m your eco-travel guide. I can help you plan sustainable trips, provide tips on reducing your carbon footprint, and answer questions about eco-friendly destinations. What would you like to know?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = inputValue.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setLoading(true);
    setShowTyping(true);

    try {
      const response = await sendMessage(user.userId, userMsg);
      setShowTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: response.reply },
      ]);
    } catch (error) {
      setShowTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: '❌ Sorry, I encountered an error connecting to the server. Please check if the backend is running and try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        text: 'Chat cleared! How can I help you with your eco-friendly travel plans?',
      },
    ]);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h3" sx={{ color: '#1b5e20', fontWeight: 700 }}>
            💬 Eco-Travel ChatBot
          </Typography>
          <IconButton
            onClick={handleClearChat}
            title="Clear chat"
            sx={{ color: '#2e7d32' }}
          >
            <ClearIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" color="textSecondary">
          Chat with our AI assistant about sustainable travel, eco-friendly destinations, and more!
        </Typography>
      </Box>

      {/* Messages Container */}
      <Paper
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3,
          mb: 3,
          backgroundColor: '#f9f9f9',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 1,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                maxWidth: '70%',
                backgroundColor:
                  msg.role === 'user'
                    ? 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)'
                    : '#fff',
                color: msg.role === 'user' ? '#fff' : '#333',
                borderRadius: 3,
                border: msg.role === 'assistant' ? '1px solid #e0e0e0' : 'none',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {msg.text}
              </Typography>
            </Paper>
          </Box>
        ))}

        {/* Typing Indicator */}
        {showTyping && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: '#fff',
                borderRadius: 3,
                border: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#2e7d32',
                  animation: 'pulse 1.5s infinite',
                }}
              />
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#2e7d32',
                  animation: 'pulse 1.5s infinite 0.3s',
                }}
              />
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#2e7d32',
                  animation: 'pulse 1.5s infinite 0.6s',
                }}
              />
              <style>
                {`
                  @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                  }
                `}
              </style>
            </Paper>
            <Typography variant="caption" color="textSecondary">
              Assistant is typing...
            </Typography>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Paper>

      {/* Input Section */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Ask me anything about eco-friendly travel..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          multiline
          maxRows={4}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: '#2e7d32',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2e7d32',
              },
            },
          }}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          disabled={loading || !inputValue.trim()}
          sx={{
            background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
            px: 3,
            fontWeight: 600,
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Send'}
        </Button>
      </Box>
    </Container>
  );
};

export default ChatPage;
