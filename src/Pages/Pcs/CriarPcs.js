import React, { useState } from 'react';
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
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

export default function CreateEquipmentForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    patrimonio: '',
    nomeMaquina: '',
    numeroSerie: '',
    modelo: '',
    fabricante: '',
    processador: '',
    memoriaRam: '',
    hd: false,
    ssd: false,
    memoriaRom: '',
    placaDeVideo: false,
    status: '',
  });

  const [errors, setErrors] = useState({
    patrimonio: '',
    nomeMaquina: '',
    numeroSerie: '',
    modelo: '',
    fabricante: '',
    processador: '',
    memoriaRam: '',
    memoriaRom: '',
    status: '',
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    let formIsValid = true;
    let newErrors = {
      patrimonio: '',
      nomeMaquina: '',
      numeroSerie: '',
      modelo: '',
      fabricante: '',
      processador: '',
      memoriaRam: '',
      memoriaRom: '',
      status: '',
    };

    if (!formData.patrimonio) {
      newErrors.patrimonio = 'Patrimônio é obrigatório';
      formIsValid = false;
    }
    if (!formData.nomeMaquina) {
      newErrors.nomeMaquina = 'Nome da máquina é obrigatório';
      formIsValid = false;
    }
    if (!formData.numeroSerie) {
      newErrors.numeroSerie = 'Número de série é obrigatório';
      formIsValid = false;
    }
    if (!formData.modelo) {
      newErrors.modelo = 'Modelo é obrigatório';
      formIsValid = false;
    }
    if (!formData.fabricante) {
      newErrors.fabricante = 'Fabricante é obrigatório';
      formIsValid = false;
    }
    if (!formData.processador) {
      newErrors.processador = 'Processador é obrigatório';
      formIsValid = false;
    }
    if (!formData.memoriaRam) {
      newErrors.memoriaRam = 'Memória RAM é obrigatória';
      formIsValid = false;
    }
    if (!formData.memoriaRom) {
      newErrors.memoriaRom = 'Memória ROM é obrigatória';
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
        nomeMaquina: '',
        numeroSerie: '',
        modelo: '',
        fabricante: '',
        processador: '',
        memoriaRam: '',
        hd: false,
        ssd: false,
        memoriaRom: '',
        placaDeVideo: false,
        status: '',
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Criar Novo Equipamento
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
                label="Nome da Máquina"
                name="nomeMaquina"
                value={formData.nomeMaquina}
                onChange={handleChange}
                error={Boolean(errors.nomeMaquina)}
                helperText={errors.nomeMaquina}
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
                label="Processador"
                name="processador"
                value={formData.processador}
                onChange={handleChange}
                error={Boolean(errors.processador)}
                helperText={errors.processador}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Memória RAM"
                name="memoriaRam"
                value={formData.memoriaRam}
                onChange={handleChange}
                error={Boolean(errors.memoriaRam)}
                helperText={errors.memoriaRam}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Memória ROM"
                name="memoriaRom"
                value={formData.memoriaRom}
                onChange={handleChange}
                error={Boolean(errors.memoriaRom)}
                helperText={errors.memoriaRom}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.hd}
                      onChange={handleChange}
                      name="hd"
                    />
                  }
                  label="HD"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.ssd}
                      onChange={handleChange}
                      name="ssd"
                    />
                  }
                  label="SSD"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.placaDeVideo}
                      onChange={handleChange}
                      name="placaDeVideo"
                    />
                  }
                  label="Placa de Vídeo"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                  <MenuItem value="Descarte">Descarte</MenuItem>
                  <MenuItem value="Disponível">Disponível</MenuItem>
                </Select>
                <FormHelperText>{errors.status}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Criar Equipamento
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
