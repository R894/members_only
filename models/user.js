const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { type:String, required: true },
    last_name: { type:String, required: true },
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    membership_status: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
});

userSchema.virtual('fullname').get(function(){
    return `${this.first_name} ${this.last_name}`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;