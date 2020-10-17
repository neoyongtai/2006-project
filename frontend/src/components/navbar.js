import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export default class Navbar extends Component {

  render() {
    return (
      <div>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h6">HDB</Typography>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}
