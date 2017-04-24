/**
 * Created by Paul on 23-Apr-17.
 */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  githubId: Number,
  fullName: String,
  pic: String,
  githubToken: String,
  githubName: String,
  githubRefresh: String,
});

export const User = mongoose.model('User', userSchema);

export const Project = mongoose.model('Project', { strict: false });