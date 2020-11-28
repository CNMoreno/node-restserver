require('./config/config')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// HABILITAR LA CARPETA PUBLIC

app.use(express.static(path.resolve(__dirname, '../public')));

//Configuracion globan de rutas
app.use(require('./routes/index'));

//Conexion base de datos
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        throw err;

    }
    console.log('Base de Datos ONLINE');

});

//Puerto
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
});