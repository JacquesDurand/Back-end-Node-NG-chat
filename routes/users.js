var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user.controller');

router.get('/', user_controller.users_get_all);

router.get('/:id', user_controller.users_get_by_id);

router.post('/add', user_controller.user_add);

router.delete('/delete/:id', user_controller.user_delete_by_id);

router.put('/update/:id', user_controller.user_update);

router.post('/signin', user_controller.user_signin);

router.post('/login', user_controller.user_login);

router.post('/updatePW/:id', user_controller.change_password);

module.exports = router;
