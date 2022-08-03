const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers) //
    .post(createUser) //add a user

router
    .route('/:userId')
    .get(getUserById) // get a user by id
    .put(updateUser) //update a users
    .delete(removeUser) //delete a user

router
    .route('/:userId/friends/:friendId')
    .post(addFriend) //add a new friend
    .delete(removeFriend) //delete a friend

module.exports = router;