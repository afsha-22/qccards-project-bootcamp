module.exports = (sequelize, Sequelize) => {
    const PFICard = sequelize.define("pficards", {
      pfi_card_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      mvo_number: {
        type: Sequelize.STRING
      },
      pfi_number: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      pfi_date: {
          type: Sequelize.DATE
      },
      vin_number: {
          type: Sequelize.STRING
      },
      inspector: {
          type: Sequelize.STRING
      }
    });
  
    return PFICard;
  };
  