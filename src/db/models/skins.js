const mongoose = require("mongoose");
const validator = require("validator");

const skinsSchema = new mongoose.Schema({

    gameName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    gameLink: {
        type: String,
        required: true,
        validate: (value) => {
            return validator.isURL(value);
        }
    },
    publishedBy: {
        type: String,
        required: true,
    },
    downloads: {
        type: Number,
        required: true,
        default: 0,
    },
    uploadTime: {
        type: Date,
        default: Date.now,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: (value) => {
            return validator.isURL(value);
        }
    },
})

//Creating collection
const Skins = new mongoose.model('Skins', skinsSchema);
module.exports = Skins;