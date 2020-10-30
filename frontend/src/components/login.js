import React, {Component} from 'react';
import axios from  'axios';

export default class Login extends Component
{

    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSignIn = this.onSignIn.bind(this)
        this.onSignOut = this.onSignOut.bind(this)


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

    onSignIn(e)
    {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
        }

        //Send user data to backend.
        axios.post('http://localhost:5000/users/login', user)
        .then(res =>console.log(res.data))

        console.log(user)

        //Take back to the home pages.
        this.setState({
            username: "",
            password: "",
        })
    }

    onSignOut(e)
    {
        e.preventDefault();

        axios.get('http://localhost:5000/users/logout?token=5f9bf81c254ad80b1cf04b07')
        .then(res =>console.log(res.data))

    }

    render()
    {
        return (
            <div>
            <h3>Sign In / Sign Out</h3>
            <form onSubmit={this.onSignIn}>

              <div className="form-group">
                <label>Username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
              </div>

              <div className="form-group">
                <label>Password: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
              </div>

              <div className="form-group">
                <input type="submit" value="Login" className="btn btn-primary" />
              </div>
            </form>
            <form onSubmit={this.onSignOut}>
              <div className="form-group">
                <input type="submit" value="Logout" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}
