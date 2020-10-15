import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from  'axios';


export default class CreateReport extends Component
{
  
    
    constructor(props) {
        super(props)

        //Bind the event handlers
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeExpected_date = this.onChangeExpected_date.bind(this)
        this.onChangeReport_type = this.onChangeReport_type.bind(this)
        this.onChangeResidential_Area = this.onChangeResidential_Area.bind(this)
        this.onChangeType_Of_House = this.onChangeType_Of_House.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


           //Create the same fields as the MongoDB Schema
        this.state = {
            report_id: 3 ,
            report_type: " ",
            expected_date: new Date(),
            type_of_house: "",
            residential_area: "",
            description: ""
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
            expected_date: date
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

    onSubmit(e)
    {
        e.preventDefault();

        const report = {
            report_id: this.state.report_id,
            report_type: this.state.report_type,
            expected_date: this.state.expected_date,
            type_of_house: this.state.type_of_house,
            residential_area: this.state.residential_area,
            description: this.state.description
        }

        console.log(report)

        axios.post('http://localhost:5000/report/add',report)
        .then(res =>console.log(res.data))

        //Take back to the home pages.
       // window.location = '/';
    }
    render()
    {
        return (
            <div>
            <h3>Generate a new Report</h3>
            <form onSubmit={this.onSubmit}>

             
              <div className="form-group"> 
                <label>Report Type: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.onChangeReport_type}
                    onChange={this.onChangeReport_type}
                    />
              </div>
            
              <div className="form-group">
                <label>Expected Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.expected_date}
                    onChange={this.onChangeExpected_date}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Type of House: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.type_of_house}
                    onChange={this.onChangeType_Of_House}
                    />
              </div>
              <div className="form-group">
                <label>Residential Area: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.residential_area}
                    onChange={this.onChangeResidential_Area}
                    />
              </div>

              
              <div className="form-group">
                <label>Description: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>
      
              <div className="form-group">
                <input type="submit" value="Create Report" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}