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
import axios from  'axios';

export default class ViewPost extends Component {

    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeNumberOfComments = this.onChangeNumberOfComments.bind(this)
        this.onChangeNumberOfUpvotes = this.onChangeNumberOfUpvotes.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


           //Create the same fields as the MongoDB Schema
           this.state = {
               post_id: 100 ,
               title: " ",
               username: " ",
               description: "",
               no_of_comments: "",
               no_of_upvotes: ""
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

      })
    })
    .catch(function (error) {
      console.log(error);
    })

    }

    onChangeTitle(e)
    {
        this.setState({
            title: e.target.value
        })
    }

    //use a calendar
    onChangeUsername(e)
    {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e)
    {
        this.setState({
            description: e.target.value
        })
    }

    onChangeNumberOfComments(e)
    {
        this.setState({
            no_of_comments: e.target.value
        })
    }

    onChangeNumberOfUpvotes(e)
    {
        this.setState({
            no_of_upvotes: e.target.value
        })
    }

    onSubmit(e)
    {
        e.preventDefault();

        const post = {
            post_id: this.state.post_id,
            title: this.state.title,
            username: this.state.username,
            description: this.state.description,
            no_of_comments: this.state.no_of_comments,
            no_of_upvotes: this.state.no_of_upvotes
        }

        console.log(post)

        axios.post('http://localhost:5000/post/'+ this.props.match.params.id, post)
        .then(res =>console.log(res.data))

        //Take back to the home pages.
       // window.location = '/';
    }
    render()
    {
        return (
          <div>
            <Grid container spacing={3}>
              <Grid item xs={11}>
                <Card >
                  <CardContent>
                    <Typography  color="textSecondary" gutterBottom>
                      {this.state.title}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {this.state.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <PersonIcon />{this.state.username}
                    <p style={{ fontSize: 12 }}>(posted 1 hour ago)</p>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={1}>
                <Grid item xs={12}>
                  <ArrowUpwardIcon /> <span>{this.state.no_of_upvotes}</span>
                </Grid>
                <Grid item xs={12}>
                  <ChatBubbleRoundedIcon /> <span>{this.state.no_of_comments}</span>
                </Grid>
              </Grid>
            </Grid>
          </div>
        )
    }
}
