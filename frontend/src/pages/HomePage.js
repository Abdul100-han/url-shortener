import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import { Box } from '@mui/material';

const HomePage = () => {
  const [urlsUpdated, setUrlsUpdated] = useState(false);

  const handleUrlCreated = () => {
    setUrlsUpdated(!urlsUpdated);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <UrlForm onUrlCreated={handleUrlCreated} />
      <UrlList key={urlsUpdated} />
    </Box>
  );
};

export default HomePage;