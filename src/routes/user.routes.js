const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Middleware para chequear si el usuario esta autenticado
const getUser = async (req, res, next) => {
    let user;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'El ID del usuario es invalido' });
    }
    try {
        user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'Uuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    req.user = user;
    next();
}

//get de todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        console.log('trae todos los users: ', users);
        if(users.length === 0) {
            return res.status(204).json([]);
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//crear un usuario
router.post('/', async (req, res) => {
    const { nombre, edad, email } = req?.body
    if(!nombre || !edad || !email) {
        return res.status(400).json({ message: 'Faltan datos para crear el usuario' });
    }
    const user = new User({ nombre, edad, email });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
