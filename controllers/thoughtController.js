const { Thoughts, Users } = require('../models');

module.exports = {
    // Get all Thoughts - /api/thoughts
    getThoughts(req, res) {
        Thoughts.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single Thought - /api/thoughts/:id
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thoughts with that ID' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        console.log(req.body);
        Thoughts.create(req.body)
            .then((thoughts) => {
                return Users.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thoughts._id } },
                    { new: true }
                );
            })
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a thought
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.id })
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Update thought
    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            { $set: body },
            { runValidators: true, new: true }
        )
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add Reaction
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thoughts => {
                if (!thoughts) {
                    res.status(404).json({ message: 'No thought with this id' });
                    return;
                }
                res.json(thoughts);
            })
            .catch(err => res.status(500).json(err));
    },
    // Delete Reaction
    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then(thoughts => {
                if (!thoughts) {
                    res.status(404).json({ message: 'No thought with this id' });
                    return;
                }
                res.json(thoughts);
            })
            .catch(err => res.status(500).json(err));
    },
};
