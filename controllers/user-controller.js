const {User} = require('../models')

const userController = {
    // Retrieval
    getAllUsers(req,res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.status(200).json(dbUserData))
            .catch(err => {
                res.status(400).json(err);
            });
    },
    getUserById({params}, res) {
        User.findOne({_id: params.userId})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'User does not exist'})
                    return;
                }
                res.status(200).json(dbUserData)
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    // USER Crud
    createUser({body}, res) {
        User.create(body)
            .then(dbUserData => res.status(200).json(dbUserData))
            .catch(err => res.status(400).json);
    },

    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.userId}, body , {new:true, runValidators: true})
            .then(dbUserDate => {
                if (!dbUserDate) {
                    res.status(404).json({message: 'User does not exist'});
                    return;
                }
                res.status(200).json(dbUserDate);
            })
            .catch(err => res.status(400).json(err));
    },

    removeUser({params}, res) {
        User.findOneAndDelete({_id: params.userId})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'User does not exist'});
                    return;
                }
                res.status(200).json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // User Friends
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    },

    removeFriend({params},res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull:  {friends: params.friendId}},
            {new: true}
        )
            .then(dbUserDate => {
                if (!dbUserDate) {
                    res.status(404).json({message: 'Friend does not exist'});
                    return;
                }
                res.status(200).json(dbUserDate);
            })
            .catch(err => res.status(400).json(err));
    }

};

module.exports = userController;