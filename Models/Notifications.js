const config = require(''); // Importa as Configurações Globais
const mongoose = require(config.mongodb);

const notificationModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 75
    },
    content: {
        type: String,
        required: true,
        maxlength: 150
    },
    created: {
        type: Date,
        required: true
    },
    view: {
        type: Date,
        required: false
    },
    href: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('notification', 'notificationModel');