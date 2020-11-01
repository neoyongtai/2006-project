import React, {Component} from 'react';
import axios from  'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

export default class CreateComment extends Component
{

    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        //Create the same fields as the MongoDB Schema
        this.state = {
          post_id: " ",
          username: localStorage.getItem('USERNAME'),
          description: " "
        }
    }

    componentDidUpdate(prevProps, prevState){
   if(prevState.post_id !== this.props.id){
       this.setState({
            post_id: this.props.id
       })
   }
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

        const comment = {
          post_id: this.state.post_id,
          username: this.state.username,
          description: this.state.description
        }

        axios.post("http://localhost:5000/comment/add" , comment)
        .then(res =>console.log(res.data))
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
