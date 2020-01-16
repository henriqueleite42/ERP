const config = require(''); // Importa as Configurações Globais
const mongoose = require(config.mongodb);

const ncmModel = new mongoose.Schema({
    ncm: {
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
    },
    cestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cest'
    }
});

module.exports = mongoose.model('ncm', 'ncmModel');
