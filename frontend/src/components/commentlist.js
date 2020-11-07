import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,IconButton} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withSnackbar } from 'notistack';

const Comment = props => (
  <TableRow key={props.comment.comment_id}>
    <TableCell>{props.comment.username}</TableCell>
    <TableCell>{props.comment.description.substring(0,50)}</TableCell>
    <TableCell>
    <Link to={props.comment.username !== localStorage.getItem('USERNAME')
    ? "#" : "/forum/comment/edit/" + props.comment._id}>
      <IconButton aria-label="Edit Comment" disabled=
      {props.comment.username !== localStorage.getItem('USERNAME')
      ? "disabled" : ""}>
        <EditIcon />
      </IconButton>
    </Link>
    </TableCell>
    <TableCell>
      <Link onClick={() => { props.comment.username !== localStorage.getItem('USERNAME')
      ? console.log("NO") : props.deleteComment(props.comment._id) }}>
        <IconButton aria-label="Delete Post" disabled=
        {props.comment.username !== localStorage.getItem('USERNAME')
        ? "disabled" : ""}>
          <DeleteIcon />
        </IconButton>
      </Link>
    </TableCell>
  </TableRow>
)


class CommentList extends Component {
  constructor(props) {
    super(props)

    this.deleteComment = this.deleteComment.bind(this);
    this.state = {
      comment : [],
      post_id: this.props.post_id
    }
  }

  componentDidUpdate(prevProps, prevState) {
   if(prevState.post_id !== this.props.post_id)
    this.setState({post_id: this.props.post_id})
  }


  componentDidUpdate(prevProps, prevState) {
    if(prevState.post_id !== this.props.post_id) {
      this.setState({post_id: this.props.post_id})
    }
    else {
      axios.get("http://localhost:5000/comment/get/" + this.state.post_id)
      .then(response => {
          this.setState({comment : response.data})
      })
      .catch((error) => {
          console.log(error);
      })
    }
  }

  deleteComment(id) {
    axios.delete('http://localhost:5000/comment/' + id)
    .then(res => {
      this.props.enqueueSnackbar(res.data.message)
      this.props.closeSnackbar()
      axios.post('http://localhost:5000/post/update/downcomment/'+  this.state.post_id)
      .then(res =>console.log(res.data))
    });

    this.setState ({comment: this.state.comment.filter(el => el._id !== id)})
  }


  commentList() {
    return this.state.comment.map(currentcomment => {
      return <Comment comment={currentcomment} deleteComment={this.deleteComment} key={currentcomment._id} />
    })
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="all posts table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { this.commentList() }
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default withSnackbar(CommentList);
