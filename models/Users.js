const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

// Calculate total friend count
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const Users = model('users', userSchema);

module.exports = Users
