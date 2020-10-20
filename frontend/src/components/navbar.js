import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core/styles'



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

    return (
      <div >
        <AppBar className = {classes.appbar} elevation={0} >
          <Toolbar className = {classes.appbarWrapper}>
            <Typography component={Link} to= {'/'} variant="h6" className={classes.appbarTitle} style={{textDecoration: 'none'}}>
                  EstateWiz
            </Typography> 
            <div>
            <Button component={Link} to={'/forum/create'} > Add Post </Button>
            <Button component={Link} to = {'/report/create'}> Analaysis</Button>
            <Button component={Link} to ={'/user'} > Login</Button>
              </div>
          </Toolbar>
        </AppBar>
        <div className={classes.offset}/>

      </div>
    );
  }

export default Navbar