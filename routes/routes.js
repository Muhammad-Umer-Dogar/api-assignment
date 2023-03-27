const express = require('express')
const router = express.Router()

const {
    addUser,
    getRole,
    changeRole,
    updateUser,
    deleteUser
    } = require('../controllers/controller')

router.route('/addUser').post(addUser);
router.route('/getRole').get(getRole);
router.route('/changeRole').patch(changeRole);
router.route('/updateUser').put(updateUser);
router.route('/deleteUser').delete(deleteUser);

module.exports = router;