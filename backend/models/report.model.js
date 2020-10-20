const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportSchema = new Schema({

    report_type:{
        type:String,
        required: true,
    },
    expected_date :{
        type: Date, required: true
    },
    type_of_house: {
        type:String, required: true
    },
    region:{
        type:String, required: true
    },
    residential_area: {
        type:String, required: true
    },
    estimated_price: {
        type: Number
    },
    estimated_tax: {
        type:Number
    },
    description: {
        type:String, required: true
    },
    user_id:{type:Number, ref:'user', required:true},
    date_generated: {
        type:Date
    },

},
{
        timestamps: true,

});

const Report = mongoose.model('report', reportSchema);

module.exports = Report;

