const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');
 
const Contact = require('../models/Contacts');

router.post('/', async (req, res) => {

    try {
  
      const { name, email, message } = req.body;
   
      // Verifica se todos os campos obrigatórios foram preenchidos
  
      if (!name || !email || !message) {
  
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  
      }
   
      // Cria o novo menssagem
  
      const newContact = await Contact.create({ name, email, message});
   
      // Retorna os dados 
  
      const { id } = newContact;
  
      res.status(201).json({ name, email, message });
  
    } catch (error) {
  
      console.error('Erro ao criar contato:', error);
  
      res.status(500).json({ message: 'Erro interno do servidor.' });
  
    }
  
  });
   
  // ✅ Listar todos os usuários
  
  router.get('/', async (_req, res) => {
  
    try {
  
      const contacts = await Contact.findAll({
  
        attributes: ['id', 'name', 'email', 'message', 'createdAt', 'updatedAt']
  
      });
  
      res.json(contacts);
  
    } catch (error) {
  
      res.status(500).json({ message: 'Erro interno do servidor.', error });
  
    }
  
  });
   
  // ✅ Buscar menssagem por ID
  
  router.get('/:id', async (req, res) => {
  
    try {
  
      const contact = await Contact.findByPk(req.params.id, {
  
        attributes: ['id', 'name', 'email', 'menssage', 'createdAt', 'updatedAt']
  
      });
   
      if (!contact) {
  
        return res.status(404).json({ message: 'Menssagem não encontrada.' });
  
      }
   
      res.json(contact);
  
    } catch (error) {
  
      res.status(500).json({ message: 'Erro interno do servidor.', error });
  
    }
  
  });
   
  module.exports = router;
  
   