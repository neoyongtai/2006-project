import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ImageCard from './imagecard';
import menu from "../static/menu";

const useStyles = makeStyles((theme) => ({
  root:{
      minHeight: '100vh',
  },
  card:{
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
  }
}));

function MenuSelection() {
  const classes = useStyles();

  return (
    <div className = {classes.root}>
      <div className= {classes.card}>
        <ImageCard post={menu[0]}></ImageCard>
        <ImageCard post={menu[1]}></ImageCard>
      </div>
    </div>
  )
}

export default MenuSelection
