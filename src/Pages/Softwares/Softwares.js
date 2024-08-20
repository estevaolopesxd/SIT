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

// Lista fictícia de softwares
const initialSoftwares = [
  {
    licencia: 'ABC123',
    dataExpiracao: '2025-12-31',
    ano: 2023,
    versao: '1.0.0',
    quantidade: 10,
    fornecedor: 'Microsoft',
  },
  {
    licencia: 'XYZ456',
    dataExpiracao: '2024-06-30',
    ano: 2022,
    versao: '2.3.1',
    quantidade: 5,
    fornecedor: 'Adobe',
  },
  {
    licencia: 'LMN789',
    dataExpiracao: '2023-11-15',
    ano: 2021,
    versao: '3.2.0',
    quantidade: 20,
    fornecedor: 'Autodesk',
  },
];

function SoftwareList() {
  const [softwares, setSoftwares] = useState(initialSoftwares);
  const [formData, setFormData] = useState({
    licencia: '',
    dataExpiracao: '',
    ano: '',
    versao: '',
    quantidade: '',
    fornecedor: '',
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

    if (!formData.licencia) newErrors.licencia = 'Licença é obrigatória';
    if (!formData.dataExpiracao) newErrors.dataExpiracao = 'Data de Expiração é obrigatória';
    if (!formData.ano) newErrors.ano = 'Ano do Software é obrigatório';
    if (!formData.versao) newErrors.versao = 'Versão do Software é obrigatória';
    if (!formData.quantidade) newErrors.quantidade = 'Quantidade é obrigatória';
    if (!formData.fornecedor) newErrors.fornecedor = 'Fornecedor é obrigatório';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSoftwares([...softwares, formData]);
      handleCloseModal();
      setFormData({
        licencia: '',
        dataExpiracao: '',
        ano: '',
        versao: '',
        quantidade: '',
        fornecedor: '',
      });
    }
  };

  const filteredSoftwares = softwares.filter((software) =>
    Object.values(software).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lista de Softwares
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
          Adicionar Novo Software
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Licença</TableCell>
                <TableCell>Data de Expiração</TableCell>
                <TableCell>Ano</TableCell>
                <TableCell>Versão</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Fornecedor</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSoftwares.map((software, index) => (
                <TableRow key={index}>
                  <TableCell>{software.licencia}</TableCell>
                  <TableCell>{software.dataExpiracao}</TableCell>
                  <TableCell>{software.ano}</TableCell>
                  <TableCell>{software.versao}</TableCell>
                  <TableCell>{software.quantidade}</TableCell>
                  <TableCell>{software.fornecedor}</TableCell>
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
              Cadastrar Novo Software
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Licença"
                    name="licencia"
                    value={formData.licencia}
                    onChange={handleChange}
                    error={Boolean(errors.licencia)}
                    helperText={errors.licencia}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Data de Expiração"
                    name="dataExpiracao"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.dataExpiracao}
                    onChange={handleChange}
                    error={Boolean(errors.dataExpiracao)}
                    helperText={errors.dataExpiracao}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ano"
                    name="ano"
                    type="number"
                    value={formData.ano}
                    onChange={handleChange}
                    error={Boolean(errors.ano)}
                    helperText={errors.ano}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Versão"
                    name="versao"
                    value={formData.versao}
                    onChange={handleChange}
                    error={Boolean(errors.versao)}
                    helperText={errors.versao}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Quantidade"
                    name="quantidade"
                    type="number"
                    value={formData.quantidade}
                    onChange={handleChange}
                    error={Boolean(errors.quantidade)}
                    helperText={errors.quantidade}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Fornecedor"
                    name="fornecedor"
                    value={formData.fornecedor}
                    onChange={handleChange}
                    error={Boolean(errors.fornecedor)}
                    helperText={errors.fornecedor}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Adicionar Software
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

export default SoftwareList;
