import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from  'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { withSnackbar } from 'notistack';

class Profile extends Component
{
  constructor(props) {
      super(props)

      //Bind the event handlers
      this.onChangeUsername = this.onChangeUsername.bind(this)
      this.onChangePassword = this.onChangePassword.bind(this)
      this.onChangeFirstname = this.onChangeFirstname.bind(this)
      this.onChangeLastname = this.onChangeLastname.bind(this)
      this.onChangeEmail = this.onChangeEmail.bind(this)
      this.onSubmit = this.onSubmit.bind(this)


      //Create the same fields as the MongoDB Schema
      this.state = {
          username: "",
          password: "",
          firstname: "",
          lastname: "",
          email: "",
          token: localStorage.getItem("SESSIONTOKEN"),
          userId: localStorage.getItem("USERID")
      }
  }

  componentDidMount() {

    if(this.state.token === null) {
        this.props.history.push('/login')
      }

      axios.get('http://localhost:5000/users/verify?token=' + this.state.token)
      .then((res) => {
        axios.get('http://localhost:5000/users/get?userId=' + this.state.userId)
        .then(res => {
          this.setState({
            username: res.data.user.username,
            firstname: res.data.user.firstname,
            lastname: res.data.user.lastname,
            email: res.data.user.email
          })
        })
        .catch((error) => {
            console.log(error);
        })
      })
      .catch((error) => {
          console.log(error);
      })
  }

  onChangeUsername(e)
  {
      this.setState({
          username: e.target.value
      })
  }

  onChangePassword(e)
  {
      this.setState({
          password: e.target.value
      })
  }

  onChangeFirstname(e)
  {
      this.setState({
          firstname: e.target.value
      })
  }

  onChangeLastname(e)
  {
      this.setState({
          lastname: e.target.value
      })
  }

  onChangeEmail(e)
  {
      this.setState({
          email: e.target.value
      })
  }

  onSubmit(e)
  {
      e.preventDefault();

      const user = {
          username: this.state.username,
          password: this.state.password,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email
      }

      //Send user data to backend.
      axios.post('http://localhost:5000/users/update/' + this.props.match.params.id ,user)
      .then(res =>{
        this.props.enqueueSnackbar(res.data.message)
        this.props.history.push('/forum')
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render()
  {
      return (
          <Container maxWidth='sm'>
              <h3>Edit User</h3>
              <form onSubmit={this.onSubmit}>

              <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <TextField
                      label='Username' variant='outlined'
                      required
                      fullWidth
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                      type="password"
                      label='Password' variant='outlined'
                      fullWidth
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <TextField
                      label='First Name' variant='outlined'
                      fullWidth
                      value={this.state.firstname}
                      onChange={this.onChangeFirstname}
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <TextField
                      label='Last Name' variant='outlined'
                      fullWidth
                      value={this.state.lastname}
                      onChange={this.onChangeLastname}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                      label='Email' variant='outlined'
                      fullWidth
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <Button variant='contained' color='primary' type='submit' fullWidth>
                          Update User
                      </Button>
                  </Grid>
              </Grid>
            </form>
          </Container>
      )
  }
}

export default withSnackbar(Profile);
