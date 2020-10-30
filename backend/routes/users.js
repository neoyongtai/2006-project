const router = require('express').Router();
const User = require('../models/user.model');
const UserSession = require('../models/usersession.model');

router.route('/').get((req, res) => {
  User.find() //Mongoose method
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res, next) => {
  const { body } = req;
  const {
    username,
    password,
    firstname,
    lastname,
    email
  } = body;

  if (!username){
    return res.send({
      success: false,
      message: 'Username cannot be blank.'
    });
  }
  if (!firstname){
    return res.send({
      success: false,
      message: 'First name cannot be blank.'
    });
  }
  if (!lastname){
    return res.send({
      success: false,
      message: 'Last name cannot be blank.'
    });
  }
  if (!password){
    return res.send({
      success: false,
      message: 'Password cannot be blank.'
    });
  }
  if (!email){
    return res.send({
      success: false,
      message: 'Email cannot be blank.'
    });
  }

  User.find({
    username: username
  }, (err, previousUsers) => {
    if (err) {
      return res.send({
          success: false,
          message: 'Server error'
      });
    } else if (previousUsers > 0) {
      return res.send({
          success: false,
          message: 'Account already exists'
      });
    }

    const newUser = new User();

    newUser.username = username;
    newUser.password = newUser.generateHash(password);
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.email = email;
    newUser.save((err, user) => {
      if (err) {
        return res.send({
            success: false,
            message: 'Server error'
        });
      }
      return res.send({
          success: true,
          message: 'User added!'
      });
    });
  });
});

router.route('/login').post((req, res, next) => {
    const { body } = req;
    const {
      username,
      password
    } = body;

    if (!username){
      return res.send({
        success: false,
        message: 'Username cannot be blank.'
      });
    }
    if (!password){
      return res.send({
        success: false,
        message: 'Password cannot be blank.'
      });
    }

    User.find({
      username: username
    }, (err, users) => {
      if (err) {
        return res.send({
            success: false,
            message: 'Server error'
        });
      }
      if (users.length != 1) {
        return res.send({
            success: false,
            message: 'Invalid user'
        });
      }

      const user = users[0];
      if (!user.validPassword(password)){
        return res.send({
            success: false,
            message: 'Invalid password'
        });
      }

      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
              success: false,
              message: 'Server error'
          });
        }
        return res.send({
            success: true,
            message: 'Signed in',
            token: doc._id
        });
      });
    });
  });

router.route('/verify').get((req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) =>{
      if (err) {
        return res.send({
          success: false,
          message: 'Server error'
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Invalid session'
        });
      } else {
        return res.send({
          success: true,
          message: 'Valid session'
      });
    }
  });
});

router.route('/logout').get((req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted: true
      }
    }, null, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Server error'
        });
      }
        return res.send({
          success: true,
          message: 'Logout Successful'
      })
    });
});

module.exports = router;
