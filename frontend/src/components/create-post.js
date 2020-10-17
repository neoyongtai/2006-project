import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from  'axios';


export default class CreatePost extends Component
{


    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeNumberOfComments = this.onChangeNumberOfComments.bind(this)
        this.onChangeNumberOfUpvotes = this.onChangeNumberOfUpvotes.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


           //Create the same fields as the MongoDB Schema
        this.state = {
            post_id: 0,
            title: " ",
            username: " ",
            description: "",
            no_of_comments: "",
            no_of_upvotes: ""
        }
    }

    onChangeTitle(e)
    {
        this.setState({
            title: e.target.value
        })
    }

    //use a calendar
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

    onChangeNumberOfComments(e)
    {
        this.setState({
            no_of_comments: e.target.value
        })
    }

    onChangeNumberOfUpvotes(e)
    {
        this.setState({
            no_of_upvotes: e.target.value
        })
    }

    onSubmit(e)
    {
        e.preventDefault();

        const post = {
            post_id: this.state.post_id,
            title: this.state.title,
            username: this.state.username,
            description: this.state.description,
            no_of_comments: this.state.no_of_comments,
            no_of_upvotes: this.state.no_of_upvotes
        }

        console.log(post)

        axios.post('http://localhost:5000/post/add',post)
        .then(res =>console.log(res.data))

        //Take back to the home pages.
       // window.location = '/';
    }
    render()
    {
        return (
            <div>
            <h3>Generate a new Post</h3>
            <form onSubmit={this.onSubmit}>


              <div className="form-group">
                <label>Title: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    />
              </div>

              <div className="form-group">
                <label>Username: </label>
                <input
                    type="text"
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
              </div>

              <div className="form-group">
                <label>Description: </label>
                <div>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
                </div>
              </div>

              <div className="form-group">
                <label>No of Comments: </label>
                <input
                    type="text"
                    className="form-control"
                    value={this.state.no_of_comments}
                    onChange={this.onChangeNumberOfComments}
                    />
              </div>


              <div className="form-group">
                <label>No of Upvotes: </label>
                <input
                    type="text"
                    className="form-control"
                    value={this.state.no_of_upvotes}
                    onChange={this.onChangeNumberOfUpvotes}
                    />
              </div>

              <div className="form-group">
                <input type="submit" value="Create Post" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}
