import React, { Component , useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import { Collapse, CssBaseline, IconButton } from '@material-ui/core';
import MenuSelection from './menu-selection'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({ 
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL +'/assets/bg2.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        opacity:0.90
    },
    titlestyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center'
    },
    title: {
        fontSize: '4rem'
    },
    down:{
        color: '#fff',
        fontSize: "3rem",
        alignItems: 'flex-start'
    },
    container: {
        display: 'flex'
    }


}));


function HomePage()
{
    const classes = useStyles();
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(true)
    },[])

        return(

        <div className = {classes.root}>

            
            <div className = {classes.titlestyle}> 
            <h1 className= {classes.title}>Welcome to <br/> <span>EstateWiz </span>
            </h1>
            
            <IconButton>
                <ExpandMoreIcon className={classes.down}/>
            </IconButton>
            </div>

            <MenuSelection></MenuSelection>

        </div>
        )

    
}

export default HomePage

//<MenuSelection/>

/*<CssBaseline></CssBaseline>
<Collapse in ={checked} {...(checked? {timeout:1000} : {})}
collapsedHeight={1}
>  */