import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const Post = props => (
    <TableRow key={props.post.post_id} component={Link} to={"/forum/view/" + props.post._id}>
      <TableCell>{props.post.post_id}</TableCell>
      <TableCell>{props.post.username}</TableCell>
      <TableCell>{props.post.title}</TableCell>
      <TableCell>{props.post.description.substring(0,50)}</TableCell>
      <TableCell>{props.post.no_of_comments}</TableCell>
      <TableCell>{props.post.no_of_upvotes}</TableCell>
      <TableCell>
        <Link to={props.post.username !== localStorage.getItem('USERNAME')
      ? "#" : '/forum/edit/'+props.post._id}>
          <IconButton aria-label="Edit Post" disabled=
          {props.post.username !== localStorage.getItem('USERNAME')
        ? "disabled" : ""}>
            <EditIcon />
          </IconButton>
        </Link>
      </TableCell>
      <TableCell>
        <Link onClick={() => { props.post.username !== localStorage.getItem('USERNAME')
      ? console.log("NO") : props.deletePost(props.post._id) }}>
          <IconButton aria-label="Delete Post" disabled=
          {props.post.username !== localStorage.getItem('USERNAME')
        ? "disabled" : ""}>
            <DeleteIcon />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  )


export default class PostList extends Component
{

    constructor(props) {
        super(props)

        this.deletePost = this.deletePost.bind(this);
        this.state = {
          post : [],
          token : localStorage.getItem('SESSIONTOKEN'),
          userId: localStorage.getItem('USERID'),
          username: localStorage.getItem('USERNAME'),
          anchorEl: null
        }
    }

    openMenu = event => this.setState({ anchorEl: event.currentTarget })
    closeMenu = () => this.setState({ anchorEl: null })

    componentDidMount()
    {
      if(localStorage.getItem("SESSIONTOKEN") === null) {
          this.props.history.push('/login')
        }

        this.getAllPosts();
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

    getAllPosts()
    {
      axios.get('http://localhost:5000/users/verify?token=' + this.state.token)
      .then((res) => {
        console.log(this.state.token)
        console.log(this.state.userId)
        console.log(this.state.username)
        console.log(res.data)
        axios.get('http://localhost:5000/post')
        .then(response => {
            this.setState({post : response.data.posts})
            console.log(response.data.posts)
        })
        .catch((error) => {
            console.log(error);
        })
      })
      .catch((error) => {
          console.log(error);
      })
    }

    getOwnPosts(username)
    {
      axios.get('http://localhost:5000/post?username=' + username)
      .then(response => {
          this.setState({post : response.data.posts})
          console.log(response.data.posts)
      })
      .catch((error) => {
          console.log(error);
      })
    }

    postList() {
        return this.state.post.map(currentpost => {
          return <Post post={currentpost}
          deletePost={this.deletePost}
          key={currentpost._id} />
        })
      }

    render()
    {
        return (
          <TableContainer component={Paper}>
            <Table aria-label="all posts table">
              <TableHead>
                <TableRow>
                  <TableCell>Posts</TableCell>
                  <TableCell>
                    <Link
                    aria-controls="filter"
                    aria-haspopup="true"
                    onClick={this.openMenu}>
                      <IconButton aria-label="Filter">
                        <FilterListIcon />
                      </IconButton>
                    </Link>
                    <Menu
                    id="filter"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.closeMenu}>
                    <MenuItem
                    onClick={() => {
                      this.getAllPosts()
                      this.closeMenu()
                    }}>All</MenuItem>
                    <MenuItem
                    onClick={() => {
                      this.getOwnPosts(this.state.username)
                      this.closeMenu()
                    }}>Own</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Post Id</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Number of Comments</TableCell>
                  <TableCell>Number of Upvotes</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.postList()}
              </TableBody>
            </Table>
          </TableContainer>
        )
    }
}
