import React, {useContext} from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
function Header() {
    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Customer Profile
          </Typography>
          {isLoggedIn && (
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  };
  
  
export default Header;