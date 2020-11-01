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
          </div>
        )
    }
}
