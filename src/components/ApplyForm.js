import React, { useState, useRef } from 'react';
import { submitApplication } from '../api';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

export default function ApplyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [submitMsg, setSubmitMsg] = useState('');
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email is invalid';
    if (!formData.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) errs.phone = 'Phone must be 10 digits';
    if (!formData.experience.trim()) errs.experience = 'Experience is required';
    else if (isNaN(formData.experience)) errs.experience = 'Experience must be a number';
    if (!formData.resume) errs.resume = 'Resume file is required';
    else if (!['application/pdf'].includes(formData.resume.type)) errs.resume = 'Only PDF allowed';
    return errs;
  };

  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileClick = () => fileInputRef.current && fileInputRef.current.click();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setSubmitMsg('');
      return;
    }
    setErrors({});

    // Prepare data to save in localStorage/mock API (resume filename only for demo)
    const saveData = {
      ...formData,
      resume: formData.resume.name,
    };

    try {
      await submitApplication(saveData);
      setSubmitMsg('Application submitted successfully.');
      setSubmitError('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        resume: null,
      });
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (err) {
      console.error('submit error:', err);
      setSubmitMsg('');
      setSubmitError(err.message || 'Network error while submitting application');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography variant="h5" gutterBottom>
        Job Application Form
      </Typography>

      {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
      {submitMsg && <Alert severity="success" sx={{ mb: 2 }}>{submitMsg}</Alert>}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name || ''} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email || ''} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone || ''} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Experience (years)" name="experience" value={formData.experience} onChange={handleChange} error={!!errors.experience} helperText={errors.experience || ''} />
        </Grid>

        <Grid item xs={12}>
          <input ref={fileInputRef} type="file" name="resume" accept="application/pdf" onChange={handleChange} style={{ display: 'none' }} />
          <Button variant="outlined" onClick={handleFileClick} sx={{ mr: 2 }}>
            {formData.resume ? formData.resume.name : 'Upload Resume (PDF)'}
          </Button>
          {errors.resume && <Typography color="error" component="span">{errors.resume}</Typography>}
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
