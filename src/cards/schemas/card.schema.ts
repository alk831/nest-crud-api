import * as mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema({
  title: String,
  img: String,
  authorId: String,
  authorName: String,
  authorAvatar: String
});