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
  const expected_date = Date.parse(req.body.expected_date)
  const type_of_house = req.body.type_of_house
  const region = req.body.region
  const residential_area = req.body.residential_area
  const description = req.body.description
  const date_generated = Date.now()
  const user_id = req.body.user_id


  const newReport = new Report({report_type,expected_date,type_of_house,region,residential_area,description,date_generated,user_id});

  //Save to database
  newReport.save()
    .then(() => res.json('Report added!'))
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