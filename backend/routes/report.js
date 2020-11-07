const router = require('express').Router();
let Report = require('../models/report.model');
let calculatePrice =  require('../services/CalculatePrice.js')
let getKml =  require('../services/readkml.js')

const mongoose = require('mongoose')


let estimated_price;
let estimated_tax;
let kml;

//Query all reports
router.route('/').get((req, res) => {
    Report.find() //Mongoose method
    .then(report => res.json(report))//Return the report
    .catch(err => res.status(400).json('Error: ' + err));
});

//Query Respective Boundaries Coordinates of the Selected HDB Estate
router.route('/map/:id').get(async (req,res)=>
{

        try{
            kml = await getKml.getKML(req.params.id)
            console.log(kml)
            res.json(kml)
        }catch(err)
        {
            console.log(err)
    }
})


//Add a newly Generated Report into Database
 router.route('/add').post(async (req, res,next) => {
 try{
    estimated_price = await calculatePrice.getData(req.body.hdb_estate,req.body.hdb_category)
    estimated_tax = await calculatePrice.getTax(req.body.hdb_category)
 }catch(err)
 {
     console.log(err)
 }

  estimated_price = parseInt(estimated_price,10)
  const report_type = req.body.report_type;
  const hdb_type = req.body.hdb_type
  const hdb_category = req.body.hdb_category
  const region = req.body.region
  const hdb_estate = req.body.hdb_estate
  const ammenties = req.body.ammenties
  const date_generated = Date.now()
  const expected_date = Date.parse(req.body.expected_date)
  const description = "The report is generated based on the parameters filled up. The tax calculation is based on Estimated Annual Value of the HDB Flat. The Estimated Price is based on the estate, type of Room, Amenties and the HDB Price Index."
  const newReport = new Report({report_type,hdb_type,hdb_category,region,hdb_estate,ammenties,description,expected_date,estimated_price,estimated_tax,date_generated});
  //Save to database
  newReport.save()
    .then(() => {
      res.json(
        {
          report: newReport,
          success: true,
          message: "Generated"
        })
    })
    .catch(err => res.send({success: false, message: "Fill in required fields"}));
});


router.route('/:id').get((req, res) =>
{
    Report.findById(req.params.id)
    .then(report => res.json(report))
    .catch(err => res.status(400).json('Error: '+ err));
});



router.route('/save/public/:id').post((req, res) =>
{
    Report.findById(req.params.id)
    .then(report => {
    console.log(report)
    report.user_id = req.body.user_id

    report.save()
    .then(()=> res.json(report))
    .catch(err => res.status(400).json('Error: ' +err));

    })
    .catch(err => res.status(400).json('Error: '+ err));
});




//Tie the generated report to a user ID.
router.route('/save').post((req, res) =>
{
    console.log("ID is")
    console.log(req.body._id)
    console.log(req.body.user_id)
    Report.findById(req.body._id)
    .then(report => {
    console.log(report)
    report.user_id = req.body.user_id

    report.save()
    .then(()=> res.json(report))
    .catch(err => res.status(400).json('Error: ' +err));

    })
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;
