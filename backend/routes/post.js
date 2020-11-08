const router = require('express').Router();
let Post = require('../models/post.model');
let Report = require('../models/report.model');

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

router.route('/postreport').get((req, res) => {
  Post.find()
  .populate({path: 'report_id'})
  .then(results => {return res.send(results)})
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  if(req.body.title == " " || req.body.description == " ")
  {
    res.send({success: false, message: 'Title and Description cannot be empty!'})
  }
  else
  {


    const title = req.body.title;
    const username = req.body.username;
    const user_id = req.body.user_id
    const report_id = req.body.report_id
    const date_posted = Date.now()
    const description = req.body.description;
    if(title.length > 100)
    {
      return res.send({
        success: false,
        message: 'Title must be less than 100 characters.'
      });
    }

    if(description.length > 5000)
    {
      return res.send({
        success: false,
        message: 'Post Description must be less than 5000 characters.'
      });
    }

    const newPost = new Post({title,username,description,user_id,report_id,date_posted});

    //Save to database
    newPost.save()
      .then(() => res.send({success: true, message: 'Post Added!'}))
      .catch(err => res.status(400).json('Error: ' + err));
  }
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


router.route('/update/upvote/:id').post((req, res) => {

  Post.findOneAndUpdate({_id: req.params.id},
    {
    $set: {no_of_upvotes: req.body.no_of_upvotes}
  }, (err, post) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Failed to upvote'
      });
    }
      return res.send({
        success: true,
        message: 'Upvoted'
    })
  });
});




router.route('/update/upcomment/:id').post((req, res) => {

  console.log("NODE")
  console.log(req.body.no_of_comments)
  console.log("POST ID")
  console.log(req.params.id)

  Post.findOneAndUpdate({_id: req.params.id},
    {
      $inc: { no_of_comments: 1 }
  }, (err, post) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Failed to up comment count'
      });
    }
      return res.send({
        success: true,
        message: 'Up comment count'
    })
  });
});


router.route('/update/downcomment/:id').post((req, res) => {


  Post.findOneAndUpdate({_id: req.params.id},
    {
      $inc: { no_of_comments: -1 }
  }, (err, post) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Failed to up comment count'
      });
    }
      return res.send({
        success: true,
        message: 'down comment count'
    })
  });
});

module.exports = router;
