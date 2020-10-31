import React, {Component} from 'react';
import axios from  'axios';
import { createBrowserHistory } from "history";


const history = createBrowserHistory({forceRefresh: true});

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
            token: localStorage.getItem("SESSIONTOKEN"),
            userId: localStorage.getItem("USERID"),
            user: localStorage.getItem("USERNAME")
        }
    }

    // componentDidMount()
    // {
    //   if(localStorage.getItem("SESSIONTOKEN") !== null) {
    //       history.push('/forum')
    //     }
    // }


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
              console.log(this.state.user)
            })
            .catch((error) => {
                console.log(error);
            })
            history.push('/forum')
          })
          .catch((error) => {
              console.log(error);
          })
    }

    onSignOut(e)
    {
        e.preventDefault();

        axios.get('http://localhost:5000/users/logout?token=' + this.state.token)
        .then(res =>console.log(res.data))

        localStorage.removeItem("SESSIONTOKEN")

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
