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
module.exports.updateTrick = async (req, res, next) => {
    const params = req.body;

    try {
        const updateTrick = await Trick.updateOne({namePatient: params.namePatient,
                nameDoctor: params.nameDoctor,
                date: params.date,
                textComplaints: params.textComplaints
            },
            {
                namePatient: params.updateNamePatient,
                nameDoctor: params.updateNameDoctor,
                date: params.updateDate,
                textComplaints: params.updateTextComplaints
            });

        res.send(updateTrick);

    } catch (e) {
        res.status(500).send(e);
    }
}
