const db = require("../dbtables");
const config = require("../config/auth.config");
const { sequelize } = require("../dbtables");
const Schedule = db.schedule;

const Op = db.Sequelize.Op;

exports.dailySchedule = (req,res) => {

    Schedule.findAll({
        where: {
            status: 'Not Started'
        }
    })
    .then(response =>{
        console.log(JSON.stringify(response))
        res.status(200).send(response);
    });
}
