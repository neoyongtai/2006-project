import React, { useState, useEffect } from 'react';
import axios from  'axios';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({forceRefresh:true});
const useStyles = makeStyles((theme) => ({

  appbar:{
    background: 'Aero',
    fontFamily: 'Nunito',
    position: 'fixed',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto'
  },
  appbarTitle: {
    color: 'black',
    flexGrow: '1'

  },
  offset:theme.mixins.toolbar

}));

function Navbar()  {

  const classes = useStyles();
  const sessionToken = localStorage.getItem('SESSIONTOKEN');
  const userId = localStorage.getItem('USERID');

  const handleInputChange = e => {
    axios.get('http://localhost:5000/users/logout?token=' + localStorage.getItem('SESSIONTOKEN'))
    .then(res => {
      localStorage.clear();
      console.log(res.data);
      history.push('/login');
    })
    .catch((e) => {
        console.log(e);
    })
  }


  return (
    <div>
      <AppBar className = {classes.appbar} elevation={0} >
        <Toolbar className = {classes.appbarWrapper}>
          <Typography component={Link} to= {'/'} variant="h6" className={classes.appbarTitle} style={{textDecoration: 'none'}}>
                EstateWiz
          </Typography>
          <div>
            <Button component={Link} to={'/forum'}> Forum </Button>
            <Button component={Link} to = {'/report/create'}> Analysis</Button>
            {sessionToken ? <Button component={Link} to = {'/user/' + userId}> Profile</Button> : ""}
            <Button component={Link} to ={'/login'}
            disabled={sessionToken ? "disabled" : ""}>Login</Button>
            <Button onClick={handleInputChange}
            disabled={sessionToken === null ? "disabled" : ""}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}/>
    </div>
  );
}

export default Navbar
