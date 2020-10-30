import React, { useState, useEffect } from 'react'
import axios from  'axios';
import { withRouter } from 'react-router-dom';
import {Grid, makeStyles, Container,Typography, TextField, InputLabel, Select, MenuItem, FormHelperText, FormLabel, FormGroup,FormControlLabel, Checkbox, Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({

  root:{
          //Select the class that enclosed the everything within the form.
      '& .MuiGrid-root': {
          width: '100%',
          margin: theme.spacing(1),
      },
   title:{
       display: 'flex',
      justifyContent: 'center'
      }
  }
}))



const formvalues = {
  report_type: "",
  hdb_type: "",
  hdb_category: "",
  region: "",
  hdb_estate: "",
  ammenties: {shop: false , mrt: false, hospital: false, school:false, food:false}, 
  expected_date: new Date(),
  user_id : 1,
  estimated_price:"",
  estimated_tax:"",
  date_generated: new Date()
}



function ReportSum(props) {

  const [report, setReport] = useState(formvalues);

  useEffect(() => {
     axios.get('http://localhost:5000/report/'+props.match.params.id)
    .then(response => {
      setReport(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })     
  },[])






  return (
    <div>

            <div >
            <h1  style={{textAlign: "center"}}>Report Analaysis </h1>
            </div>
              
              <Container maxWidth="sm">

                 <Grid container spacing={3}>
                 <Grid item xs={12}>
                   <Typography variant ="h6">Report Type: {report.report_type} </Typography> 
                   </Grid>

                   
                   <Grid item xs={12}>
                   <Typography variant ="h6"> HDB Type: {report.hdb_type} </Typography> 
                   </Grid>

                  
                   <Grid item xs={12}>
                   <Typography variant ="h6"> HDB Category: {report.hdb_category}  </Typography> 
                   </Grid>


                   <Grid item xs={12}>
                   <Typography variant ="h6"> Region : {report.region} </Typography> 
                   </Grid>


                   <Grid item xs={12}>
                   <Typography variant ="h6"> HDB Estate: {report.hdb_estate} </Typography> 
                   </Grid>
                    
                    
                   <Grid item xs={12}>
                   <Typography variant ="h6"> Expected Date: {JSON.stringify(report.date_generated)}  </Typography> 
                   </Grid>

                   <Grid item xs={12}>
                   <Typography variant ="h6"> Method:  {JSON.stringify(report.ammenties)} </Typography> 
                   </Grid>

                   <Grid item xs={12}>
                   <Typography variant ="h6">Estaimted Price: {report.estimated_price} </Typography> 
                   </Grid>

                    
                   <Grid item xs={12}>
                   <Typography variant ="h6"> Estimated Tax: {report.estimated_tax} </Typography> 
                   </Grid>
                    
                   <Grid item xs={6}> <Button variant="contained" color="primary" type="submit" fullWidth>
                    Save Report
                  </Button></Grid>
                   <Grid item xs={6}> <Button variant="contained" color="primary" type="submit" fullWidth>
                    Publish Report </Button> 
                    
                    </Grid>


                    </Grid>
                    </Container>
    </div>
  )
}


export default withRouter(ReportSum)


 
/* export class reportSum extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            report_type: " ",
            expected_date: new Date(),
            type_of_house: "",
            region: "",
            residential_area: "",
            description: "",
            estimated_price:"",
            estimated_tax:"",
            user_id : 3,
            date_generated: new Date()
             
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/report/'+this.props.match.params.id)
        .then(response => {
          this.setState({
            report_type: response.data.report_type,
            expected_date: new Date(response.data.expected_date),
            type_of_house: response.data.type_of_house,
            region: response.data.region,
            date_generated: new Date(response.data.date_generated),
            residential_area: response.data.residential_area,
            description: response.data.description,
            estimated_price: response.data.estimated_price,
            estimated_tax : response.data.estimated_tax
           
          })   
        })
        .catch(function (error) {
          console.log(error);
        })
           
        }


    render() {
        return (
            <div>
                 <Container maxWidth="sm">
                 <Typography variant="h2"> Report Summary </Typography>

                 <Grid container spacing={3}>
                 <Grid item xs={12}>
                   <Typography variant ="h6">Type of house: {this.state.type_of_house}</Typography> 
                   </Grid>

                   <Grid item xs={12}>
                   <Typography variant ="h6"> Residential Area:  {this.state.residential_area}</Typography> 
                   </Grid>

                   <Grid item xs={12}>
                   <Typography variant ="h6"> Region:   {this.state.region}</Typography> 
                   </Grid>

                    
                   <Grid item xs={12}>
                   <Typography variant ="h6"> Method:  {this.state.description}</Typography> 
                   </Grid>

                   <Grid item xs={12}>
                   <Typography variant ="h6">Estaimted Price:  {this.state.estimated_price}</Typography> 
                   </Grid>

                    
                   <Grid item xs={12}>
                   <Typography variant ="h6"> Estimated Tax:  {this.state.estimated_tax}</Typography> 
                   </Grid>
                    
                   <Grid item xs={6}> <Button variant="contained" color="primary" type="submit" fullWidth>
                    Save Report
                  </Button></Grid>
                   <Grid item xs={6}> <Button variant="contained" color="primary" type="submit" fullWidth>
                    Publish Report </Button> 
                    
                    </Grid>


                    </Grid>
                    </Container>
            </div>
        )
    }
}
 */
//export default reportSum
