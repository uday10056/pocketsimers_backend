const express = require("express");
const bodyParser = require("body-parser");
// imported db conn
require("./db/conn");
// imported skins model
const Skins = require("./db/models/skins");
const app = express();
const port = process.env.PORT || 2070;
app.use(bodyParser.json());

// adding new skin
app.post("/add",(req,res)=>{
    console.log(req.body);
    const skin = new Skins(req.body);
    console.log(skin);
    skin.save().then(()=>{
        res.status(201).send(skin);
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

// getting individual skins data
app.get("/skin/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        console.log(_id);
        const singleSkinData = await Skins.findById(_id);
        if(!singleSkinData){
            return res.status(404).send();
        }else{
            console.log(singleSkinData);
            res.send(singleSkinData);
        }
    }catch(e){
        res.send(e);
    }
});

// getting all skins data
app.get("/allskins", async(req,res)=>{
    try{
        const allSkinsData = await Skins.find();
        res.send(allSkinsData) 
    }catch(e){
        res.send(e);
    }
});

// searching skin
app.post("/search", (req, res) =>{
    console.log(req.body.title);
    if (req.body.title && req.body.gameName) {
       const regex = new RegExp(escapeRegex(req.body.title), 'gi');
       let searchQuery = null;
       if(req.body.gameName == "all"){
           searchQuery = {"title": regex }
       }
       else{
           searchQuery = {gameName:req.body.gameName, "title": regex }
       }
       Skins.find(searchQuery, (err, found)=> {
           if(err) {
               console.log(err);
           } else {
              res.send({op:found});
           }
       }); 
    }
    else{
        res.status(400).send("title and gameName is Required");
    }
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



// server listing at port
app.listen(port,()=>{
    console.log(`Server running on port ${port}...`)
})