var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
const Message = require('../models/message');


// Home page GET
router.get('/', async function(req, res, next) {
  const messages = await Message.find().populate('author', 'first_name last_name').exec();

  res.render('index', { title: 'Members Only', messages: messages, user: req.user });
});

// Register page GET
router.get('/register', userController.user_create_get);

// Register page POST
router.post('/register', userController.user_create_post);

// Login page GET
router.get('/login', userController.user_login_get)

// Login page POST
router.post('/login', userController.user_login_post)

module.exports = router;
