// --------------- Import Starts-------------
// MongoDb Connection
require("./db/conn");
//External Libraries
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
//  Models
const Skins = require("./db/models/skins");
// --------------- Import Ends-------------

const app = express();
app.use(express.json());
const port = process.env.PORT || 2070;


// -------------  Adding New Skins -------------
app.post("/add", async (req, res) => {
    try {
        const skin = new Skins(req.body);
        await skin.save()
        return res.status(201).send(skin);
    }
    catch (e) {
        return res.status(400).send(e);
    }
});

// ------------- Fetching Individual Skin ---------
app.get("/skin/:id", async (req, res) => {
    try {
        const singleSkinData = await Skins.findById(req.params.id);
        if (!singleSkinData) {
            return res.status(404).send();
        } else {
            return res.send(singleSkinData);
        }
    } catch (e) {
        return res.status(400).send(e);
    }
});

// ----------------- Searching Skins -------------
app.post("/search", async (req, res) => {
    try {
        if (!req.body.title && !req.body.gameName) {
            return res.status(400).send("title and gameName is Required");
        }
        const regex = new RegExp(escapeRegex(req.body.title), 'gi');
        let searchQuery = null;
        searchQuery = req.body.gameName == "all" ? { "title": regex } : { gameName: req.body.gameName, "title": regex };
        const found = await Skins.find(searchQuery);
        if (found.length == 0) {
            return res.status(404).send();
        } else {
            return res.send(found);
        }
    }
    catch (e) {
        return res.status(400).send(e);
    }
});

// ----------------- Popular and Latest Skins -------------
app.get("/", async (req, res) => {
    try {
        const popular = await Skins.find({ isPopular: true });
        const latest = await Skins.find({ isLatest: true });
        const result = [{ section: "Popular", items: popular }, { section: "Latest", items: latest }];
        return res.send(result);
    }
    catch (e) {
        return res.status(400).send(e);
    }
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



// Server listing at port
app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})