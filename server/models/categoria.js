const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, 'la descripcion es necesaria']
    },
    usuario: {
        type: ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);