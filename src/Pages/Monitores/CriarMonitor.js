import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

export default function CreateMonitorForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    patrimonio: '',
    fabricante: '',
    modelo: '',
    numeroSerie: '',
    status: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    let formIsValid = true;
    let newErrors = {};

    if (!formData.patrimonio) {
      newErrors.patrimonio = 'Patrimônio é obrigatório';
      formIsValid = false;
    }
    if (!formData.fabricante) {
      newErrors.fabricante = 'Fabricante é obrigatório';
      formIsValid = false;
    }
    if (!formData.modelo) {
      newErrors.modelo = 'Modelo é obrigatório';
      formIsValid = false;
    }
    if (!formData.numeroSerie) {
      newErrors.numeroSerie = 'Número de série é obrigatório';
      formIsValid = false;
    }
    if (!formData.status) {
      newErrors.status = 'Status é obrigatório';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      onSubmit(formData);
      setFormData({
        patrimonio: '',
        fabricante: '',
        modelo: '',
        numeroSerie: '',
        status: ''
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Patrimônio"
            name="patrimonio"
            value={formData.patrimonio}
            onChange={handleChange}
            error={Boolean(errors.patrimonio)}
            helperText={errors.patrimonio}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Fabricante"
            name="fabricante"
            value={formData.fabricante}
            onChange={handleChange}
            error={Boolean(errors.fabricante)}
            helperText={errors.fabricante}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            error={Boolean(errors.modelo)}
            helperText={errors.modelo}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Número de Série"
            name="numeroSerie"
            value={formData.numeroSerie}
            onChange={handleChange}
            error={Boolean(errors.numeroSerie)}
            helperText={errors.numeroSerie}
            variant="outlined"
          />
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
              <MenuItem value="Em uso">Em uso</MenuItem>
              <MenuItem value="Disponível">Disponível</MenuItem>
              <MenuItem value="Em manutenção">Em manutenção</MenuItem>
            </Select>
            <FormHelperText>{errors.status}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
