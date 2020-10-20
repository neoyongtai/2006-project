const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({


    title: {
        type:String, required: true
    },
    description: {
        type:String, required: true
    },
    no_of_comments: { type: Number
    },
    no_of_upvotes: { type: Number
    },
    images: {
        type:Buffer
    },
    user_id:     {type: Schema.Types.ObjectId, ref:'user', required:true},
    report_id: {type: Schema.Types.ObjectId, ref:'report', required:true},
    comment_id: [{type:Schema.Types.ObjectId, ref:'comment'}],
    date_posted: {
        type:Date
    }
  },
  {
    timestamps: true,
  });

const Post = mongoose.model('post', postSchema);

module.exports = Post;
