import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from  'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withRouter } from 'react-router-dom';



class CreateReport extends Component
{
  
    
    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeExpected_date = this.onChangeExpected_date.bind(this)
        this.onChangeReport_type = this.onChangeReport_type.bind(this)
        this.onChangeResidential_Area = this.onChangeResidential_Area.bind(this)
        this.onChangeType_Of_House = this.onChangeType_Of_House.bind(this)
        this.onChangeRegion = this.onChangeRegion.bind(this)


        this.onSubmit = this.onSubmit.bind(this)


           //Create the same fields as the MongoDB Schema
        this.state = {
            report_type: " ",
            expected_date: new Date(),
            type_of_house: "",
            region: "",
            residential_area: "",
            description: "",
            user_id : 1,
            date_generated: new Date()
                }
    }

    //Lifecycle React Method
   /* componentDidMount(){
       this.setState({
        users: ['test user'],
        username: 'test user'
       }) 
    }*/

    onChangeReport_type(e)
    {
        this.setState({
            report_type: e.target.value
        })
    }

    //use a calendar
    onChangeExpected_date(date)
    {
        this.setState({
            expected_date: date.target.value
        })
    }

    onChangeType_Of_House(e)
    {
        this.setState({
            type_of_house: e.target.value
        })
    }

    onChangeResidential_Area(e)
    {
        this.setState({
            residential_area: e.target.value
        })
    }
    
    onChangeDescription(e)
    {
        this.setState({
            description: e.target.value
        })
    }

        
    onChangeRegion(e)
    {
        this.setState({
            region: e.target.value
        })
    }


    onSubmit(e)
    {
        e.preventDefault();


        const report = {
            report_type: this.state.report_type,
            expected_date: this.state.expected_date,
            type_of_house: this.state.type_of_house,
            region: this.state.region,
            residential_area: this.state.residential_area,
            description: this.state.description,
            date_generated: this.state.date_generated,
            user_id: this.state.user_id
        }

        console.log(report)

        axios.post('http://localhost:5000/report/add',report)
        .then(res => {
          console.log("This is the response")
          console.log(res.data) 
          const report_id = res.data._id
          this.props.history.push('/report/sum/'+report_id)

        }  )

        //console.log(report_id)
        //Redirect after submit to report summary page.
       // this.props.history.push('/report/sum/'+report_id)

    }
    render()
    {
        return (
            <Container maxWidth="sm">
            <h3>Generate Report</h3>
            <form onSubmit={this.onSubmit}>

            <Grid container spacing={3}>


                <Grid item xs={12}>
        <InputLabel id="simple-Category-label">Category</InputLabel>
        <Select
          labelId="Category"
          id="Category-simple-select-outlined"
          value={this.state.report_type}
          required
          fullWidth
          variant ="outlined"
          onChange={this.onChangeReport_type}
          label="Region">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={`Buy`}>Buy</MenuItem>
          <MenuItem value={`Sell`}>Sell</MenuItem>
          <MenuItem value={`Rental`}>Rental</MenuItem>
        </Select>
        </Grid>


                <Grid item xs={12}>
                <TextField
                label="Expected Date" variant="outlined"
                fullWidth
                type= 'date'
                InputLabelProps={{shrink:true}}
                value={this.state.expected_date}
                onChange={this.onChangeExpected_date}
                />
                </Grid>





                <Grid item xs={12}>
        <InputLabel id="simple-type-label">Type of House</InputLabel>
        <Select
          labelId="Type"
          id="Type-simple-select-outlined"
          value={this.state.type_of_house}
          required
          fullWidth
          variant="outlined"
          onChange={this.onChangeType_Of_House}
          label="Type">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={`Two-Room-Flexi`}>Two-Room-Flexi</MenuItem>
          <MenuItem value={`Three-Room`}>Three-Room</MenuItem>
          <MenuItem value={`Four-Room`}>Four-Room</MenuItem>
          <MenuItem value={`Five-Room`}>Five-Room</MenuItem>
          <MenuItem value={`3Gen`}>3Gen</MenuItem>
          <MenuItem value={`Executive Flat`}>Executive Flat</MenuItem>
          <MenuItem value={`DBSS`}>DBSS</MenuItem>



        </Select>
        </Grid>

        
        <Grid item xs={12}>
        <InputLabel id="simple-outlined-label">Region</InputLabel>
        <Select
          labelId="simple-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.region}
          required
          fullWidth
          onChange={this.onChangeRegion}
          variant="outlined"
          label="Region">
          
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={`Central Region`}>Central Region</MenuItem>
          <MenuItem value={`East Region`}>East Region</MenuItem>
          <MenuItem value={`North Region`}>North Region</MenuItem>
          <MenuItem value={`North-East Region`}>North-East Region</MenuItem>
          <MenuItem value={`West Region`}>West Region</MenuItem>
        </Select>
        </Grid>


            
        <Grid item xs={12}>
                <TextField
                label="Residential Area" variant="outlined"
                required
                fullWidth
                InputLabelProps={{shrink:true}}
                value={this.state.residential_area}
                onChange={this.onChangeResidential_Area}
                />
                </Grid>


                
            
                 <Grid item xs={12}>
                <TextField
                label="Description" variant="outlined"
                required
                fullWidth
                InputLabelProps={{shrink:true}}
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit" fullWidth>
                    Generate Report
                  </Button>
                </Grid>
              </Grid>
            </form>
        </Container>

        )
    }
}

export default withRouter(CreateReport)