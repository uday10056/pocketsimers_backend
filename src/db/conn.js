const mongoose =  require("mongoose");

mongoose.connect("mongodb://localhost:27017/pocketsimers",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB Sucessfully Connected...");
}).catch(()=>{
    console.log("Connection faild..");
})