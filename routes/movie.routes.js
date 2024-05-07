const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model.js');

// GET all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific movie
router.get('/:id', getMovie, (req, res) => {
  res.json(res.movie);
});

// CREATE a new movie
router.post('/', async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    year: req.body.year,
    producer: req.body.producer,
    actors: req.body.actors
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a movie
router.patch('/:id', getMovie, async (req, res) => {
  if (req.body.name != null) {
    res.movie.name = req.body.name;
  }
  if (req.body.year != null) {
    res.movie.year = req.body.year;
  }
  if (req.body.producer != null) {
    res.movie.producer = req.body.producer;
  }
  if (req.body.actors != null) {
    res.movie.actors = req.body.actors;
  }

  try {
    const updatedMovie = await res.movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a movie
router.delete('/:id', getMovie, async (req, res) => {
  try {
    await res.movie.remove();
    res.json({ message: 'Deleted Movie' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMovie(req, res, next) {
    try {
      const movie = await Movie.findById(req.params.id);
      if (movie == null) {
        return res.status(404).json({ message: 'Cannot find movie' });
      }
      res.movie = movie;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  

module.exports = router;
