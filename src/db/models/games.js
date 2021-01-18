const mongoose = require("mongoose");
const validator = require("validator");

const games = new mongoose.Schema({
    gameId : {
        type:String,
        required:true,
        unique:[true,"gameId must be Unique"],
    },
    gameName : {
        type:String,
        required:true,
    },
})