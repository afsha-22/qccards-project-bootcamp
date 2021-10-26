module.exports = (sequelize, Sequelize) => {
    const ModelDetail = sequelize.define("modeldetails", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      mvo_number: {
        type: Sequelize.STRING
      },
      pfi_number: {
        type: Sequelize.STRING
      },
    });
  
    return ModelDetail;
  };
  