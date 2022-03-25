const Trick = require("../db/models/appointment.model");

/**
 * { GET } /allTricks
 * @description get all user tricks
 */
module.exports.getAllTricks = async (req, res) => {
    try {
        const result = await Trick.find({createdBy: req.userId});
        res.send({data: result}).status(200);
    } catch (err) {
        res.status(401).send('401')
    }
}

/**
 * { POST } /createTrick
 * @description create user trick
 */
module.exports.createTrick = async (req, res, next) => {
    try{
        const createdBy = req.userId;
        const {namePatient, nameDoctor, date, textComplaints} = req.body;
        const newTrick = new Trick({createdBy, namePatient, nameDoctor, date, textComplaints});
        const result = await newTrick.save();
            res.send({data: result}).status(200);
    }catch (err) {
        res.status(403).send(err);
    }
}

/**
 * { POST } /deleteTrick
 * @description delete user trick
 */
module.exports.deleteTrick = async (req, res, next) => {
    try{
        const deleteTrick = Trick.deleteOne({_id: req.params.id});
        const result = await deleteTrick;
        res.send({data: result}).status(200);
    }catch (err) {
        res.status(403).send(err);
    }
}

/**
 * { POST } /updateTrick
 * @description update user trick
 */
module.exports.updateTrick = async (req, res, next) => {
    const {namePatient, nameDoctor, date, textComplaints, id} = req.body;
    try {
        const updateTrick = await Trick.updateOne({_id : id},
            {$set: {
                    namePatient: namePatient,
                    nameDoctor: nameDoctor,
                    date: date,
                    textComplaints: textComplaints}
            });
        res.send(updateTrick).status(200);
    } catch (err) {
        res.status(403).send(err);
    }
}