const router = require('express').Router();
let Report = require('../models/report.model');
const { route } = require('./users');
const mongoose = require('mongoose')



router.route('/').get((req, res) => {
    Report.find() //Mongoose method
    .then(report => res.json(report))//Return the report
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  const report_type = req.body.report_type;
  const hdb_type = req.body.hdb_type
  const hdb_category = req.body.hdb_category
  const region = req.body.region
  const hdb_estate = req.body.hdb_estate
  const ammenties = req.body.ammenties
  const date_generated = Date.now()
  const user_id = req.body.user_id
  const expected_date = Date.parse(req.body.expected_date)
 const estimated_price = 500000
 const estimated_tax = 40000
const description = "this is the description"
  const newReport = new Report({report_type,hdb_type,hdb_category,region,hdb_estate,ammenties,description,expected_date,estimated_price,estimated_tax,date_generated,user_id});

  //Save to database
  newReport.save()
    .then(() => res.json(newReport))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => 
{
    Report.findById(req.params.id)
    .then(report => res.json(report))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) => 
{
    Report.findByIdAndDelete(req.params.id)
    .then(report => res.json("Exercise Deleted"))
    .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/update/:id').post((req, res) => 
{
    Report.findById(req.params.id)
    .then(report => {

    report.report_type = req.body.report_type
    report.expected_date = Date.parse(req.body.expected_date)
    report.type_of_house = req.body.type_of_house
    report.residential_area = req.body.residential_area
    report.description = req.body.description

    report.save()
    .then(()=> res.json('Report Updated!'))
    .catch(err => res.status(400).json('Error: ' +err));

    })
    .catch(err => res.status(400).json('Error: '+ err));
});


module.exports = router;