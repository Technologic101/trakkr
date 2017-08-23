import * as mongoose from 'mongoose';
import jwt = require("jsonwebtoken");

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type:String,
    required: true
  },
  email: {
    type:String,
    required: true
  },
  access_token: {
    type:String
  },
  id: {
    type:String,
    required: true
  },
  /*current_group_id: {
    type:Number
  },*/
  user_role: {
    type:String
  }
});

userSchema.method('generateJWT', function() {
  return jwt.sign({
    id: this._id,
    name: this.name,
    email: this.email,
    access_token: this.access_token,
    user_role: this.user_role
  }, process.env.SECRET_KEY);
});

let User = mongoose.model('User', userSchema);

export default User;
