const Trick = require("../../db/models/appointmentModel");
// let newTrick = '';

//get all Tricks
module.exports.getAllTricks = (req, res, next) => {
    Trick.find().then(result => {
        res.send({data: result});
    });
}

//create Trick
module.exports.createTrick = (req, res, next) => {
    const {namePatient, nameDoctor, date, textComplaints} = req.body;
    console.log('222', namePatient, nameDoctor, date, textComplaints);
    console.log('333', req.body);

    const newTrick = new Trick({namePatient, nameDoctor, date, textComplaints});
    newTrick.save().then(result => {
        res.send('Trick created');
        console.log(result);
    }).catch(err => console.log(err))
}


//update Trick
module.exports.updateTrick = (req, res, next) => {
    const {namePatient, nameDoctor, dateAppointment, complaints} = req.body;

    const newTrick = Trick({namePatient, nameDoctor, dateAppointment, complaints});
    newTrick.save().then(result => {
        res.send('Trick created');
        console.log(result);
    }).catch(err => console.log(err))
}

//delete trick
module.exports.deleteTrick = (req, res, next) => {

    console.log('555 ', req);
    const {namePatient, nameDoctor, dateAppointment, complaints} = req.body;

    const newTrick = Trick.deleteOne({namePatient, nameDoctor, dateAppointment, complaints});
    newTrick.then(result => {
        res.send('Trick created');
        console.log(result);
    }).catch(err => console.log(err))
}

