import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';

function Post() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={11}>
          <Card >
            <CardContent>
              <Typography  color="textSecondary" gutterBottom>
                Title 1
              </Typography>
              <Typography variant="h5" component="h2">
                Message
              </Typography>
            </CardContent>
            <CardActions>
              <PersonIcon /><Button size="small">Username 1</Button>
              <p style={{ fontSize: 12 }}>(posted 1 hour ago)</p>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={1}>
          <Grid item xs={12}>
            <ArrowUpwardIcon /> <span>5</span>
          </Grid>
          <Grid item xs={12}>
            <ChatBubbleRoundedIcon /> <span>3</span>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Post;
