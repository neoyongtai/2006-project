import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,Button,Typography} from '@material-ui/core/';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root:{
    maxWidth: 420,
    background: "rgba(0,0,0,0.7)",
    margin: '30px'
  },
  title:{
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "2rem",
    color:'#fff'
  },
  description:{
    fontFamily: "Nunito",
    fontSize: "1rem",
    color:'#ddd'
  }
});

function ImageCard({post}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={post.imageURL}
          title="Report" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
           {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
          {post.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button component={Link} to={post.link} size="small" color="primary">
          Find out More
        </Button>
      </CardActions>
    </Card>
  );
}

export default ImageCard;
