import React, {Component} from 'react';
import axios from  'axios';

export default class CreateComment extends Component
{

    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


        //Create the same fields as the MongoDB Schema
        this.state = {
          post_id: 101,
          comment_id: 2,
          username: "",
          description: ""
        }
    }

    onChangeUsername(e)
    {
        this.setState({
            username: e.target.value
        })
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
          comment_id: this.state.comment_id,
          username: this.state.username,
          description: this.state.description
        }

        console.log(comment)

        //Send user data to backend.
        axios.post('http://localhost:5000/comment/add',comment)
        .then(res =>console.log(res.data))

        //Take back to the home pages.
    }

    render()
    {
        return (
            <div>
            <h3>Create New Comment</h3>
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
                <label>Comment: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>

              <div className="form-group">
                <input type="submit" value="Create Comment" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}
