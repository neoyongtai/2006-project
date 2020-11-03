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
    ammenties: {shop: false , mrt: false, school:false, food:false}, 
    expected_date: new Date(),
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
          <MenuItem value={`OneRoom`}>1-Room </MenuItem>
          <MenuItem value={`TwoRoom`}>2-Room </MenuItem>
          <MenuItem value={`ThreeRoom`}>3-Room</MenuItem>
          <MenuItem value={`FourRoom`}>4-Room</MenuItem>
          <MenuItem value={`FiveRoom`}>5-Room</MenuItem>
          <MenuItem value={`Executive`}>Executive Flat</MenuItem>
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
          <MenuItem value={`ANG_MO_KIO`}>Ang Mo Kio</MenuItem>
          <MenuItem value={`BUKIT_TIMAH`}>Bukit Timah</MenuItem>
          <MenuItem value={`BUKIT_PANJANG`}>Bukit Panjang</MenuItem>
          <MenuItem value={`BUKIT_MERAH`}>Bukit Merah</MenuItem>
          <MenuItem value={`BEDOK`}>Bedok</MenuItem>
          <MenuItem value={`BISHAN`}>Bishan</MenuItem>
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