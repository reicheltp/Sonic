/**
 * Created by Paul on 23-Apr-17.
 */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  githubId: Number,
  fullName: String,
  pic: String,
  githubToken: String,
  githubRefresh: String,
});

export const User = mongoose.model('User', userSchema);
