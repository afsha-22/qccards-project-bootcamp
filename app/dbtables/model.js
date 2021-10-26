module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("models", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      brand: {
        type: Sequelize.STRING
      },
      model: {
          type: Sequelize.STRING
      },
      tmckatashi: {
          type: Sequelize.STRING
      },
      tms_model_code: {
          type: Sequelize.STRING
      },
      drive_train: {
          type: Sequelize.STRING
      },
      engine_type: {
          type: Sequelize.STRING
      },
      engine_display: {
          type: Sequelize.STRING
      },
      engine: {
          type: Sequelize.STRING
      },
      trans: {
          type: Sequelize.STRING
      },
      fuel: {
          type: Sequelize.STRING
      },
      seat_number: {
          type: Sequelize.STRING
      },
      vds_code: {
          type: Sequelize.STRING
      },
      mvo_number: {
          type: Sequelize.STRING
      },
    });
  
    return Model;
  };
  