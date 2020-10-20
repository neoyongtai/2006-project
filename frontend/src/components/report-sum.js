import React, { Component } from 'react'
import axios from  'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'



export class reportSum extends Component {

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

export default reportSum
