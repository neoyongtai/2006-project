import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';
import axios from  'axios';
import CommentList from "../components/commentlist";
import CreateComment from "../components/create-comment";


TimeAgo.addDefaultLocale(en);


export default class ViewPost extends Component {

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
               report_type:" ",
               hdb_type: " ",
               hdb_category: " ",
               region: " ",
               hdb_estate: " ",
               date_generated: new Date(),
               ammenties : [],
               estimated_price: 0,
               estimated_tax : 0

           }
    }

    //Lifecycle React Method
   componentDidMount(){
    console.log(this.props.match.params.id)
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
        this.setState({
          report_type:response.data.report_type,
          hdb_type: response.data.hdb_type,
          hdb_category:response.data.hdb_category,
          region: response.data.region,
          hdb_estate: response.data.hdb_estate,
          date_generated: response.data.date_generated,
          ammenties : response.data.ammenties,
          estimated_price: response.data.estimated_price,
          estimated_tax :response.data.estimated_tax

        })
     })
    })
   }
     else
     {
      axios.get('http://localhost:5000/users/verify?token=' + this.state.token)
      .then((res) => {
        console.log(this.state.token)
        console.log(this.state.userId)
        console.log(this.state.username)
        console.log(res.data)
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
          console.log("Get")
          console.log(this.state.report_id)

          axios.get('http://localhost:5000/report/'+this.state.report_id)
          .then(response => {
             this.setState({
               report_type:response.data.report_type,
               hdb_type: response.data.hdb_type,
               hdb_category:response.data.hdb_category,
               region: response.data.region,
               hdb_estate: response.data.hdb_estate,
               date_generated: response.data.date_generated,
               ammenties : response.data.ammenties,
               estimated_price: response.data.estimated_price,
               estimated_tax :response.data.estimated_tax

             })

          })
        })
        .catch(function (error) {
          console.log(error);
        })
      })
      .catch((error) => {
          console.log(error);
      })

     }


    }


    /*componentDidUpdate(prevProps,prevState)
    {

      if(prevState.no_of_comments !== this.state.no_of_comments)
      {
        this.upCommentCount()
      }
    }*/



    upVote() {
      axios.post('http://localhost:5000/post/update/upvote/'+ this.props.match.params.id,
      {no_of_upvotes: this.state.no_of_upvotes + 1})
      .then(res =>
        {
          console.log(res.data)
          localStorage.setItem('POSTID', this.props.match.params.id)
        })
    }

    onClickUpvoteHandler() {
      this.setState({
        no_of_upvotes: this.state.no_of_upvotes + 1
      })
      this.upVote();
    }

    render()
    {
        return (
          <div>
            <Grid container spacing={3}>
            <Grid item xs={1} />
              <Grid item xs={9}>
                <Card >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {this.state.title}
                    </Typography>
                    <Typography variant="body2" component="h2">
                      {this.state.description}
                    </Typography>

                    <Grid item xs={12}>
                   <Typography variant ="h6">Report Type: {this.state.report_type} </Typography>
                   </Grid>


                   <Grid item xs={12}>
                   <Typography variant ="h6"> HDB Type: {this.state.hdb_type} </Typography>
                   </Grid>


                   <Grid item xs={12}>
                   <Typography variant ="h6"> HDB Category: {this.state.hdb_category}  </Typography>
                   </Grid>


                   <Grid item xs={12}>
                   <Typography variant ="h6"> Region : {this.state.region} </Typography>
                   </Grid>


                   <Grid item xs={12}>
                   <Typography variant ="h6"> HDB Estate: {this.state.hdb_estate} </Typography>
                   </Grid>


                   <Grid item xs={12}>
                   <Typography variant ="h6"> Expected Date: {JSON.stringify(this.state.date_generated)}  </Typography>
                   </Grid>

                   <Grid item xs={12}>
                   <Typography variant ="h6"> Method:  {JSON.stringify(this.state.ammenties)} </Typography>
                   </Grid>

                   <Grid item xs={12}>
                   <Typography variant ="h6">Estaimted Price: ${this.state.estimated_price} </Typography>
                   </Grid>


                   <Grid item xs={12}>
                   <Typography variant ="h6"> Estimated Tax: ${this.state.estimated_tax} </Typography>
                       </Grid>




                  </CardContent>
                  <CardActions>
                    <PersonIcon />{this.state.username}
                    <p style={{ fontSize: 12 }}>(posted <ReactTimeAgo date={this.state.createdAt} locale="en-US" timeStyle="round-minute"/> )</p>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={2}>
                <Grid item xs={12}>
                  <IconButton size="small"
                  onClick={this.onClickUpvoteHandler}
                  disabled={localStorage.getItem('POSTID') === this.props.match.params.id ? "disabled" : ""}>
                  <ArrowUpwardIcon />
                   </IconButton><span>{this.state.no_of_upvotes}</span>
                </Grid>
                <Grid item xs={12}>
                <IconButton disabled size="small">
                  <ChatBubbleRoundedIcon />
                  </IconButton><span>{this.state.no_of_comments}</span>
                </Grid>
              </Grid>
            </Grid>
            <CreateComment
            post_id={this.props.match.params.id}
            no_of_comments={this.state.no_of_comments}/>
            <CommentList  post_id={this.props.match.params.id}/>
          </div>
        )
    }
}
