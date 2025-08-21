const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/musicdb';
mongoose.connect(MONGO_URI).then(() => console.log('Mongo connected'));

const SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Song', SongSchema);
