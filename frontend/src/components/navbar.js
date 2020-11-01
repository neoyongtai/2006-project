import React, { Component } from 'react';
import axios from  'axios';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({forceRefresh:true});

export default class Navbar extends Component {

  constructor(props) {
      super(props)
      this.onSignOut = this.onSignOut.bind(this)
  }

  onSignOut(e)
  {
      e.preventDefault();

      axios.get('http://localhost:5000/users/logout?token=' + localStorage.getItem('SESSIONTOKEN'))
      .then(res => {
        localStorage.clear();
        console.log(res.data);
        history.push('/login');
      })
      .catch((error) => {
          console.log(error);
      })
  }

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
          <form onSubmit={this.onSignOut}>
            <div className="form-group">
              <input type="submit" value="Logout" className="btn btn-primary"
              disabled={localStorage.getItem('SESSIONTOKEN') === null ? "disabled" : ""} />
            </div>
          </form>
        </AppBar>
      </div>
    );
  }
}
