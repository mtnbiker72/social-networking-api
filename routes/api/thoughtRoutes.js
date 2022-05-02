const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users/:id
router.route('/:id').get(getSingleThought).delete(deleteThought).put(updateThought);

// /api/thoughts/thoughtID/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/thoughtID/reactions
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
