const mongoose =  require("mongoose");

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB Sucessfully Connected...");
}).catch(()=>{
    console.log("Connection faild..");
})