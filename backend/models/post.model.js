const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema

const postSchema = new Schema({

  post_id:{
      type: Number
  },
    username:{
        type:String,
        required: true
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

postSchema.plugin(AutoIncrement, {id: 'post_seq', inc_field: 'post_id'})
const Post = mongoose.model('post', postSchema);

module.exports = Post;
