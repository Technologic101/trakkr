"use strict";
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    access_token: {
        type: String
    },
    id: {
        type: String,
        required: true
    },
    user_role: {
        type: String
    }
});
userSchema.method('generateJWT', function () {
    return jwt.sign({
        id: this._id,
        name: this.name,
        email: this.email,
        access_token: this.access_token,
        user_role: this.user_role
    }, process.env.SECRET_KEY);
});
var User = mongoose.model('User', userSchema);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
