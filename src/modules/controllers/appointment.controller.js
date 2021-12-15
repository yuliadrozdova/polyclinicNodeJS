const Trick = require("../../db/models/appointmentModel");

//get all Tricks +
module.exports.getAllTricks = (req, res, next) => {
    Trick.find().then(result => {
        res.send({data: result});
    });
}

//create Trick +
module.exports.createTrick = (req, res, next) => {
    const {namePatient, nameDoctor, date, textComplaints} = req.body;
    const newTrick = new Trick({namePatient, nameDoctor, date, textComplaints});
    newTrick.save().then(result => {
        res.send({data: result});
    }).catch(err => console.log(err))
}

//delete trick +
module.exports.deleteTrick = (req, res, next) => {
    const deleteTrick = Trick.deleteOne( { _id : req.params.id }  );
    deleteTrick.then(result => {
        res.send({data: result});
    }).catch(err => console.log(err))
}



//update Trick -
module.exports.updateTrick = (req, res, next) => {
    const {namePatient, nameDoctor, dateAppointment, complaints} = req.body;

    const updateTrick = Trick.updateOne({namePatient, nameDoctor, dateAppointment, complaints});
    updateTrick.save().then(result => {
        res.send({data: result});
        console.log(result);
    }).catch(err => console.log(err))
}