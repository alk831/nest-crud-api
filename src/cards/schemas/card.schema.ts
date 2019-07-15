import * as mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema({
  title: String,
  img: String,
  authorId: String,
  authorName: String,
  authorAvatar: String
});

export const FavoriteCardSchema = new mongoose.Schema({
  cardId: String
});