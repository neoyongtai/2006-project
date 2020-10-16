const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
  comment_id:{
      type: Number,
      required:true,
      unique: true
  },
    username:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        minlength : 3
    },
    description: {
        type:String, required: true
    }
}, {
        timestamps: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
