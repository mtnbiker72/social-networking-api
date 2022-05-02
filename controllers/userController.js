const { Users, Thoughts } = require('../models');

module.exports = {
    // Get all Users - /api/users
    getUsers(req, res) {
        Users.find({})
            // .populate({ path: 'thoughts', select: '-__v' })
            // .populate({ path: 'friends', select: '-__v' })
            // .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single User - /api/users/:id
    getSingleUser(req, res) {
        Users.findOne({ _id: req.params.id })
            // .populate({ path: 'thoughts', select: '-__v' })
            // .populate({ path: 'friends', select: '-__v' })
            // .select('-__v')
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
    // Delete a course
    deleteUser(req, res) {
        Users.findOneAndDelete({ _id: req.params.id })
            .then((users) =>
                !users
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(users)
            )
            .then(() => res.json({ message: 'Course and students deleted!' }))
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
                    ? res.status(404).json({ message: 'No course with this id!' })
                    : res.json(course)
            )
            .catch((err) => res.status(500).json(err));
    },
};
