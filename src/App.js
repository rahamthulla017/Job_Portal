import React from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import ApplyForm from './components/ApplyForm';
import ApplicationList from './components/ApplicationList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Application Portal
          </Typography>
          <Button color="inherit" component={RouterLink} to="/apply">
            Apply
          </Button>
          <Button color="inherit" component={RouterLink} to="/application">
            Applications
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Routes>
            <Route path="/apply" element={<ApplyForm />} />
            <Route path="/application" element={<ApplicationList />} />
            <Route path="*" element={<ApplyForm />} />
          </Routes>
        </Box>
      </Container>
    </div>
  );
}
