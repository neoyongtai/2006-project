const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
  post_id:{
    type: Number,
    required:true,
    unique: true
  },
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

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
