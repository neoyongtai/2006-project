import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';


const Post = props => (
    <tr>
      <td>{props.post.post_id}</td>
      <td>{props.post.username}</td>
      <td>{props.post.title}</td>
      <td>{props.post.description.substring(0,50)}</td>
      <td>{props.post.no_of_comments}</td>
      <td>{props.post.no_of_upvotes}</td>
      <td>
        <Link to={"/forum/view/"+props.post._id}>go to post</Link> | <Link to={"/forum/edit/"+props.post._id}>edit</Link> | <a href="#" onClick={() => { props.deletePost(props.post._id) }}>delete</a>
      </td>
    </tr>
  )


export default class PostList extends Component
{

    constructor(props) {
        super(props)

        this.deletePost = this.deletePost.bind(this);
        this.state = { post : []}
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/post/')
        .then(response => {
            this.setState({post : response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deletePost(id)
    {
        axios.delete('http://localhost:5000/post/' + id)
        .then(res =>console.log(res.data));
        this.setState({
            //delete the post from the UI.
            post: this.state.post.filter(el => el._id !== id)
        })
    }


    postList() {
        return this.state.post.map(currentpost => {
          return <Post post={currentpost} deletePost={this.deletePost} key={currentpost._id} />
        })
      }

    render()
    {
        return (
            <div>
            <h3>Get all Posts</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Post Id</th>
                  <th>Title</th>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Number of Comments</th>
                  <th>Number of Upvotes</th>
                </tr>
              </thead>
              <tbody>
                { this.postList() }
              </tbody>
            </table>
          </div>
        )
    }
}
