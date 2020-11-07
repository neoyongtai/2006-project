import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,IconButton,Select,MenuItem} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from 'react-router-dom';

const Post = props => (
  <TableRow key={props.post.post_id} component={Link} to={"/forum/view/" + props.post._id}>
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


class PostList extends Component
{
  constructor(props) {
      super(props)

      this.onChangeEstate = this.onChangeEstate.bind(this)
      this.onChangePost = this.onChangePost.bind(this)
      this.deletePost = this.deletePost.bind(this);
      this.state = {
        post: [],
        token : localStorage.getItem('SESSIONTOKEN'),
        userId: localStorage.getItem('USERID'),
        username: localStorage.getItem('USERNAME'),
        estateFilter: "ALL",
        postFilter: "ALL"
      }
  }

  componentDidMount() {
    this.getAllPosts();
  }

  deletePost(id) {
      axios.delete('http://localhost:5000/post/' + id)
      .then(res =>console.log(res.data));
      this.setState({
          post: this.state.post.filter(el => el._id !== id)
      })
  }

  getAllPosts() {
    axios.get('http://localhost:5000/post/postreport')
    .then(response => {
      this.setState({post: response.data})
    })
    .catch((error) => console.log(error))
  }

  postList() {
      return this.state.post.map(currentpost => {
        if(currentpost.username === this.state.postFilter) {
          if(currentpost.report_id.hdb_estate === this.state.estateFilter) {
            return <Post post={currentpost}
            deletePost={this.deletePost}
            key={currentpost._id} />
          }
          if(this.state.estateFilter === "ALL") {
            return <Post post={currentpost}
            deletePost={this.deletePost}
            key={currentpost._id} />
          }
        }

        if(this.state.postFilter === "ALL") {
          if(currentpost.report_id.hdb_estate === this.state.estateFilter) {
            return <Post post={currentpost}
            deletePost={this.deletePost}
            key={currentpost._id} />
          }
          if(this.state.estateFilter === "ALL") {
            return <Post post={currentpost}
            deletePost={this.deletePost}
            key={currentpost._id} />
          }
        }
      })
    }

  onChangeEstate(e) {
      this.setState({estateFilter: e.target.value})
  }

  onChangePost(e) {
      this.setState({postFilter: e.target.value})
  }


  render() {

    return (
      <TableContainer component={Paper}>
        <Table aria-label="all posts table">
          <TableHead>
            <TableRow>
              <TableCell>Filter Post By</TableCell>
              <TableCell>
              <Select
                labelId="select-estate-label"
                id="Estate" //Set
                value={this.state.estateFilter}
                onChange={this.onChangeEstate}
                fullWidth
                label="select-estate-label"
                variant ="outlined">
              <MenuItem value={`ALL`}>All (Estate)</MenuItem>
              <MenuItem value={`ANG_MOK_KIO`}>Ang Mo Kio</MenuItem>
              <MenuItem value={`BUKIT_TIMAH`}>Bukit Timah</MenuItem>
              <MenuItem value={`BUKIT_PANJANG`}>Bukit Panjang</MenuItem>
              <MenuItem value={`BUKIT_MERAH`}>Bukit Merah</MenuItem>
              <MenuItem value={`BEDOK`}>Bedok</MenuItem>
              <MenuItem value={`BISHAN`}>Bishan</MenuItem>
              <MenuItem value={`Clementi`}>Clementi</MenuItem>
              <MenuItem value={`CENTRAL`}>Central Area</MenuItem>
              <MenuItem value={`CHOA_CHU_KANG`}>Choa Chu Kang</MenuItem>
              <MenuItem value={`GEYLANG`}>Geylang</MenuItem>
              <MenuItem value={`HOUGANG`}>Hougang</MenuItem>
              <MenuItem value={`JURONG_EAST`}>Jurong East</MenuItem>
              <MenuItem value={`JURONG_WEST`}>Jurong West</MenuItem>
              <MenuItem value={`KALLANG`}>Kallang</MenuItem>
              <MenuItem value={`MARINE_PARADE`}>Marine Parade</MenuItem>
              <MenuItem value={`PASIR_RIS`}>Pasir Ris</MenuItem>
              <MenuItem value={`PUNGGOL`}>Punggol</MenuItem>
              <MenuItem value={`QUEENSTOWN`}>Queenstown</MenuItem>
              <MenuItem value={`SEMBAWANG`}>Sembawang</MenuItem>
              <MenuItem value={`SENGKANG`}>Sengkang</MenuItem>
              <MenuItem value={`SERANGOON`}>Serangoon</MenuItem>
              <MenuItem value={`TAMPINES`}>Tampines</MenuItem>
              <MenuItem value={`TOA_PAYOH`}>Toa Payoh</MenuItem>
              <MenuItem value={`WOODLANDS`}>Woodlands</MenuItem>
              <MenuItem value={`YISHUN`}>Yishun</MenuItem>
              </Select>
              </TableCell>
              <TableCell>
              <Select
                labelId="select-post-label"
                id="Post" //Set
                value={this.state.postFilter}
                onChange={this.onChangePost}
                fullWidth
                label="select-post-label"
                variant ="outlined">
                  <MenuItem value="ALL">All (User)</MenuItem>
                  <MenuItem value={this.state.username}>Own</MenuItem>
                </Select>
            </TableCell>
            </TableRow>
            <TableRow>
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

export default withRouter(PostList)
