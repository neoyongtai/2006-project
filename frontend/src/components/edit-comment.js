import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from  'axios';


export default class EditComment extends Component
{


    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


           //Create the same fields as the MongoDB Schema
           this.state = {
             username: " ",
             description: ""
           }
    }

    //Lifecycle React Method
   componentDidMount(){
     if(localStorage.getItem("SESSIONTOKEN") === null) {
         this.props.history.push('/login')
       }
    axios.get('http://localhost:5000/comment/'+ this.props.match.params.id)
    .then(response => {
      this.setState({
        username: response.data.username,
        description: response.data.description
      })
    })
    .catch(function (error) {
      console.log(error);
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
