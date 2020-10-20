const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({

    comment: {
        type:String, required: true
    },
    no_of_upvotes:
    {
        type:Number
    },
     user_id:
     {type: Schema.Types.ObjectId, ref:'user', required:true},
     replies:
     [{type:Schema.Types.ObjectId, ref:'comment'}],
     date_posted : {
         type:Date
     }
}, {
        timestamps: true,
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
