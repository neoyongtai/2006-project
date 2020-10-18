const router = require('express').Router();
let Comment = require('../models/comment.model');

router.route('/add').post((req, res) => {
  const post_id = Number(req.body.post_id);
  const username = req.body.username;
  const description = req.body.description;


  const newComment = new Comment({post_id,username,description});

  //Save to database
  newComment.save()
    .then(() => res.json('Comment added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get/:id').get((req, res) =>
{
    Comment.find({post_id:req.params.id})
    .then(comment => res.json(comment))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req, res) =>
{
    Comment.findById(req.params.id)
    .then(comment => res.json(comment))
    .catch(err => res.status(400).json('Error: '+ err));
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
      comment.username = req.body.username
      comment.description = req.body.description

    comment.save()
    .then(()=> res.json('Comment Updated!'))
    .catch(err => res.status(400).json('Error: ' +err));

    })
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;