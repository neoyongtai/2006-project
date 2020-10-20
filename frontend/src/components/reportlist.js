import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';


//This is another component. Total have 2 components in this file.
//This is a functional reeact component
const Report = props => (
    <tr>
      <td>{props.report.report_id}</td>
      <td>{props.report.report_type}</td>
      <td>{props.report.expected_date.substring(0,10)}</td>
      <td>{props.report.type_of_house}</td>
      <td>{props.report.residential_area}</td>
      <td>{props.report.description}</td>
      <td>
        <Link to={"/edit/"+props.report._id}>edit</Link> | <a href="#" onClick={() => { props.deleteReport(props.report._id) }}>delete</a>
      </td>
    </tr>
  )


export default class ReportList extends Component
{

    constructor(props) {
        super(props)

        this.deleteReport = this.deleteReport.bind(this);
        this.state = { report : []}
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/report/')
        .then(response => {
            this.setState({report : response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteReport(id)
    {
        axios.delete('http://localhost:5000/report/' + id)
        .then(res =>console.log(res.data));
        this.setState({
            //delete the report from the UI.
            //el is element. So return element that the _id is not equal to the id being deleted.
            report: this.state.report.filter(el => el._id !== id)
        })
    }


    reportList() {

        return this.state.report.map(currentreport => {
          // report, deleteReport, key are the props.
          return <Report report={currentreport} deleteReport={this.deleteReport} key={currentreport._id}/>;
        })
      }

    render()
    {
        return (
            <div>
            <h3>Get all Reports</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Report Id</th>
                  <th>Report Type</th>
                  <th>Expected Date</th>
                  <th>Type of House</th>
                  <th>Residential Area</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                { this.reportList() }
              </tbody>
            </table>
          </div>
        )
    }
}
