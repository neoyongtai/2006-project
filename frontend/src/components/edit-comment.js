import React, {Component} from 'react';
import axios from  'axios';
import {TextField,Button,Grid,Container} from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

class EditComment extends Component {
  constructor(props) {
    super(props)

    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      username: " ",
      description: ""
    }
  }

  componentDidMount() {
    if(localStorage.getItem("SESSIONTOKEN") === null)
      this.props.history.push('/login')

    axios.get('http://localhost:5000/comment/'+ this.props.match.params.id)
    .then(response => {
      this.setState({
        username: response.data.username,
        description: response.data.description
      })
    })
    .catch(function (error) {
    console.log(error);
    })
  }

  onChangeDescription(e) {
    this.setState({description: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();

    const comment = {
      username: this.state.username,
      description: this.state.description
    }

    axios.post('http://localhost:5000/comment/update/'+ this.props.match.params.id, comment)
    .then(res => {
      this.props.enqueueSnackbar(res.data.message)
      this.props.history.push('/forum')
    })
    .catch((error) => {
        console.log(error);
    })
  }

  render()
  {
    return (
      <Container maxWidth="sm">
        <h3>Edit Comment</h3>
        <form onSubmit={this.onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
              label="Description" variant="outlined"
              required
              fullWidth
              value={this.state.description}
              onChange={this.onChangeDescription} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Edit Comment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }
}

export default withSnackbar(EditComment);
