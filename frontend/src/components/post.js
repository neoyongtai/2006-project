import React, {Component} from 'react';
import axios from  'axios';
import {Grid,Card,CardActions,CardContent,Typography,FormGroup,FormControlLabel,Checkbox,IconButton,Container} from '@material-ui/core/';
import CommentList from "../components/commentlist";
import CreateComment from "../components/create-comment";
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';
import { withSnackbar } from 'notistack';

TimeAgo.addDefaultLocale(en);

class ViewPost extends Component {

  constructor(props) {
    super(props)

    //Bind the event handlers
    this.onClickUpvoteHandler = this.onClickUpvoteHandler.bind(this)

    //Create the same fields as the MongoDB Schema
    this.state = {
      report_id: " ",
      title: " ",
      description: " ",
      no_of_comments: 0,
      no_of_upvotes: 0,
      createdAt: new Date(),
      token : localStorage.getItem('SESSIONTOKEN'),
      userId: localStorage.getItem('USERID'),
      username: localStorage.getItem('USERNAME'),
      ammenties :[{shop: false, mrt: false, school:false,food:false}],
      report_type:" ",
      hdb_type: " ",
      hdb_category: " ",
      region: " ",
      hdb_estate: " ",
      expected_date: new Date(),
      date_generated: new Date(),
      estimated_price: 0,
      estimated_tax : 0,
      report_desc: "",
      setUpvote: true,
      test: [{hello: true}]
    }
  }

  //Lifecycle React Method
  componentDidMount() {
    if(localStorage.getItem("SESSIONTOKEN") === null) {
    axios.get('http://localhost:5000/post/'+ this.props.match.params.id)
    .then(response => {
      this.setState({
        title: response.data.title,
        username: response.data.username,
        description: response.data.description,
        no_of_comments: response.data.no_of_comments,
        no_of_upvotes: response.data.no_of_upvotes,
        createdAt: response.data.createdAt,
        report_id: response.data.report_id
      })
      axios.get('http://localhost:5000/report/'+this.state.report_id)
      .then(response => {
        this.setState ({
          report_type:response.data.report_type,
          hdb_type: response.data.hdb_type,
          hdb_category:response.data.hdb_category,
          region: response.data.region,
          hdb_estate: response.data.hdb_estate,
          expected_date: response.data.expected_date,
          date_generated: response.data.date_generated,
          ammenties : response.data.ammenties,
          estimated_price: response.data.estimated_price,
          estimated_tax :response.data.estimated_tax,
          report_desc: response.data.description
        })

        console.log("Component")
        console.log(response.data.ammenties)
      })
    })
  }
  else {
    axios.get('http://localhost:5000/users/verify?token=' + this.state.token)
    .then((res) => {
      axios.get('http://localhost:5000/post/'+ this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          username: response.data.username,
          description: response.data.description,
          no_of_comments: response.data.no_of_comments,
          no_of_upvotes: response.data.no_of_upvotes,
          createdAt: response.data.createdAt,
          report_id: response.data.report_id
        })

        axios.get('http://localhost:5000/report/'+this.state.report_id)
        .then(response => {
           this.setState({
             report_type:response.data.report_type,
             hdb_type: response.data.hdb_type,
             hdb_category:response.data.hdb_category,
             region: response.data.region,
             hdb_estate: response.data.hdb_estate,
             expected_date: response.data.expected_date,
             date_generated: response.data.date_generated,
             ammenties : response.data.ammenties,
             estimated_price: response.data.estimated_price,
             estimated_tax :response.data.estimated_tax,
             report_desc: response.data.description
           })
           console.log("Component2")
        console.log(response.data.ammenties)
         })
      })
      .catch(function (error) {
        console.log(error);
      })
    })
    .catch((error) => {
        console.log(error);
    })
  }}



  upVote() {
    axios.post('http://localhost:5000/post/update/upvote/'+ this.props.match.params.id,
    {no_of_upvotes: this.state.no_of_upvotes + 1})
    .then(res => {
      localStorage.setItem('POSTID', this.props.match.params.id)
      this.setState({setUpvote: false})
    })
  }

  onClickUpvoteHandler() {
    if(localStorage.getItem("SESSIONTOKEN") === null) {
      this.props.history.push("/login")
      this.props.enqueueSnackbar('Please login to upvote!')
    }
    else {
      this.setState((prevState) => ({no_of_upvotes: prevState.no_of_upvotes + 1}))
      this.upVote();
    }
  }

  render() {

    return (
      <Container maxWidth="xl">
        <Grid container direction="column">
          <Grid item xs={12}>
            <Card>
              <CardContent>
              <Link to = "/forum">
                <KeyboardBackspaceIcon />
              </Link>
                <Typography variant="h3" gutterBottom>
                  {this.state.title}
                </Typography>
                <Typography variant="h5" component="h2">
                {this.state.description}
                </Typography>

                <br></br>
                <Typography variant ="h4">Report </Typography>
                <Typography variant ="h5">Report Type: {this.state.report_type} </Typography>
                <Typography variant ="h5"> HDB Type: {this.state.hdb_type} </Typography>
                <Typography variant ="h5"> HDB Category: {this.state.hdb_category}  </Typography>
                <Typography variant ="h5"> Region : {this.state.region} </Typography>
                <Typography variant ="h5"> HDB Estate: {this.state.hdb_estate} </Typography>
                <Typography variant ="h5"> Expected Date: {new Date(this.state.expected_date).toLocaleDateString()}</Typography>
                <Typography variant ="h5"> Report Generated On: {new Date(this.state.date_generated).toLocaleDateString()}</Typography>
                <Typography variant ="h5"> Method:  {this.state.report_desc} </Typography>

                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={this.state.ammenties[0].shop}  name="shop" color="primary" />}
                    label="Near Shopping Centre"/>
                  <FormControlLabel
                    control={<Checkbox checked={this.state.ammenties[0].mrt} name="mrt"  color="primary" />}
                    label="Near Mrt"/>
                  <FormControlLabel
                    control={<Checkbox checked={this.state.ammenties[0].school}  name="school"  color="primary" />}
                    label="Near School"/>
                  <FormControlLabel
                    control={<Checkbox checked={this.state.ammenties[0].food}name="food"   color="primary"/>}
                    label="Great Food"/>
                </FormGroup>
                <Typography variant ="h5">Estimated Price: ${this.state.estimated_price} </Typography>
                <Typography variant ="h5"> Estimated Annual Tax: ${this.state.estimated_tax} </Typography>
              </CardContent>
              <CardActions>
                <PersonIcon />{this.state.username}
                <p style={{ fontSize: 12 }}>(posted <ReactTimeAgo date={new Date(this.state.createdAt)} locale="en-US" timeStyle="round-minute"/> )</p>
                <IconButton size="small"
                onClick={this.onClickUpvoteHandler}
                disabled={localStorage.getItem('POSTID') === this.props.match.params.id ? true : false}>
                  <ArrowUpwardIcon />
                </IconButton><span>{this.state.no_of_upvotes}</span>
                <IconButton disabled size="small">
                  <ChatBubbleRoundedIcon />
                  </IconButton><span>{this.state.no_of_comments}</span>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <CreateComment
        post_id={this.props.match.params.id}
        no_of_comments={this.state.no_of_comments}/>
        <CommentList  post_id={this.props.match.params.id}/>
      </Container>
    )
  }
}
export default withSnackbar(ViewPost);
