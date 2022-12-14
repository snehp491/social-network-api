const {Schema , model} = require ('mongoose');

const UserSchema = new Schema({
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }, {
        toJSON: {
            virtual: true
        },
        id: false
    }
);

const User = model('User', UserSchema);
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

module.exports = User;