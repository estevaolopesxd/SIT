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
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CreateEquipmentForm from './CriarPcs'; // Importe o formulário de equipamentos

const initialEquipments = [
  // Dados de exemplo
  {
    patrimonio: '001',
    nomeMaquina: 'Notebook XYZ',
    numeroSerie: '123456789',
    modelo: 'XYZ123',
    fabricante: 'Dell',
    processador: 'Intel i5',
    memoriaRam: '8GB',
    hd: true,
    ssd: true,
    memoriaRom: '512GB',
    placaDeVideo: true,
    status: 'Em uso'
  }
  // Adicione mais equipamentos de exemplo se necessário
];

export default function EquipmentManager() {
  const [equipments, setEquipments] = useState(initialEquipments);
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddEquipment = (newEquipment) => {
    setEquipments([...equipments, newEquipment]);
    handleClose();
  };

  const handleEditEquipment = (index) => {
    // Função para editar um equipamento
    console.log(`Edit equipment at index ${index}`);
  };

  const handleDeleteEquipment = (index) => {
    setEquipments(equipments.filter((_, i) => i !== index));
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredEquipments = equipments.filter((equipment) =>
    Object.values(equipment).some((value) =>
      value.toString().toLowerCase().includes(searchText)
    )
  );

  return (
    <Container maxWidth="lg">
      <Paper sx={{ mt: 4, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Equipamentos
        </Typography>
        <TextField
          fullWidth
          label="Buscar Equipamento"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Adicionar Equipamento
        </Button>
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patrimônio</TableCell>
                <TableCell>Nome da Máquina</TableCell>
                <TableCell>Número de Série</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Fabricante</TableCell>
                <TableCell>Processador</TableCell>
                <TableCell>Memória RAM</TableCell>
                <TableCell>HD</TableCell>
                <TableCell>SSD</TableCell>
                <TableCell>Memória ROM</TableCell>
                <TableCell>Placa de Vídeo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEquipments.map((equipment, index) => (
                <TableRow key={index}>
                  <TableCell>{equipment.patrimonio}</TableCell>
                  <TableCell>{equipment.nomeMaquina}</TableCell>
                  <TableCell>{equipment.numeroSerie}</TableCell>
                  <TableCell>{equipment.modelo}</TableCell>
                  <TableCell>{equipment.fabricante}</TableCell>
                  <TableCell>{equipment.processador}</TableCell>
                  <TableCell>{equipment.memoriaRam}</TableCell>
                  <TableCell>{equipment.hd ? 'Sim' : 'Não'}</TableCell>
                  <TableCell>{equipment.ssd ? 'Sim' : 'Não'}</TableCell>
                  <TableCell>{equipment.memoriaRom}</TableCell>
                  <TableCell>{equipment.placaDeVideo ? 'Sim' : 'Não'}</TableCell>
                  <TableCell>{equipment.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditEquipment(index)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteEquipment(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal para adicionar um novo equipamento */}
      <Modal open={open} onClose={handleClose}>
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
            p: 4
          }}
        >
          <Typography variant="h6" gutterBottom>
            Cadastrar Novo Equipamento
          </Typography>
          <CreateEquipmentForm onSubmit={handleAddEquipment} />
        </Box>
      </Modal>
    </Container>
  );
}
