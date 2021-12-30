const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
const apiRoutes = require("./src/routes/routes");

const uri = "mongodb+srv://user_01:CK9qTqZ5@cluster0.ijpew.mongodb.net/PolyclinicAppDB?retryWrites=true&w=majority";
mongoose.connect(uri);

app.use("/", apiRoutes);




app.listen(4000, () =>{
    console.log('Example app listening on port 4000')
});