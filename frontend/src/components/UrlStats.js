import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUrlStats } from '../services/api';
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';

const UrlStats = () => {
  const { url_path } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getUrlStats(url_path);
        if (data) {
          setStats(data);
        } else {
          setError('URL statistics not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch URL statistics');
        setLoading(false);
      }
    };

    fetchStats();
  }, [url_path]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        URL Statistics for: {url_path}
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Total Visits" secondary={stats?.visits || 0} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Created At" secondary={formatDate(stats?.createdAt)} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Last Accessed" secondary={formatDate(stats?.lastAccessed)} />
        </ListItem>
      </List>
    </Paper>
  );
};

export default UrlStats;