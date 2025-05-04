import React, { useState, useEffect } from 'react';
import { getAllUrls, searchUrls } from '../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Link,
  Chip,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const data = await getAllUrls();
        setUrls(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching URLs:', error);
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const search = async () => {
        try {
          const results = await searchUrls(searchQuery);
          setUrls(results);
        } catch (error) {
          console.error('Error searching URLs:', error);
        }
      };

      const timer = setTimeout(() => {
        search();
      }, 500);

      return () => clearTimeout(timer);
    } else if (searchQuery.length === 0) {
      const fetchUrls = async () => {
        try {
          const data = await getAllUrls();
          setUrls(data);
        } catch (error) {
          console.error('Error fetching URLs:', error);
        }
      };

      fetchUrls();
    }
  }, [searchQuery]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        URL List
      </Typography>
      <TextField
        fullWidth
        label="Search URLs (min 3 chars)"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1 }} />,
        }}
        sx={{ mb: 3 }}
      />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Original URL</TableCell>
                <TableCell>Short URL</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Visits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.map((url) => (
                <TableRow key={url.shortUrl}>
                  <TableCell>
                    <Link href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                      {url.originalUrl}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                      {url.shortUrl}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(url.createdAt)}</TableCell>
                  <TableCell>
                    <Chip label={url.visits} color="primary" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default UrlList;