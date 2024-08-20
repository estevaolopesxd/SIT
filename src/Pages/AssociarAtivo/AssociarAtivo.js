import React, { useState } from 'react';
import {
  Paper,
  AppBar,
  Toolbar,
  Grid,
  TextField,
  Button,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const initialAssets = [
  { id: 1, name: 'Smartphone', type: 'Eletrônico', assignedTo: '', departamento: 'DEPTDI' },
  { id: 2, name: 'Monitor', type: 'Eletrônico', assignedTo: '',departamento: 'SESMT' },
  { id: 3, name: 'Licença Office', type: 'Software', assignedTo: '',departamento: 'DEPCTL' },
  // Adicione mais ativos conforme necessário
];

const users = ['João Silva', 'Maria Oliveira', 'Carlos Souza']; // Lista de usuários disponíveis

export default function AssociarAtivo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [assets, setAssets] = useState(initialAssets);
  const [editingAsset, setEditingAsset] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (assetId) => {
    setEditingAsset(assetId);
  };

  const handleSave = (assetId) => {
    const updatedAssets = assets.map((asset) =>
      asset.id === assetId ? { ...asset, assignedTo: selectedUser } : asset
    );
    setAssets(updatedAssets);
    setEditingAsset(null);
    setSelectedUser('');
  };

  const handleCancel = () => {
    setEditingAsset(null);
    setSelectedUser('');
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
                placeholder="Pesquise por nome ou tipo de ativo"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <TableContainer component={Paper} sx={{ margin: '16px' }}>
        <Table>
          <TableHead sx={{ fontWeight: 'bold' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Patrimonio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nome do Ativo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Usuário Associado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Departamento</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssets.map((asset) => (
              <TableRow key={asset.id} sx={{
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)', // Cor de fundo no hover
                },
              }}>
                <TableCell>{asset.patrimonio}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.type}</TableCell>
                <TableCell>
                  {editingAsset === asset.id ? (
                    <FormControl fullWidth>
                      <InputLabel>Usuário</InputLabel>
                      <Select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        label="Usuário"
                      >
                        {users.map((user) => (
                          <MenuItem key={user} value={user}>
                            {user}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Typography>{asset.assignedTo || 'Não Associado'}</Typography>
                  )}
                </TableCell>
                <TableCell>{asset.departamento}</TableCell>
                <TableCell>
                  {editingAsset === asset.id ? (
                    <>
                      <IconButton color="primary" onClick={() => handleSave(asset.id)}>
                        <CheckIcon />
                      </IconButton>
                      <IconButton color="error" onClick={handleCancel}>
                        <ClearIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton color="primary" onClick={() => handleEdit(asset.id)}>
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
