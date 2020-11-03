import React, {Component} from 'react';
import axios from  'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

 class CreateComment extends Component
{

    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        //Create the same fields as the MongoDB Schema
        this.state = {
          post_id: this.props.post_id,
          username: localStorage.getItem('USERNAME'),
          user_id: localStorage.getItem('USERID'),
          description: "",
          no_of_comments: this.props.no_of_comments
        }
    }

    componentDidUpdate(prevProps,prevState)
    {

      if(prevState.no_of_comments !== this.state.no_of_comments)
      {
        this.upCommentCount()
      }
    }



    onChangeDescription(e)
    {
      this.setState({description: e.target.value})
    }

    upCommentCount() {
      axios.post('http://localhost:5000/post/update/upcomment/'+ this.props.match.params.id,
      {no_of_comments: this.state.no_of_comments})
      .then(res =>console.log(res.data))

      console.log("ON MOUNT")
      console.log(this.state.no_of_comments)
    }

    onSubmit(e)
    {
        e.preventDefault();
        if(localStorage.getItem("SESSIONTOKEN") === null)
        {
          this.props.history.push("/login")
          this.props.enqueueSnackbar('Please login to comment!')
        }
        else
        {
          if(this.state.description === "") {
            this.props.enqueueSnackbar('Comment cannot be empty!')
          }
          else
          {
            const comment = {
              post_id: this.state.post_id,
              username: this.state.username,
              user_id: this.state.user_id,
              description: this.state.description
            }

            console.log("BEFORE POST")
            console.log(this.state.no_of_comments)

            axios.post("http://localhost:5000/comment/add" , comment)
            .then(res => {
              this.setState((prevState) => ({
                no_of_comments: prevState.no_of_comments + 1
              }));
              this.props.enqueueSnackbar(res.data.message)
              this.props.closeSnackbar()
            })
          }
        }
    }

    render()
    {
        return (
          <div>
            <h3>Create New Comment</h3>
            <form onSubmit={this.onSubmit}>

            <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <TextField
                    label="Comment" variant="outlined"
                    required
                    fullWidth
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                      Create Comment
                    </Button>
                  </Grid>

                </Grid>
            </form>
          </div>
        )
    }
}
export default withSnackbar(withRouter(CreateComment))
