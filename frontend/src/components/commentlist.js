import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';


const Comment = props => (
    <tr>
      <td>{props.comment.comment_id}</td>
      <td>{props.comment.username}</td>
      <td>{props.comment.description.substring(0,50)}</td>
      <td>
        <Link to={"/forum/comments/edit/"+props.comment._id}>edit</Link> |
        <a href="#" onClick={() => { props.deleteComment(props.comment._id) }}>delete</a>
      </td>
    </tr>
  )


export default class CommentList extends Component
{

    constructor(props) {
        super(props)

        this.deleteComment = this.deleteComment.bind(this);
        this.state = { comment : []}
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/comment/')
        .then(response => {
            this.setState({comment : response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteComment(id)
    {
        axios.delete('http://localhost:5000/post/' + id)
        .then(res =>console.log(res.data));
        this.setState({
            //delete the post from the UI.
            post: this.state.post.filter(el => el._id !== id)
        })
    }


    commentList() {
        return this.state.comment.map(currentcomment => {
          return <Comment comment={currentcomment} deleteComment={this.deleteComment} key={currentcomment._id} />
        })
      }

    render()
    {
        return (
            <div>
            <h3>Get all Comments</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Comment Id</th>
                  <th>Username</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                { this.commentList() }
              </tbody>
            </table>
          </div>
        )
    }
}
