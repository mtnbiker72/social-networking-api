const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/userID/friendID
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
