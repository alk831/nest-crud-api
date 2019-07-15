import * as mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema({
  _id: String,
  note: String,
  created_at: String,
  link: String,
  color: String,
  url: String,
  creator: {
    id: String,
    first_name: String,
    last_name: String,
    url: String,
  },
  image: {
    original: {
      url: String,
      width: Number,
      height: Number,
    }
  }
}, { _id: false });

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export const FavoriteCardSchema = new mongoose.Schema({
  cardId: {
    type: String,
    ref: 'CardSchema'
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'UserSchema'
  }
});

export const Card = mongoose.model('Card', CardSchema);
export const User = mongoose.model('User', UserSchema);
export const FavoriteCard = mongoose.model('FavoriteCard', FavoriteCardSchema);