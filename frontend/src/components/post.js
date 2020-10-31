import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';
import axios from  'axios';
import CommentList from "../components/commentlist";
import CreateComment from "../components/create-comment";


TimeAgo.addDefaultLocale(en);


export default class ViewPost extends Component {

    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onClickUpvoteHandler = this.onClickUpvoteHandler.bind(this)


           //Create the same fields as the MongoDB Schema
           this.state = {
               post_id: " ",
               title: " ",
               username: " ",
               description: " ",
               no_of_comments: " ",
               no_of_upvotes: " ",
               createdAt: new Date(),
               token: ""
           }
    }

    //Lifecycle React Method
   componentDidMount(){

    axios.get('http://localhost:5000/post/'+ this.props.match.params.id)
    .then(response => {
      this.setState({
        post_id: response.data.post_id,
        title: response.data.title,
        username: response.data.username,
        description: response.data.description,
        no_of_comments: response.data.no_of_comments,
        no_of_upvotes: response.data.no_of_upvotes,
        createdAt: response.data.createdAt
      })
    })
    .catch(function (error) {
      console.log(error);
    })

    }

    updatePost(upVote) {
      const post = {
          post_id: this.state.post_id,
          title: this.state.title,
          username: this.state.username,
          description: this.state.description,
          no_of_comments: this.state.no_of_comments,
          no_of_upvotes: (this.state.no_of_upvotes + 1)
      }

      console.log(post)

      axios.post('http://localhost:5000/post/update/'+ this.props.match.params.id, post)
      .then(res =>console.log(res.data))
    }

    onClickUpvoteHandler() {
      this.setState({
        no_of_upvotes: this.state.no_of_upvotes + 1,
      })
      this.updatePost();
    }

    render()
    {
        return (
          <div>
            <Grid container spacing={3}>
            <Grid item xs={1} />
              <Grid item xs={9}>
                <Card >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {this.state.title}
                    </Typography>
                    <Typography variant="body2" component="h2">
                      {this.state.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <PersonIcon />{this.state.username}
                    <p style={{ fontSize: 12 }}>(posted <ReactTimeAgo date={this.state.createdAt} locale="en-US" timeStyle="round-minute"/> )</p>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={2}>
                <Grid item xs={12}>
                  <IconButton size="small"
                  onClick={this.onClickUpvoteHandler}>
                  <ArrowUpwardIcon />
                   </IconButton><span>{this.state.no_of_upvotes}</span>
                </Grid>
                <Grid item xs={12}>
                <IconButton disabled size="small">
                  <ChatBubbleRoundedIcon />
                  </IconButton><span>{this.state.no_of_comments}</span>
                </Grid>
              </Grid>
            </Grid>
            <CreateComment
            id={this.state.post_id}
            object_id={this.props.match.params.id}
            comment_count={this.state.no_of_comments}/>
            <CommentList id={this.state.post_id}/>
          </div>
        )
    }
}
