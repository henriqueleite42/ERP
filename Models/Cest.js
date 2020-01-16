const config = require(''); // Importa as Configurações Globais
const mongoose = require(config.mongodb);

const cestModel = new mongoose.Schema({
    cest: {
        type: Number,
        required: true,
        minlenght: 8,
        maxlenght: 8,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minlenght: 3,
        maxlenght: 100,
        unique: true
    }
});

module.exports = mongoose.model('cest', 'cestModel');
