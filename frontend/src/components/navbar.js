import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core/styles'



const useStyles = makeStyles((theme) => ({


  
  appbar:{
    background: 'none',
    fontFamily: 'Nunito',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto'
  },
  appbarTitle: {
    flexGrow: '1'
    
  },



}));

function Navbar()  {

    const classes = useStyles();

    return (
      <div>
        <AppBar className = {classes.appbar} elevation={0} >
          <Toolbar className = {classes.appbarWrapper}>
            <Typography variant="h5" className={classes.appbarTitle}>
              EstateWiz
            </Typography> 
            <div>
            <Button component={Link} to={'/forum/create'} color ="primary"> Add Post </Button>
            <Button component={Link} to = {'/report/create'} color ="primary"> Forum</Button>
            <Button color ="primary" > Login</Button>
              </div>
          </Toolbar>
        </AppBar>

      </div>
    );
  }

export default Navbar