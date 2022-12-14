const {  Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema({
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        }, reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        }, username: {
            type: String,
            required: true
        }, createdAt: {
            type: Date,
            default: Date.now,
            createdAtVal: Date
        }
    }, {
        toJSON: {
            getters: true
        }
    });

const ThoughtSchema = new Schema({
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        }, createdAt: {
            type: Date,
            default: Date.now,
            createdAtVal: Date
        }, username: {
            type: String,
            required: true
        }, reactions: [ReactionSchema]
    }, {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);


const Thought = model('Thought' , ThoughtSchema);
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})
module.exports = Thought;