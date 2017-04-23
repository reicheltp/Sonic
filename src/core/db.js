/**
 * Created by Paul on 23-Apr-17.
 */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  githubId: Number,
  fullName: String,
  pic: String,
});

export const User = mongoose.model('User', userSchema);
