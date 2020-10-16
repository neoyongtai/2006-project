const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  post_id:{
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
    title: {
        type:String, required: true
    },
    description: {
        type:String, required: true
    },
    no_of_comments: { type: Number
    },
    no_of_upvotes: { type: Number
    }
  },
  {
    timestamps: true,
  });

const Post = mongoose.model('post', postSchema);

module.exports = Post;
