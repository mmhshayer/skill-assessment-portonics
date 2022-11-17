import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a user name!'],
    unique: [true, 'Username Exist'],
  },

  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    unique: false,
  },
});

export const User = mongoose.model('Users', UserSchema);
