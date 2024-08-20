import React, { useState } from 'react';
import {
  Paper,
  AppBar,
  Toolbar,
  Grid,
  TextField,
  Button,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import HistoryIcon from '@mui/icons-material/History'; // Ícone para Logs
import CadastrarUsuario from './CadastrarUsuario';

const initialRows = [
  { nome: 'João Silva', departamento: 'TI', status: 'Ativo', ativos: ['Laptop', 'Smartphone'], historico: ['Login 01/08/2024', 'Logout 01/08/2024'] },
  { nome: 'Maria Oliveira', departamento: 'Recursos Humanos', status: 'Inativo', ativos: ['Desktop'], historico: ['Login 02/08/2024', 'Logout 02/08/2024'] },
  { nome: 'Carlos Souza', departamento: 'Marketing', status: 'Ativo', ativos: ['Tablet', 'Monitor'], historico: ['Login 03/08/2024', 'Logout 03/08/2024'] },
];

export default function Usuarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isLogsModalOpen, setLogsModalOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (nome) => {
    console.log(`Alterar status de ${nome}`);
  };

  const handleEdit = (nome) => {
    console.log(`Editar usuário ${nome}`);
  };

  const handleDelete = (nome) => {
    console.log(`Deletar usuário ${nome}`);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  const handleUserModalClose = () => {
    setUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleLogsClick = (user) => {
    setSelectedUser(user);
    setLogsModalOpen(true);
  };

  const handleLogsModalClose = () => {
    setLogsModalOpen(false);
    setSelectedUser(null);
  };

  const handleOpenCreateUserModal = () => {
    setOpen(true);
  };

  const handleCreateUserModalClose = () => {
    setOpen(false);
  };

  return (
    <Paper sx={{ maxWidth: 'md', margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Pesquise por nome ou departamento"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }} onClick={handleOpenCreateUserModal}>
                Adicionar Usuário
              </Button>
              <Tooltip title="Atualizar">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <TableContainer component={Paper} sx={{ margin: '16px' }}>
        <Table>
          <TableHead sx={{ fontWeight: 'bold' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Departamento</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                key={row.nome}
                sx={{ '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
              >
                <TableCell onClick={() => handleUserClick(row)} style={{ cursor: 'pointer' }}>
                  {row.nome}
                </TableCell>
                <TableCell>{row.departamento}</TableCell>
                <TableCell>
                  <IconButton
                    color={row.status === 'Ativo' ? 'primary' : 'default'}
                    onClick={() => handleStatusChange(row.nome)}
                  >
                    {row.status === 'Ativo' ? <ToggleOnIcon /> : <ToggleOffIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(row.nome)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row.nome)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="default" onClick={() => handleLogsClick(row)}>
                    <HistoryIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCreateUserModalClose} fullWidth maxWidth="sm">
        <DialogTitle>Criar Novo Usuário</DialogTitle>
        <DialogContent>
          <CadastrarUsuario />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateUserModalClose} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isUserModalOpen} onClose={handleUserModalClose} fullScreen>
        <DialogTitle>Ativos de {selectedUser?.nome}</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <List>
              {selectedUser.ativos.map((ativo, index) => (
                <ListItem key={index} button onClick={() => console.log(`Detalhamento de ${ativo}`)}>
                  <ListItemText primary={ativo} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUserModalClose} color="secondary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isLogsModalOpen} onClose={handleLogsModalClose} fullScreen>
        <DialogTitle>Histórico de {selectedUser?.nome}</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <List>
              {selectedUser.historico.map((log, index) => (
                <ListItem key={index}>
                  <ListItemText primary={log} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogsModalClose} color="secondary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
