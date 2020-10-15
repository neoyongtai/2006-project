import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function Filter() {
  return (
    <div>
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField id="outlined-basic"
            label="Residental Area" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <Checkbox color="primary" /> Buy
          </Grid>
          <Grid item xs={6}>
            <Checkbox color="primary" /> Sell
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" style={{minWidth: 120}}>
              <InputLabel>Year</InputLabel>
              <Select label="Year">
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
                <MenuItem value={2018}>2018</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Filter;
