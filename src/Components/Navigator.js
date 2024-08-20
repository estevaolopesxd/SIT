import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ApiIcon from '@mui/icons-material/Api';
import SimCardIcon from '@mui/icons-material/SimCard';
import ArticleIcon from '@mui/icons-material/Article';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import MonitorIcon from '@mui/icons-material/Monitor';

// Define the categories for the navigation menu
const categories = [
  {
    id: 'Gerenciar',
    children: [
      { id: 'Usuários', icon: <PeopleIcon />, route: '/usuarios' },
      { id: 'Associar Item', icon: <DevicesOtherIcon />, route: '/ativos' },
      { id: 'Monitores', icon: <MonitorIcon />, route: '/monitores' },
      { id: 'Notebooks/Pcs', icon: <PhonelinkIcon />, route: '/pcs' },
      { id: 'Smartphone', icon: <SmartphoneIcon />, route: '/smartphone' },
      { id: 'Softwares', icon: <ApiIcon />, route: '/softwares' },
      { id: 'Linhas/Chips', icon: <SimCardIcon />, route: '/chips' },
    ],
  },
  {
    id: 'Quality',
    children: [
      { id: 'Logs', icon: <ArticleIcon /> ,route: '/logger'},
      { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    ],
  },
];

// Define the styles for the menu items and categories
const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

// Define the Navigator component
export default function Navigator(props) {
  const { ...other } = props;
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <Drawer
      variant="permanent"
      {...other}
      sx={{ width: 256, flexShrink: 0 }}
    >
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          SIT
        </ListItem>

        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, route }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton onClick={() => handleNavigation(route)} sx={item}>
                  <ListItemIcon sx={{ color: '#fff' }}>{icon}</ListItemIcon>
                  <ListItemText sx={{ color: '#fff' }}>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
