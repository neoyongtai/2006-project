const router = require('express').Router();
let Post = require('../models/post.model');
const UserSession = require('../models/usersession.model');
const User = require('../models/user.model');


router.route('/').get((req, res) => {
    const { query } = req;
    const { username } = query;

    if(!username)
    {
      Post.find((err, posts) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Cannot get posts'
          })
        }
          return res.send({
            success: true,
            message: 'Retrieved All Posts',
            posts: posts
          })
        })
      }
      else
      {
        Post.find({ username: username }, (err, posts) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Cannot get posts'
            })
          }
            return res.send({
              success: true,
              message: 'Retrieved Own Posts',
              posts: posts
            })
          })
        }
      });

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const username = req.body.username;
  const description = req.body.description;
  const no_of_comments = req.body.no_of_comments;
  const no_of_upvotes = req.body.no_of_upvotes;
  const userId = req.body.userId;
  const reportId = req.body.reportId;

  const newPost = new Post({title,username,description,no_of_comments,no_of_upvotes});
  newPost.user_id = userId;
  newPost.report_id = reportId;

  //Save to database
  newPost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
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
    post.no_of_upvotes = req.body.no_of_upvotes
    post.no_of_comments = req.body.no_of_comments

    post.save()
    .then(()=> res.json('Post Updated!'))
    .catch(err => res.status(400).json('Error: ' +err));

    })
    .catch(err => res.status(400).json('Error: '+ err));
});


module.exports = router;
