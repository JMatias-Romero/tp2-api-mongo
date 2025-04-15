const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rutasUsers = require('./routes/user.routes');
const dotenv = require('dotenv').config();

const app = express();

// Middleware parsear el cuerpo
app.use(bodyParser.json());

// conexión con bd
const dbName = process.env.MONGO_DB_NAME;
mongoose.connect(process.env.MONGO_URL, {dbName})
    .then(() => console.log('Conectado a la base de datos en MongoDB'))
    .catch((error) => console.error('Error al conectar a la base de datos MongoDB:', error));

const db = mongoose.connection;

app.use('/users', rutasUsers);

const port = process.env.PORT || 3000;

// Iniciando el servidor
app.listen(port, () => {
    console.log(`el servidor esta corriendo en http://localhost:${port}`);
});