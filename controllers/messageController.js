const { body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');
const Message = require('../models/message');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// handle display messages on GET
exports.messages_display_get = asyncHandler(async (req, res, next) => {
    const messages = await Message.find().populate('author', 'first_name last_name').exec();
    res.render('messages', { title: 'Messages', messages: messages, user: req.user });

});

// handle message create form on GET
exports.messages_create_get = asyncHandler((req, res, next) => {
    res.render("messages_form", {title: "Create new Message"});
});

// handle message create form on POST
exports.messages_create_post = [
    body("title", "Title must not be empty")
      .trim()
      .isLength({ min: 1 })
      .escape(),

    body("text", "Text must not be empty")
      .trim()
      .isLength({ min: 1 })
      .escape(),

    asyncHandler(async (req,res,next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            // There are errors, render the form again with error messages
            res.render("messages_form", {
                title: "Create new Message", 
                errors: errors.array()
            });
            return;
        } else {
            // Data is valid, create new message
            const msg = new Message({
                title:req.body.title, 
                text: req.body.text,
                author: req.user._id
            });
            await msg.save();
            res.redirect('/messages');
        }
    })
];

// Handle message detail GET
exports.messages_detail_get = asyncHandler(async (req, res, next) => {
    const msg = await Message.findById(req.params.id).populate('author', 'first_name last_name').exec()
    if(msg){
        res.render('messages_detail', {title: 'Message Detail', message: msg, user: req.user});
    }else{
        res.redirect('/messages');
    }
});

// Handle message delete GET
exports.messages_delete_get = asyncHandler(async (req, res, next) => {
    const msg = await Message.findById(req.params.id).populate('author', 'first_name last_name').exec()
    if(msg){
        res.render('messages_delete', {title: 'Delete message', message: msg, user: req.user});
    }else{
        res.redirect('/messages');
    }
});

// Handle message delete POST
exports.messages_delete_post = asyncHandler(async (req, res, next) => {
    const msg = await Message.findById(req.params.id).populate('author', 'first_name last_name').exec()
    if(msg && req.user.admin){
        await Message.findByIdAndRemove(req.params.id);
        res.redirect('/messages');
    }else{
        res.redirect('/messages');
    }
});
