import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default class Navbar extends Component {

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              HDB
            </Typography>
            <Link to={"/forum/create"}>
              <IconButton aria-label="Create Post">
                <AddIcon />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
