import React, {Component} from 'react';
import axios from  'axios';
import {TextField,Button,Grid,Container} from '@material-ui/core/';
import { withSnackbar } from 'notistack';

class CreatePost extends Component {
  constructor(props) {
    super(props)

    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      title: " ",
      username: localStorage.getItem('USERNAME'),
      description: " ",
      user_id:localStorage.getItem('USERID'),
      report_id:props.match.params.id
    }
  }

  componentDidMount() {
    if(localStorage.getItem("SESSIONTOKEN") === null)
      this.props.history.push('/login')
  }

  onChangeTitle(e) {
    this.setState({title: e.target.value})
  }

  onChangeDescription(e) {
    this.setState({description: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();

    const post = {
      title: this.state.title,
      username: this.state.username,
      description: this.state.description,
      user_id:this.state.user_id,
      report_id: this.state.report_id
    }

    axios.post('http://localhost:5000/post/add',post)
    .then(res =>
      {
        if(res.data.success === true) {
          this.props.history.push('/forum')
        }
        this.props.enqueueSnackbar(res.data.message)
        this.props.closeSnackbar()
      })
  }

  render() {
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
              onChange={this.onChangeTitle} />
            </Grid>
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
                Create Post
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }
}

export default withSnackbar(CreatePost);
