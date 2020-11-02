const router = require('express').Router();
let Report = require('../models/report.model');
const { promisify } = require('util');
let calculatePrice =  require('../services/CalculatePrice.js')
let getKml =  require('../services/readkml.js')

const { route } = require('./users');
const mongoose = require('mongoose')


let estimated_price;
let estimated_tax;
let kml;


router.route('/').get((req, res) => {
    Report.find() //Mongoose method
    .then(report => res.json(report))//Return the report
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/map/:id').get(async (req,res)=> 
{

    
        try{
            console.log("Backend Node JS Server")
            console.log(req.params)
            console.log(req.params.id)
            kml = await getKml.getKML(req.params.id)
            console.log(kml)
            res.json(kml)
        }catch(err)
        {
            console.log(err)
    
    
    }
})


 router.route('/add').post(async (req, res,next) => {
 console.log("Awating Now")
 try{ 
    estimated_price = await calculatePrice.getData(req.body.hdb_estate,req.body.hdb_category)
    estimated_tax = await calculatePrice.getTax(estimated_price)
    //kml = await getKml.getKML(req.body.hdb_estate)
   //console.log("This is from the await " + estimated_price)
 }catch(err)
 {
     console.log(err)
 }

 //console.log("This is the estimated Price")
 //console.log(estimated_price)
//console.log("Finsh Waiting")
  estimated_price = parseInt(estimated_price,10)
  const report_type = req.body.report_type;
  const hdb_type = req.body.hdb_type
  const hdb_category = req.body.hdb_category
  const region = req.body.region
  const hdb_estate = req.body.hdb_estate
  const ammenties = req.body.ammenties
  const date_generated = Date.now()
  const expected_date = Date.parse(req.body.expected_date)
  const description = "this is the description"
  const newReport = new Report({report_type,hdb_type,hdb_category,region,hdb_estate,ammenties,description,expected_date,estimated_price,estimated_tax,date_generated});
  console.log(newReport)

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


// Save or publish post
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