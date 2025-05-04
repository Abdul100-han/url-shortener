import React, { useState } from 'react';
import { encodeUrl } from '../services/api';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const UrlForm = ({ onUrlCreated }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!originalUrl) {
      setError('Please enter a URL');
      return;
    }

    try {
      const response = await encodeUrl(originalUrl);
      setShortUrl(response.shortUrl);
      if (onUrlCreated) {
        onUrlCreated(response);
      }
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
      console.error(err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Shorten a URL
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            label="Enter your long URL"
            variant="outlined"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button type="submit" variant="contained" color="primary" size="large">
            Shorten
          </Button>
        </Box>
      </form>
      {shortUrl && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default UrlForm;