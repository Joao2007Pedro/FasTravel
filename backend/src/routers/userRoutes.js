const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Rotas de usuário
router.post('/', userController.createUser); // cadastro não precisa de token
router.post('/login', require('../controllers/authController').login); // login

// as demais rotas precisam de autenticação
router.get('/', auth, userController.getUsers);
router.get('/:id', auth, userController.getUserById);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
