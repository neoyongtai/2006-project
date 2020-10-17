const router = require('express').Router();
let Comment = require('../models/comment.model');
const { route } = require('./post');

router.route('/').get((req, res) => {
    Comment.find({"post_id":100}) //Mongoose method
    .then(post => res.json(post))//Return the post
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const post_id = Number(req.body.post_id);
  const comment_id = Number(req.body.comment_id);
  const username = req.body.username;
  const description = req.body.description;


  const newComment = new Comment({post_id,comment_id,username,description});

  //Save to database
  newComment.save()
    .then(() => res.json('Comment added!'))
    .catch(err => res.status(400).json('Error: ' + err + newComment.comment_id));
});

router.route('/:id').delete((req, res) =>
{
    Comment.findByIdAndDelete(req.params.id)
    .then(comment => res.json("Exercise Deleted"))
    .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/update/:id').post((req, res) =>
{
    Comment.findById(req.params.id)
    .then(comment => {
      comment.post_id = Number(req.body.post_id)
      comment.comment_id = Number(req.body.comment_id)
      comment.username = req.body.username
      comment.description = req.body.description

    comment.save()
    .then(()=> res.json('Comment Updated!'))
    .catch(err => res.status(400).json('Error: ' +err));

    })
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;
