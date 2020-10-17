import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from  'axios';


export default class EditComment extends Component
{


    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


           //Create the same fields as the MongoDB Schema
           this.state = {
               comment_id: 100 ,
               username: " ",
               description: ""
           }
    }

    //Lifecycle React Method
   componentDidMount(){
    axios.get('http://localhost:5000/comment/'+ this.props.match.params.id)
    .then(response => {
      this.setState({
        comment_id: response.data.post_id,
        username: response.data.username,
        description: response.data.description
      })
    })
    .catch(function (error) {
      console.log(error);
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

    onSubmit(e)
    {
        e.preventDefault();

        const comment = {
            comment_id: this.state.comment_id,
            username: this.state.username,
            description: this.state.description
        }

        console.log(comment)

        axios.post('http://localhost:5000/comment/update/'+ this.props.match.params.id, comment)
        .then(res =>console.log(res.data))

        //Take back to the home pages.
       // window.location = '/';
    }
    render()
    {
        return (
            <div>
            <h3>Edit Comment</h3>
            <form onSubmit={this.onSubmit}>

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
                <input type="submit" value="Edit Post" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}
