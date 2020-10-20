import React from 'react'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({

    root:{
        height: '100vh'
    }

}));

function MenuSelection () 
{

    const classes = useStyles();

    return (
        <div className = {classes.root}>

        </div>
    )
}
export default MenuSelection
