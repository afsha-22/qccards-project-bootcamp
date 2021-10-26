module.exports = (sequelize, Sequelize) => {
    const Detail = sequelize.define("details", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      pfi_number: {
          type: Sequelize.STRING
      },
      issue: {
          type: Sequelize.INTEGER
      },
      brand: {
          type: Sequelize.STRING
      },
      production_date: {
          type: Sequelize.DATE
      },
      commodity: {
          type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      part_name: {
        type: Sequelize.STRING
      },
      part_number: {
          type: Sequelize.STRING
      },
      apperance: {
          type: Sequelize.STRING
      },
      function: {
          type: Sequelize.STRING
      },
      other: {
          type: Sequelize.STRING
      },
    });
  
    return Detail;
  };
  