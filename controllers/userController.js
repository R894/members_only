const { body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport')


// Handle User create form on GET.
exports.user_create_get = asyncHandler(async (req, res, next) => {
	res.render('register', { title: 'Register new Member'});
});

// Handle User create form on POST.
exports.user_create_post = [
    // Validate and sanitize the First Name field.
    body("firstname", "First name must contain at least 3 characters")
      .trim()
      .isLength({ min: 3 })
      .escape(),

    // Validate and sanitize the Last Name field.
    body("lastname", "Last name must contain at least 3 characters")
      .trim()
      .isLength({ min: 3 })
      .escape(),

    // Validate and sanitize the Email field.
    body("email", "Email name must contain at least 3 characters")
      .trim()
      .isLength({ min: 3 })
      .escape(),


    // Validate and sanitize the password fields.
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    body('confirmpassword').custom((value, { req }) => {
        // Check if the value of 'confirmpassword' matches 'password'
        if (value !== req.body.password) {
          throw new Error('Passwords must match');
        }
        return true; // Indicates the validation passed
    }),

    // Process request after validation and sanitization.

    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render("register", {
          title: "Register new Member",
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.
        // Check if User with same name already exists.
        const userExists = await User.findOne({ username: req.body.username }).exec();
        if (userExists) {
          // User exists, redirect to its detail page.
          res.render("register", {
            title: "Register new Member",
          });
          return;
        }

        // Hash the password using bcrypt.
        const saltRounds = 10; // Adjust the number of salt rounds as needed
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        
        // Create a user object with escaped and trimmed data.
        const user = new User({ 
          first_name: req.body.firstname,
          last_name: req.body.lastname,
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
        });

        await user.save();
        // New User saved. Redirect to genre detail page.
        res.redirect("/");
        
      }
    }),
  ];

// Handle user login on GET
exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render('login', { title: 'Log In'});
});

// Handle user login on POST
exports.user_login_post = 
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/register"
})

// Handle user logout on GET
exports.user_logout_get = (req,res,next) => {
  req.logout((err) => {
    if (err){
      return next(err);
    }
    res.redirect("/");
  })
}
  