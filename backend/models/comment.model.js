const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema

const commentSchema = new Schema({

  post_id: Number,
  comment_id: Number,
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

commentSchema.plugin(AutoIncrement, {id: 'comment_seq', inc_field: 'comment_id'})
const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
