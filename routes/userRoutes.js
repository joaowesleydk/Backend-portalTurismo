const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
 

router.post('/', userController.createUser );
 
router.get('/', userController.listUser);
 
// ✅ Buscar usuário por ID

router.get('/:id', userController.listUserById );
 


router.put('/:id',userController.deleteUser );
 

router.delete('/:id', userController.updateUser);
 
module.exports = router;

 