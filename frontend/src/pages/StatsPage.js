import React from 'react';
import { useParams } from 'react-router-dom';
import UrlStats from '../components/UrlStats';
import { Box } from '@mui/material';

const StatsPage = () => {
  const { url_path } = useParams();

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <UrlStats url_path={url_path} />
    </Box>
  );
};

export default StatsPage;