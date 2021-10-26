const db = require("../dbtables");
const config = require("../config/auth.config");
const { sequelize, Sequelize } = require("../dbtables");
const Model = db.model;
const Schedule = db.schedule;
const ModelDetail = db.modeldetail;
const Detail = db.detail;

const Op = db.Sequelize.Op;

exports.getModelInfo = (req,res) => {
    console.log('this is the mvo number passed:' + req.body.mvo_number);
    Model.findOne({
        where: {
            mvo_number: req.body.mvo_number
        }
    })
    .then(response =>{
        console.log(JSON.stringify(response))
        res.status(200).send(response);
    });
}

exports.getSAPSchedule = (req,res) => {
    console.log('getting sap schedule');
    Schedule.findOne({
        where: {
            mvo_number: req.body.mvo_number
        }
    })
    .then(response => {
        console.log(JSON.stringify(response))
        res.status(200).send(response);
    });
}

exports.getRelatedPFI = (req,res) => {
    console.log('getting related PFI');
    ModelDetail.findAll({
        where: {
            mvo_number: req.body.mvo_number
        }
    })
    .then(response => {
        console.log(JSON.stringify(response))
        res.status(200).send(response);
    });
}

exports.getPartDetails = (req,res) => {
    console.log('getting parts details');
    Detail.findAll({
        where: { part_number: { [Op.or]: req.body.parts } }
    })
    .then(response => {
        console.log(JSON.stringify(response))
        res.status(200).send(response);
    });
}
