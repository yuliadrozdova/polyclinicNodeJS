const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
const userRoutes = require("./src/routes/user.routes");
const appointmentRoutes = require("./src/routes/appointment.routes");

mongoose.connect("mongodb+srv://user_01:CK9qTqZ5@cluster0.ijpew.mongodb.net/PolyclinicAppDB?retryWrites=true&w=majority");

app.use(userRoutes);
app.use(appointmentRoutes)

app.listen(4000, () =>{
    console.log('Example app listening on port 4000')
});