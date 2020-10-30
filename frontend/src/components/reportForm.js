import { Grid, makeStyles, TextField, InputLabel, Select, MenuItem, FormHelperText, FormLabel, FormGroup,FormControlLabel, Checkbox, Button } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom';
import axios from  'axios';


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
    date_generated: new Date()
}



function ReportForm (props){

    const [values, setValues] = useState(formvalues);
    const classes = useStyles();

    const handleInputChange = e => {

            const name = e.target.name
            console.log(name)
        setValues({
            ...values,
            [name]: e.target.value
            
        })
        console.log(values)
    }

    const handlecheckBox = e => {
        setValues((prevstate)=> {
          return ({
            ...prevstate,
            ammenties : {...prevstate.ammenties,[e.target.name]: e.target.checked}

        })

      })

    }

   const onSubmit = e => 
    {
        e.preventDefault();

        console.log(values)

        axios.post('http://localhost:5000/report/add',values)
        .then(res => {
          console.log("This is the response")
          console.log(res.data) 
          const report_id = res.data._id
          console.log("Report Id : " + report_id) 
          props.history.push('/report/sum/'+report_id)

        }  )

        //console.log(report_id)
        //Redirect after submit to report summary page.
       // this.props.history.push('/report/sum/'+report_id)

    }

    return (
        <form className={classes.root}>
            <div >
            <h1  style={{textAlign: "center"}}>Generate Report</h1>
            </div>
            <Grid container spacing={3} justify="center">
                
        <Grid item xs={12} md = {6}>
            
        <InputLabel id="select-category-label" required={true} style={{marginBottom: "5px"}}>For</InputLabel>
        <Select
          labelId="select-category-label"
          id="Category" //Set
          value={values.report_type}
          onChange={handleInputChange}
          fullWidth
          name="report_type"
          label="select-category-label"
          variant ="outlined"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={`Buy`}>Buy</MenuItem>
          <MenuItem value={`Sell`}>Sell</MenuItem>
        </Select>
            
            </Grid>

            <Grid item xs={12} md = {6}> 
        <InputLabel id="select-occupy-label" required={true} style={{marginBottom: "5px"}}>HDB Category</InputLabel>
        <Select
          labelId="select-occupy-label"
          id="Type-of-occupy" //Set
          value={values.hdb_type}
          onChange={handleInputChange}
          fullWidth
          name="hdb_type"
          label="select-category-label"
          variant ="outlined">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={`BTO`}>BTO</MenuItem>
          <MenuItem value={`Resale`}>Resale</MenuItem>
        </Select>
          </Grid>    




        <Grid item xs={12} md = {6}> 
        <InputLabel id="select-hdb-label" required={true} style={{marginBottom: "5px"}}>HDB Type</InputLabel>
        <Select
          labelId="select-hdb-label"
          id="Type-of-hdb" //Set
          value={values.hdb_category}
          onChange={handleInputChange}
          fullWidth
          name="hdb_category"
          label="select-hdb-label"
          variant ="outlined">
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




        <Grid item xs={12} md = {6}> 
        <InputLabel id="select-region-label" required={true} style={{marginBottom: "5px"}}>Region</InputLabel>
        <Select
          labelId="select-region-label"
          id="region" //Set
          value={values.region}
          onChange={handleInputChange}
          fullWidth
          name="region"
          label="select-region-label"
          variant ="outlined">
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

          
            <Grid item xs={12} md = {6}> 
      <InputLabel id="select-estate-label" required={true} style={{marginBottom: "5px", maxHeight: 10}}>HDB Estate</InputLabel>
        <Select
          labelId="select-estate-label"
          id="hdb_estate" //Set
          value={values.hdb_estate}
          onChange={handleInputChange}
          fullWidth
          name="hdb_estate"
          label="select-estate-label"
          variant ="outlined">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={`Ang Mo Kio`}>Ang Mo Kio</MenuItem>
          <MenuItem value={`Bukit Batok`}>Bukit Batok</MenuItem>
          <MenuItem value={`Bukit Timah`}>Bukit Timah</MenuItem>
          <MenuItem value={`Bukit Panjang`}>Bukit Panjang</MenuItem>
          <MenuItem value={`Bukit Merah`}>Bukit Merah</MenuItem>
          <MenuItem value={`Bedok`}>Bedok</MenuItem>
          <MenuItem value={`Bishan`}>Bishan</MenuItem>
          <MenuItem value={`Clementi`}>Clementi</MenuItem>
          <MenuItem value={`Central Area`}>Central Area</MenuItem>
          <MenuItem value={`Choa Chu Kang`}>Choa Chu Kang</MenuItem>
          <MenuItem value={`Geylang`}>Geylang</MenuItem>
          <MenuItem value={`Hougang`}>Hougang</MenuItem>
          <MenuItem value={`Jurong East`}>Jurong East</MenuItem>
          <MenuItem value={`Jurong West`}>Jurong West</MenuItem>
          <MenuItem value={`Kallang`}>Kallang</MenuItem>
          <MenuItem value={`Marine Parade`}>Marine Parade</MenuItem>
          <MenuItem value={`Pasir Ris`}>Pasir Ris</MenuItem>
          <MenuItem value={`Punggol`}>Punggol</MenuItem>
          <MenuItem value={`Queenstown`}>Queenstown</MenuItem>
          <MenuItem value={`Sembawang`}>Sembawang</MenuItem>
          <MenuItem value={`Sengkang`}>Sengkang</MenuItem>
          <MenuItem value={`Serangoon`}>Serangoon</MenuItem>
          <MenuItem value={`Tampines`}>Tampines</MenuItem>
          <MenuItem value={`Toa Payoh`}>Toa Payoh</MenuItem>
          <MenuItem value={`Woodlands`}>Woodlands</MenuItem>
          <MenuItem value={`Yishun`}>Yishun</MenuItem>
        </Select>
        </Grid>


            <Grid item xs={12} md = {6}> 
            <TextField
                label="Expected Date" variant="outlined"
                fullWidth
                name="expected_date"
                type= 'date'
                InputLabelProps={{shrink:true}}
                value={values.expected_date}
                onChange={handleInputChange}
                />
            </Grid>  




        <Grid item xs={12} md = {6}>
          <FormLabel component = "legend">Pick Desired Ammenties</FormLabel>
          <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={values.ammenties.shop} onChange={handlecheckBox} name="shop" color="primary" />}
            label="Near Shopping Centre"
          />

          <FormControlLabel
            control={<Checkbox checked={values.ammenties.mrt} onChange={handlecheckBox} name="mrt"  color="primary" />}
            label="Near Mrt"
          />

          <FormControlLabel
            control={<Checkbox checked={values.ammenties.hospital} onChange={handlecheckBox} name="hospital"  color="primary" />}
            label="Near Hospital "
          />

          <FormControlLabel
            control={<Checkbox checked={values.ammenties.school} onChange={handlecheckBox} name="school"  color="primary" />}
            label="Near School"
          />

          <FormControlLabel
            control={<Checkbox checked={values.ammenties.food} onChange={handlecheckBox} name="food"   color="primary"/>}
            label="Great Food"
          />
      </FormGroup>
          </Grid>

          <Grid item xs={12} md = {6}>
          <Button variant="contained" color="primary" type="submit" fullWidth onClick={onSubmit}>
                    Generate Report
                  </Button>
                  </Grid>

                        </Grid>
        </form>
    )
}

export default withRouter(ReportForm)