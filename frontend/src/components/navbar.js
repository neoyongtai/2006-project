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
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">View Reports</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Report</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
      </AppBar>
    </div>
    );
  }
}
