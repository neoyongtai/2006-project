const mongoose = require('mongoose')

const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new Schema({
    _id:Number,

    username:{
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type:String, required: true
    },
    firstname :{
        type:String, required: true
    },
    lastname: {
        type:String, required: true
    },
    email: {
        type:String , required: true
    },
    ban_status: {
        type:Boolean, default: false
    },
    admin_status: {
        type:Boolean, default: false
    },
    no_of_comments:
    {
        type:Number, default: 0
    },
    no_of_posts :
    {
        type:Number, default: 0
    },
    
}, {    _id: false,
        timestamps: true,
});

userSchema.plugin(AutoIncrement)
const User = mongoose.model('user', userSchema);


// To reset the _id counter.
/*User.counterReset('_id', function(err) {
console.log(err);
})*/


module.exports = User;