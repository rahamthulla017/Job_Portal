import React, { useEffect, useState } from 'react';
import { fetchApplications } from '../api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [minExp, setMinExp] = useState('');

  useEffect(() => {
    async function loadData() {
      const data = await fetchApplications();
      setApplications(data);
    }
    loadData();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const matchName = app.name.toLowerCase().includes(searchName.toLowerCase());
    const matchExp = minExp === '' || Number(app.experience) >= Number(minExp);
    return matchName && matchExp;
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Submitted Applications
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField placeholder="Search by name" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
        <TextField type="number" placeholder="Min experience" value={minExp} onChange={(e) => setMinExp(e.target.value)} inputProps={{ min: 0 }} />
      </Box>

      {filteredApplications.length === 0 ? (
        <Typography>No applications found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Resume</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApplications.map((app, idx) => (
                <TableRow key={idx}>
                  <TableCell>{app.name}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.phone}</TableCell>
                  <TableCell>{app.experience}</TableCell>
                  <TableCell>{app.resume}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
