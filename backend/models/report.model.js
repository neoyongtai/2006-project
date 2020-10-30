const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportSchema = new Schema({

    report_type:{
        type:String,
        required: true,
    },
    hdb_type: {
        type:String
    },
    hdb_category: {
        type:String, required: true
    },
    region:{
        type:String, required: true
    },
    hdb_estate: {
        type:String, required: true
    },
    ammenties:
    {
            type:Array, required: true
    },
    expected_date :{
        type: Date, required: true
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

