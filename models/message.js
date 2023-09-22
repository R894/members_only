const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;