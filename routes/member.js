var express = require('express');
var router = express.Router();
var membershipController = require('../controllers/membershipController');

// member form page GET
router.get('/', membershipController.membership_display_get);

// member form page POST
router.post('/', membershipController.membership_display_post);

module.exports = router;

