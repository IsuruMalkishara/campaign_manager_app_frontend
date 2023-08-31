import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { BsFillGridFill, BsFillPeopleFill, BsFillPlayFill, BsFillPersonFill, BsBarChartFill, BsCollectionFill, BsBoxArrowRight } from 'react-icons/bs';
import '../styles/NavbarComponent.css';

export default function NavbarComponent() {
  const location = useLocation();

  const handleLogout = () => {
    console.warn('logout');
    sessionStorage.clear();
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className="sidebar"
    >
      <List>
        <ListItem
          button
          component={Link}
          to="/dashboard"
          className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}
        >
          <ListItemIcon>
            <BsFillGridFill />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/contact"
          className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}
        >
          <ListItemIcon>
            <BsFillPeopleFill />
          </ListItemIcon>
          <ListItemText primary="Contacts" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/campaign"
          className={location.pathname === '/campaign' ? 'nav-link active' : 'nav-link'}
        >
          <ListItemIcon>
            <BsFillPlayFill />
          </ListItemIcon>
          <ListItemText primary="Campaigns" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/sender"
          className={location.pathname === '/sender' ? 'nav-link active' : 'nav-link'}
        >
          <ListItemIcon>
            <BsFillPersonFill />
          </ListItemIcon>
          <ListItemText primary="Senders" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/report"
          className={location.pathname === '/report' ? 'nav-link active' : 'nav-link'}
        >
          <ListItemIcon>
            <BsBarChartFill />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/template"
          className={location.pathname === '/template' ? 'nav-link active' : 'nav-link'}
        >
          <ListItemIcon>
            <BsCollectionFill />
          </ListItemIcon>
          <ListItemText primary="Templates" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/"
          onClick={handleLogout}
        >
          <ListItemIcon>
            <BsBoxArrowRight />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
}
