import React, { useState } from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Lista fictícia de smartphones
const initialSmartphones = [
  {
    patrimonio: '123456',
    fabricante: 'Samsung',
    modelo: 'Galaxy S21',
    imei1: '123456789012345',
    imei2: '987654321098765',
    cpu: 'Exynos 2100',
    memoria: '8GB',
    armazenamento: '128GB',
    status: 'Em uso',
  },
  {
    patrimonio: '654321',
    fabricante: 'Apple',
    modelo: 'iPhone 12',
    imei1: '123456789012346',
    imei2: '987654321098766',
    cpu: 'A14 Bionic',
    memoria: '6GB',
    armazenamento: '64GB',
    status: 'Disponível',
  },
  {
    patrimonio: '789012',
    fabricante: 'Xiaomi',
    modelo: 'Mi 11',
    imei1: '123456789012347',
    imei2: '987654321098767',
    cpu: 'Snapdragon 888',
    memoria: '12GB',
    armazenamento: '256GB',
    status: 'Descarte',
  },
];

function SmartphoneList() {
  const [smartphones, setSmartphones] = useState(initialSmartphones);
  const [formData, setFormData] = useState({
    patrimonio: '',
    fabricante: '',
    modelo: '',
    imei1: '',
    imei2: '',
    cpu: '',
    memoria: '',
    armazenamento: '',
    status: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    let formIsValid = true;
    let newErrors = {};

    if (!formData.patrimonio) newErrors.patrimonio = 'Patrimônio é obrigatório';
    if (!formData.fabricante) newErrors.fabricante = 'Fabricante é obrigatório';
    if (!formData.modelo) newErrors.modelo = 'Modelo é obrigatório';
    if (!formData.imei1) newErrors.imei1 = 'IMEI1 é obrigatório';
    if (!formData.cpu) newErrors.cpu = 'CPU é obrigatório';
    if (!formData.memoria) newErrors.memoria = 'Memória é obrigatória';
    if (!formData.armazenamento) newErrors.armazenamento = 'Armazenamento é obrigatório';
    if (!formData.status) newErrors.status = 'Status é obrigatório';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSmartphones([...smartphones, formData]);
      handleCloseModal();
      setFormData({
        patrimonio: '',
        fabricante: '',
        modelo: '',
        imei1: '',
        imei2: '',
        cpu: '',
        memoria: '',
        armazenamento: '',
        status: '',
      });
    }
  };

  const filteredSmartphones = smartphones.filter((phone) =>
    Object.values(phone).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lista de Smartphones
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Pesquisar"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1 }} />
              ),
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Adicionar Novo Smartphone
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patrimônio</TableCell>
                <TableCell>Fabricante</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>IMEI1</TableCell>
                <TableCell>IMEI2</TableCell>
                <TableCell>CPU</TableCell>
                <TableCell>Memória</TableCell>
                <TableCell>Armazenamento</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSmartphones.map((phone, index) => (
                <TableRow key={index}>
                  <TableCell>{phone.patrimonio}</TableCell>
                  <TableCell>{phone.fabricante}</TableCell>
                  <TableCell>{phone.modelo}</TableCell>
                  <TableCell>{phone.imei1}</TableCell>
                  <TableCell>{phone.imei2}</TableCell>
                  <TableCell>{phone.cpu}</TableCell>
                  <TableCell>{phone.memoria}</TableCell>
                  <TableCell>{phone.armazenamento}</TableCell>
                  <TableCell>{phone.status}</TableCell>
                  <TableCell>
                    <Tooltip title="Editar">
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: 800,
              bgcolor: 'background.paper',
              borderRadius: 1,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Cadastrar Novo Smartphone
            </Typography>
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
                    label="IMEI1"
                    name="imei1"
                    value={formData.imei1}
                    onChange={handleChange}
                    error={Boolean(errors.imei1)}
                    helperText={errors.imei1}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="IMEI2"
                    name="imei2"
                    value={formData.imei2}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="CPU"
                    name="cpu"
                    value={formData.cpu}
                    onChange={handleChange}
                    error={Boolean(errors.cpu)}
                    helperText={errors.cpu}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Memória"
                    name="memoria"
                    value={formData.memoria}
                    onChange={handleChange}
                    error={Boolean(errors.memoria)}
                    helperText={errors.memoria}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Armazenamento"
                    name="armazenamento"
                    value={formData.armazenamento}
                    onChange={handleChange}
                    error={Boolean(errors.armazenamento)}
                    helperText={errors.armazenamento}
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
                      <MenuItem value="Descarte">Descarte</MenuItem>
                      <MenuItem value="Disponível">Disponível</MenuItem>
                    </Select>
                    <FormHelperText>{errors.status}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Adicionar Smartphone
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default SmartphoneList;
