const Song = require('../models/musicModel');

// Get all songs
exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (err) {
    console.error('Error fetching songs:', err.message);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
};

// Get a single song by ID
exports.getSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.status(200).json(song);
  } catch (err) {
    console.error('Error fetching song:', err.message);
    res.status(500).json({ error: 'Failed to fetch song' });
  }
};

// Create a new song
// Create a new song
exports.createSong = async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    console.error('Error creating song:', err.message);
    // ✅ surface validation message to the client
    const validation =
      err?.errors
        ? Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v.message]))
        : undefined;
    res.status(400).json({ error: err.message, validation });
  }
};

// Update a song by ID
exports.updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.status(200).json(song);
  } catch (err) {
    console.error('Error updating song:', err.message);
    res.status(400).json({ error: 'Failed to update song' });
  }
};

// Delete a song by ID
exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.status(200).json({ message: 'Song deleted successfully' });
  } catch (err) {
    console.error('Error deleting song:', err.message);
    res.status(500).json({ error: 'Failed to delete song' });
  }
};

// Get statistics about songs
exports.getStats = async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const artists = await Song.distinct('artist');
    const albums = await Song.distinct('album');
    const genres = await Song.distinct('genre');

    // Songs per genre
    const songsPerGenre = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } }
    ]);

    // Songs & albums per artist
    const songsPerArtist = await Song.aggregate([
      { $group: { _id: '$artist', songsCount: { $sum: 1 }, albums: { $addToSet: '$album' } } }
    ]);

    // Songs per album
    const songsPerAlbum = await Song.aggregate([
      { $group: { _id: '$album', songsCount: { $sum: 1 } } }
    ]);

    res.status(200).json({
      totalSongs,
      totalArtists: artists.length,
      totalAlbums: albums.length,
      totalGenres: genres.length,
      songsPerGenre,
      songsPerArtist,
      songsPerAlbum
    });
  } catch (err) {
    console.error('Error generating stats:', err.message);
    res.status(500).json({ error: 'Failed to generate statistics' });
  }
};
