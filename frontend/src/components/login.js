import React, {Component} from 'react';
import axios from  'axios';
import { TextField, Button, Grid, Container } from '@material-ui/core';

export default class CreateUser extends Component
{

    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


        //Create the same fields as the MongoDB Schema
        this.state = {
            username: "",
            password: "",
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

    
    onSubmit(e)
    {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
        }

        //Send user data to backend.
        axios.post('http://localhost:5000/users/add',user)
        .then(res =>console.log(res.data))

        console.log(user)

        //Take back to the home pages.
        this.setState({
            username: "",
            firstname: ""
        
        })
           
    }

    render()
    {
        return (
            <Container maxWidth='sm'>
                <h3>Create New User</h3>
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
            </Container>
        )
    }
}