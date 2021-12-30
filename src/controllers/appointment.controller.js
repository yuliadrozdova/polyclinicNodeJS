const Trick = require("../db/models/appointmentModel");

//get all Tricks +
module.exports.getAllTricks = async (req, res, next) => {;

    console.log('222 ', req.userId);

    try {
        const result = await Trick.find({createdBy: req.userId});
        res.send({data: result});
    } catch (e) {
        res.statusCode(500).send(e);
    }
}

//create Trick +
module.exports.createTrick = async (req, res, next) => {
    console.log('333 ', req.userId);
    try{
        const createdBy = req.userId;
        const {namePatient, nameDoctor, date, textComplaints} = req.body;
        const newTrick = new Trick({createdBy, namePatient, nameDoctor, date, textComplaints});
        const result = await newTrick.save();
            res.send({data: result});
            // console.log('111 create ', {data: result});
    }catch (e) {
        res.statusCode(500).send(e);
    }
}


//delete trick +
module.exports.deleteTrick = async (req, res, next) => {
    try{
        const deleteTrick = Trick.deleteOne({_id: req.params.id});
        const result = await deleteTrick;
        res.send({data: result});
    }catch (e) {
        res.statusCode(500).send(e);
    }
}

//update Trick +
module.exports.updateTrick = async (req, res, next) => {
    const params = req.body.values;
    try {
        const updateTrick = await Trick.updateOne({_id : params._id},
            {$set: {
                namePatient: params.namePatient,
                nameDoctor: params.nameDoctor,
                date: params.date,
                textComplaints: params.textComplaints}
            });
        res.send(updateTrick);
    } catch (e) {
        res.status(500).send(e);
    }
}
