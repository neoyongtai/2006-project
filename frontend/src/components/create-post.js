import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from  'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

export default class CreatePost extends Component
{
    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


           //Create the same fields as the MongoDB Schema
        this.state = {
            title: " ",
            username: " ",
            description: " ",
            no_of_comments: 0,
            no_of_upvotes: 0
        }
    }

    onChangeTitle(e)
    {
        this.setState({
            title: e.target.value
        })
    }

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

    onSubmit(e)
    {
        e.preventDefault();

        const post = {
            title: this.state.title,
            username: this.state.username,
            description: this.state.description,
            no_of_comments: this.state.no_of_comments,
            no_of_upvotes: this.state.no_of_upvotes
        }

        console.log(post)

        axios.post('http://localhost:5000/post/add',post)
        .then(res =>console.log(res.data))

    }
    render()
    {
        return (
            <Container maxWidth="sm">
              <h3>Create New Post</h3>
              <form onSubmit={this.onSubmit}>

              <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                    label="Title" variant="outlined"
                    required
                    fullWidth
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                  label="Username" variant="outlined"
                  fullWidth
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                  label="Description" variant="outlined"
                  required
                  fullWidth
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                      Create Post
                    </Button>
                  </Grid>
                </Grid>
              </form>
          </Container>
        )
    }
}
