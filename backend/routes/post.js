const router = require('express').Router();
let Post = require('../models/post.model');
const { route } = require('./users');

router.route('/').get((req, res) => {
    Post.find() //Mongoose method
    .then(post => res.json(post))//Return the post
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const post_id = Number(req.body.post_id);
  const title = req.body.title;
  const username = req.body.username;
  const description = req.body.description;
  const no_of_comments = req.body.no_of_comments;
  const no_of_upvotes = req.body.no_of_upvotes;


  const newPost = new Post({post_id,title,username,description,no_of_comments,no_of_upvotes});

  //Save to database
  newPost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err + newPost.post_id));
});

router.route('/:id').get((req, res) =>
{
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) =>
{
    Post.findByIdAndDelete(req.params.id)
    .then(post => res.json("Exercise Deleted"))
    .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/update/:id').post((req, res) =>
{
    Post.findById(req.params.id)
    .then(post => {

    post.post_id = Number(req.body.post_id)
    post.title = req.body.title
    post.username = req.body.username
    post.description = req.body.description
    post.no_of_comments = req.body.no_of_comments
    post.no_of_upvotes = req.body.no_of_upvotes

    post.save()
    .then(()=> res.json('Post Updated!'))
    .catch(err => res.status(400).json('Error: ' +err));

    })
    .catch(err => res.status(400).json('Error: '+ err));
});


module.exports = router;
