import React, {Component} from 'react';
import axios from  'axios';

export default class CreateUser extends Component
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
            email: this.state.email,
        }

        //Send user data to backend.
        axios.post('http://localhost:5000/users/add',user)
        .then(res =>console.log(res.data))

        console.log(user)

        //Take back to the home pages.
        this.setState({
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            email: ""
        })
    }

    render()
    {
        return (
            <div>
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>

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
                <label>First Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.firstname}
                    onChange={this.onChangeFirstname}
                    />
              </div>

              <div className="form-group">
                <label>Last Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.lastname}
                    onChange={this.onChangeLastname}
                    />
              </div>

              <div className="form-group">
                <label>Email: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
              </div>

              <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}
