import React, { useState, useRef, useEffect } from 'react';
import {
  Fab,
  Drawer,
  Box,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import { sendMessage } from '../services/api';
import { useUser } from '../contexts/UserContext';

const ChatFloatingButton = () => {
  const { user } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I\'m your eco-travel assistant. How can I help you plan a sustainable journey?' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = inputValue.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await sendMessage(user.userId, userMsg);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: response.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 100,
          background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
          },
        }}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Drawer */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            maxHeight: '60vh',
            borderRadius: '16px 16px 0 0',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 2,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              borderBottom: '2px solid #e0e0e0',
              pb: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#2e7d32' }}>
              💬 Eco-Travel Assistant
            </Typography>
            <IconButton
              size="small"
              onClick={() => setDrawerOpen(false)}
              sx={{ color: '#666' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              mb: 2,
              pr: 1,
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: '80%',
                    backgroundColor:
                      msg.role === 'user'
                        ? '#4caf50'
                        : '#f5f5f5',
                    color: msg.role === 'user' ? '#fff' : '#333',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Paper>
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CircularProgress size={24} sx={{ color: '#2e7d32' }} />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Ask me about eco-friendly travel..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              multiline
              maxRows={3}
              variant="outlined"
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={loading || !inputValue.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatFloatingButton;
