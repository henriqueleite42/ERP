const config = require(''); // Importa as Configurações Globais
const mongoose = require(config.mongodb);
const g = require('General'); // Importa as Funções Gerais

const imgSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true,
        select: false
    },
    type: {
        type: String,
        required: true,
        select: false
    },
    order: {
        type: Number,
        required: true,
        select: false,
        validate: {
            validator: value => g.isInt(value)
        }
    }
});

const productModel = new mongoose.Schema({
    sku: {                          // Codigo do Produto
        type: String,
        unique: true,
        required: true,
        maxlenght: 15,
        select: false
    },
    name: {                         // Nome do Produto
        type: String,
        required: true,
        maxlenght: 100,
        select: false
    },
    inative: {                      // Flag de Inativo
        type: Boolean,
        defalt: false,
        select: false
    },
    deleted: {                      // Flag de Deletado
        type: Boolean,
        defalt: false,
        select: false
    },
    slug: {                         // Link do Produto
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        select: false
    },
    description: {                  // Descrição do Produto
        type: String,
        maxlenght: 1000,
        default: '',
        select: false
    },
    gtin: {                         // Codigo de Barras
        type: String,
        default: '',
        maxlenght: 14,
        select: false,
        validate: {
            validator: value => g.isInt(value)
        }
    },
    weight: {                       // Peso do Produto
        type: Number,
        min: 0,
        default: 0,
        select: false
    },
    height: {                       // Altura do Produto
        type: Number,
        min: 0,
        default: 0,
        select: false
    },
    length: {                       // Comprimento do Produto
        type: Number,
        min: 0,
        default: 0,
        select: false
    },
    width: {                        // Profundidade do Produto
        type: Number,
        min: 0,
        default: 0,
        select: false
    },
    videos: [{                      // Links dos Videos do Produto
        type: String,
        limit: 100,
        select: false
    }],

    images: [imgSchema],            // Imagens

    variants: [{                    // Variações
        options: [{                 // ID das Variações das Grades
            type: mongoose.Schema.Types.ObjectId,
            ref: 'grid_variant',
            autopopulate: true,
            select: false
        }],
        images: [imgSchema]
    }],
    categories: [{                  // Categorias
        catId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            select: false
        },
        principal: {
            type: Boolean
        }
    }],

    ncm: {                          // ID do NCM
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ncm',
        autopopulate: true,
        select: false
    },
    cest: {                         // ID do CEST
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cest',
        autopopulate: true,
        select: false
    },
    groupId: {                      // ID do Usuario
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
    },
    grid: [{                        // IDs das Grades
        type: mongoose.Schema.Types.ObjectId,
        ref: 'grid',
        select: false
    }],
    related: [{                     // IDs dos Produtos Relacionados
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        select: false
    }],
    properties: [{                  // IDs das Caracteristicas
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property',
        select: false
    }]
});

module.exports = mongoose.model('product', 'productModel');
