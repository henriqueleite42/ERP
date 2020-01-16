const config = require(''); // Importa as Configurações Globais
const mongoose = require(config.mongodb);

const importErrorModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: Number,
        required: true,
        enum: [
            1, // Product
            2, // Grid
            3, // Category
            4, // Order
            5  // Property
        ]
    },
    refId: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('importError', 'importErrorModel');