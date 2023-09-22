var express = require('express');
var router = express.Router();
var messageController = require('../controllers/messageController')

// Middleware function to check if the user is logged in
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      // If the user is authenticated, allow them to continue to the next middleware or route handler
      return next();
    }
    // If the user is not authenticated, redirect them to the login page or display an error message
    res.redirect('/login');
}

// display messages on GET
router.get("/", messageController.messages_display_get);

// display create message form on GET
router.get("/create", ensureAuthenticated, messageController.messages_create_get);

// display create message form on POST
router.post("/create", ensureAuthenticated, messageController.messages_create_post);

// display specific message on GET
router.get("/:id", messageController.messages_detail_get);

// display message delete form on GET
router.get("/:id/delete", messageController.messages_delete_get);

// message delete form on POST
router.post("/:id/delete", ensureAuthenticated, messageController.messages_delete_post);

module.exports = router;
