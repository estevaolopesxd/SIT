import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

// Dados simulados de logs
const logData = [
  {
    id: 1,
    date: '2024-08-20',
    action: 'Criação de usuário',
    lastModified: '2024-08-20 10:15:00',
    modifiedBy: 'Admin1',
  },
  {
    id: 2,
    date: '2024-08-19',
    action: 'Edição de perfil',
    lastModified: '2024-08-19 14:25:30',
    modifiedBy: 'Admin2',
  },
  {
    id: 3,
    date: '2024-08-18',
    action: 'Exclusão de ativo',
    lastModified: '2024-08-18 09:45:10',
    modifiedBy: 'Admin3',
  },
  {
    id: 4,
    date: '2024-08-17',
    action: 'Alteração de senha',
    lastModified: '2024-08-17 11:20:50',
    modifiedBy: 'Admin1',
  },
];

export default function Logger() {
  return (
    <Paper sx={{ maxWidth: 'md', margin: 'auto', overflow: 'hidden', padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Histórico de Logs
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dia</TableCell>
              <TableCell>Ação</TableCell>
              <TableCell>Última Modificação</TableCell>
              <TableCell>Modificado por</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logData.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.lastModified}</TableCell>
                <TableCell>{log.modifiedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
