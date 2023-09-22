const { body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');
const User = require("../models/user");

// membership page GET
exports.membership_display_get = asyncHandler((req, res, next) => {
    res.render('membership', {title: "Membership"});
});

// membership page POST
exports.membership_display_post = 
    asyncHandler(async (req, res, next) => {
        if(req.body.code == process.env.MEMBERSHIP_CODE){
            
            const updatedUser = await User.findOneAndUpdate(
                {_id: req.user._id},
                {membership_status: true},
                {new: true}
            );
            res.redirect("/")
        }
        res.redirect("/membership")
    });