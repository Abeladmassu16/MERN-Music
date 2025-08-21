const express = require('express');
const {
  getSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
  getStats
} = require('../controllers/songController');

const router = express.Router();

// Get statistics
router.get('/stats/all', getStats);

// Get all songs
router.get('/', getSongs);

// Get a single song by ID
router.get('/:id', getSong);

// Create a new song
router.post('/', createSong);

// Delete a song by ID
router.delete('/:id', deleteSong);

// Update a song by ID
router.patch('/:id', updateSong);

module.exports = router;
