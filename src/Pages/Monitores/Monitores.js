import React, { useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Button,
  Modal,
  Box,
  Grid,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add';
import CreateMonitorForm from './CriarMonitor'; // Atualize o caminho conforme necessário

const initialMonitors = [
  // Dados de exemplo
  { patrimonio: '001', fabricante: 'Dell', modelo: 'U2412M', numeroSerie: '123456789', status: 'Em uso' },
  { patrimonio: '002', fabricante: 'HP', modelo: 'P224', numeroSerie: '987654321', status: 'Disponível' }
];

export default function Monitors() {
  const [monitors, setMonitors] = useState(initialMonitors);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddMonitor = (newMonitor) => {
    setMonitors([...monitors, newMonitor]);
    handleClose();
  };

  const handleEditMonitor = (index) => {
    // Função para editar um monitor
    console.log(`Edit monitor at index ${index}`);
  };

  const handleDeleteMonitor = (index) => {
    setMonitors(monitors.filter((_, i) => i !== index));
  };

  const filteredMonitors = monitors.filter((monitor) =>
    Object.values(monitor).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Container maxWidth="lg">
      <Paper sx={{ mt: 4, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Monitores
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pesquisar"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} textAlign="right">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpen}
            >
              Adicionar Monitor
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patrimônio</TableCell>
                <TableCell>Fabricante</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Número de Série</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMonitors.map((monitor, index) => (
                <TableRow key={index}>
                  <TableCell>{monitor.patrimonio}</TableCell>
                  <TableCell>{monitor.fabricante}</TableCell>
                  <TableCell>{monitor.modelo}</TableCell>
                  <TableCell>{monitor.numeroSerie}</TableCell>
                  <TableCell>{monitor.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditMonitor(index)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteMonitor(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal para adicionar um novo monitor */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant="h6" gutterBottom>
            Cadastrar Novo Monitor
          </Typography>
          <CreateMonitorForm onSubmit={handleAddMonitor} />
        </Box>
      </Modal>
    </Container>
  );
}
