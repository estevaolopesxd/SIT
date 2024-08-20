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
  IconButton,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Lista fictícia de chips e linhas
const initialChipsAndLines = [
  {
    numero: '123456789',
    plano: 'Pré-pago',
    status: 'Ativo',
  },
  {
    numero: '987654321',
    plano: 'Pós-pago',
    status: 'Inativo',
  },
  {
    numero: '456789123',
    plano: 'Pré-pago',
    status: 'Ativo',
  },
];

function ChipsAndLinesList() {
  const [items, setItems] = useState(initialChipsAndLines);
  const [formData, setFormData] = useState({
    numero: '',
    plano: '',
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

    if (!formData.numero) newErrors.numero = 'Número é obrigatório';
    if (!formData.plano) newErrors.plano = 'Plano é obrigatório';
    if (!formData.status) newErrors.status = 'Status é obrigatório';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setItems([...items, formData]);
      handleCloseModal();
      setFormData({
        numero: '',
        plano: '',
        status: '',
      });
    }
  };

  const filteredItems = items.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lista de Chips e Linhas
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
          Adicionar Novo
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Número</TableCell>
                <TableCell>Plano</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.numero}</TableCell>
                  <TableCell>{item.plano}</TableCell>
                  <TableCell>{item.status}</TableCell>
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
              maxWidth: 600,
              bgcolor: 'background.paper',
              borderRadius: 1,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Cadastrar Novo Chip/Linha
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Número"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    error={Boolean(errors.numero)}
                    helperText={errors.numero}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Plano"
                    name="plano"
                    value={formData.plano}
                    onChange={handleChange}
                    error={Boolean(errors.plano)}
                    helperText={errors.plano}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    error={Boolean(errors.status)}
                    helperText={errors.status}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Adicionar
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

export default ChipsAndLinesList;
