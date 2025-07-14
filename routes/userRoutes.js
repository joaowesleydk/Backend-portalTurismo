const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//const authMiddleware = require('../middlewares/authMiddleware');
 
const User = require('../models/Users');
//const { default: ModelManager } = require('sequelize/types/model-manager');
 
// ✅ Criar usuário (registro) — público
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
 
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
 
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email já cadastrado.' });
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
 
    const { id } = newUser;
    res.status(201).json({ id, name, email });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
})
 
module.exports = router;
 