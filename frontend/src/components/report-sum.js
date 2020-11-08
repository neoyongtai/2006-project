import React, { useState, useEffect } from 'react'
import axios from  'axios';
import { withRouter, useLocation } from 'react-router-dom';
import {Grid, Container,Typography,  FormGroup,FormControlLabel, Checkbox, Button } from '@material-ui/core';
import ReportMaps from "./report-maps"


const formvalues = {
  _id:0,
  report_type: "",
  hdb_type: "",
  hdb_category: "",
  region: "",
  hdb_estate: "",
  ammenties: {shop: false, mrt: false, school:false,food:false},
  expected_date: new Date(),
  user_id : 0,
  estimated_price:"",
  estimated_tax:"",
  date_generated: new Date(),
  description:"",
  amentiesSel: false
}


function ReportSum(props) {
  const [report, setReport] = useState(formvalues);
  const [isLoading, setLoading] = useState(true);
  const location = useLocation()

  useEffect(() => {
    let id = location.state.report_id
    console.log(location.state.report_id)

     axios.get('http://localhost:5000/report/'+id)
    .then(response => {
      setReport(response.data);
      setLoading(false)
     
    }).catch(function (error) {
      console.log(error);
    })
   

  },[])


  
  useEffect(()=> {
    setReport({...report, user_id :localStorage.getItem('USERID')})
  },[report.user_id])


  useEffect(()=> {
    console.log(report)
    setReport({...report, amentiesSel: location.state.amenSel})
  },[report.amentiesSel])


  
  const onGoBack = (e) => {
    props.history.push('/report/create')
  }



  const onpublish = (e) => {
    if(localStorage.getItem("SESSIONTOKEN") === null) {
      localStorage.setItem('REPORTID', report._id)
      props.history.push('/login')
    }
    else {
      axios.post('http://localhost:5000/report/save',report)
      .then(res => {
        const report_id = res.data._id
        props.history.push('/forum/create/'+report_id)
      })
    }
  }

  if(isLoading) {
    return <div><Typography variant ="h6"> Loading </Typography></div>
  }

  return (
    <div>
      <div >
        <h1  style={{textAlign: "center"}}>Report Analysis </h1>
      </div>
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant ="h6">Report Type: {report.report_type}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant ="h6"> HDB Type: {report.hdb_type} </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant ="h6"> HDB Category: {report.hdb_category}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant ="h6"> Region : {report.region}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant ="h6"> HDB Estate: {report.hdb_estate}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant ="h6"> Expected Date: {new Date(report.expected_date,).toLocaleDateString("en-GB")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant ="h6"> Check Date: {JSON.stringify(report.amentiesSel)}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant ="h6"> Desired Amenties:</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={report.ammenties[0].shop}  name="shop" color="primary" />}
              label="Near Shopping Centre" />
              <FormControlLabel
              control={<Checkbox checked={report.ammenties[0].mrt} name="mrt"  color="primary" />}
              label="Near Mrt" />
              <FormControlLabel
              control={<Checkbox checked={report.ammenties[0].school}  name="school"  color="primary" />}
              label="Near School" />
              <FormControlLabel
              control={<Checkbox checked={report.ammenties[0].food}name="food"   color="primary"/>}
              label="Great Food" />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Typography variant ="h6">Estimated Price: ${report.estimated_price} </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant ="h6"> Estimated Annual Tax: ${report.estimated_tax} </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant ="h6"> Method of Calculation: {report.description} </Typography>
          </Grid>
          <Grid item xs={12}>
            <ReportMaps estate = {JSON.stringify(report.hdb_estate)} amen = {report.amentiesSel}></ReportMaps>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" type="submit" fullWidth onClick={onGoBack}>
              Generate Report
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" type="submit" fullWidth onClick={onpublish}>
              Publish Report
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default withRouter(ReportSum)
