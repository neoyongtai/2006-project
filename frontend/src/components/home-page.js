import React, { Component } from 'react';
import {makeStyles} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core';
import MenuSelection from './menu-selection'

const useStyles = makeStyles((theme) => ({ 
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL +'/assets/bg.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }


}));


function HomePage()
{
    const classes = useStyles();

        return(
        <div className = {classes.root}>
            <MenuSelection/>
        </div>
        )

    
}

export default HomePage