const { Schema, model, Types } = require('mongoose');
// Require moment to convert time
const moment = require('moment');
// Create reaction schema 
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        uername: [{
            type: String,
            required: true,
        }],
        createdAt: [{
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

module.exports = reactionSchema;