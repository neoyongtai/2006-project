import React, {Component} from 'react';
import axios from  'axios';
import { TextField, Button, Grid, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class Login extends Component
{
    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSignIn = this.onSignIn.bind(this)


        //Create the same fields as the MongoDB Schema
        this.state = {
            username: "",
            password: "",
            token: localStorage.getItem("SESSIONTOKEN"),
            userId: localStorage.getItem("USERID"),
            user: localStorage.getItem("USERNAME")
        }
    }

    componentDidMount()
    {
      if(localStorage.getItem("SESSIONTOKEN") !== null) {
          this.props.history.push('/forum')
        }
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

    onSignIn(e)
    {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        //Send user data to backend.
        axios.post('http://localhost:5000/users/login', user)
        .then(res => {
            localStorage.setItem('SESSIONTOKEN', res.data.token);
            localStorage.setItem('USERID', res.data.userId);
            this.setState (
              {
                token: localStorage.getItem('SESSIONTOKEN'),
                userId: localStorage.getItem('USERID')
              }
            )
            axios.get('http://localhost:5000/users/get?userId=' + this.state.userId)
            .then(res => {
              localStorage.setItem('USERNAME', res.data.user.username);
              this.setState ({user: localStorage.getItem('USERNAME')})
              console.log(this.state.token)
              console.log(this.state.userId)
              console.log(this.state.user)
              this.props.history.push('/forum')
            })
            .catch((error) => {
                console.log(error);
            })
          })
          .catch((error) => {
              console.log(error);
          })
    }


    render()
    {
      return (
          <Container maxWidth='sm'>
              <h3>Sign In</h3>
              <form onSubmit={this.onSignIn}>

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
                      label='Password' variant='outlined'
                      required
                      fullWidth
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <Button variant='contained' color='primary' type='submit' fullWidth>
                          Login
                      </Button>
                  </Grid>
              </Grid>
            </form>
            <br />
            <Grid item xs={12}>
                <Button variant='contained' color='primary' fullWidth
                component={Link} to ={'/user'}>
                    Sign Up
                </Button>
            </Grid>
          </Container>
      )
    }
}
