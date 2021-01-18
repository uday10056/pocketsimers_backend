const mongoose = require("mongoose");

const skinsSchema = new mongoose.Schema({

    gameName: {
        type:String,
        required:true,
    },
    title : {
        type:String,
        required:true,
    },
    tags : {
        type:String,
        required:true,
    },
    gameLink : {
        type:String,
        required:true,
    },
    publishedBy : {
        type:String,
        required:true,
    },
    downloads : {
        type:Number,
        required:true,
        default:0,
    },
    uploadTime : {
        type:String,
        required:true,
    },
    imageUrl : {
        type:String,
        required:true,
    },
})

//creating collection
const Skins = new mongoose.model('Skins', skinsSchema);
module.exports = Skins;