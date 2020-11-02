const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find() //Mongoose method
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res, next) => {
  const { body } = req;
  const {
    username,
    firstname,
    lastname,
    password
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

  User.find({
    username: username
  }, (err, previousUsers) => {
    if (err) {
      return res.send({
          success: false,
          message: res.status(400).json('Error: ' + err)
      });
    } else if (previousUsers > 0) {
      return res.send({
          success: false,
          message: 'Account already exists'
      });
    }

    const newUser = new User();

    newUser.username = username;
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if (err) {
        return res.send({
            success: false,
            message: res.status(400).json('Error: ' + err)
        });
      }
      return res.send({
          success: true,
          message: 'User added!'
      });
    });
  });
}
//module.exports = router;
