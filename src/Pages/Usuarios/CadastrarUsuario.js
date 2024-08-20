import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';

export default function CadastrarUsuario() {
  const [open, setOpen] = useState(false);



  const [formData, setFormData] = useState({
    nome: '',
    departamento: '',
    status: '',
  });

  const [errors, setErrors] = useState({
    nome: '',
    departamento: '',
    status: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    let formIsValid = true;
    let newErrors = { nome: '', departamento: '', status: '' };

    if (!formData.nome) {
      newErrors.nome = 'Nome é obrigatório';
      formIsValid = false;
    }
    if (!formData.departamento) {
      newErrors.departamento = 'Departamento é obrigatório';
      formIsValid = false;
    }
    if (!formData.status) {
      newErrors.status = 'Status é obrigatório';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      // Process form submission
      console.log('Form Data Submitted:', formData);
      // Reset form
      setFormData({
        nome: '',
        departamento: '',
        status: '',
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };


  

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Criar Novo Usuário
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                error={Boolean(errors.nome)}
                helperText={errors.nome}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" error={Boolean(errors.departamento)}>
                <InputLabel>Departamento</InputLabel>
                <Select
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  label="Departamento"
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  <MenuItem value="TI">TI</MenuItem>
                  <MenuItem value="Recursos Humanos">Recursos Humanos</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>
                <FormHelperText>{errors.departamento}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" error={Boolean(errors.status)}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  <MenuItem value="Ativo">Ativo</MenuItem>
                  <MenuItem value="Inativo">Inativo</MenuItem>
                </Select>
                <FormHelperText>{errors.status}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Criar Usuário
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
