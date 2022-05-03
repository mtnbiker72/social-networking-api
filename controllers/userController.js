const { Users, Thoughts } = require('../models');

// This is all under /api/users/
module.exports = {
    // Get all Users 
    getUsers(req, res) {
        Users.find({})
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single User 
    getSingleUser(req, res) {
        Users.findOne({ _id: req.params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then((users) =>
                !users
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(users)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a user
    createUser(req, res) {
        Users.create(req.body)
            .then((users) => res.json(users))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a user 
    deleteUser(req, res) {
        Users.findOneAndDelete({ _id: req.params.id })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user with that ID' })
                }
                else {
                    return Thoughts.deleteMany({ _id: { $in: user.thoughts } })
                    .then(() => {
                        return Users.updateMany({ _id : {$in: user.friends } },
                            { $pull: { friends: req.params.id } }
                        )
                    })
                }
            }
            )
            .then(() => res.json({ message: 'User and associated apps deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Update user
    updateUser(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((course) =>
                !course
                    ? res.status(404).json({ message: 'No User with that ID!' })
                    : res.json(course)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add Friend
    addFriend(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID' })
                : res.json(user)
        )
        .catch(err => res.json(err));
    },
    // Delete Friend
    deleteFriend(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID' })
                : res.json(user)
        )
        .catch(err => res.json(err));
    },


};
