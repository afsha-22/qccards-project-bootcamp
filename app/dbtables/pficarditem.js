module.exports = (sequelize, Sequelize) => {
    const PFICardItem = sequelize.define("pficards", {
      pfi_item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      pfi_card_id: {
        type: Sequelize.INTEGER
      },
      appearance: {
        type: Sequelize.STRING
      },
      function: {
          type: Sequelize.STRING
      },
      judge_ok: {
          type: Sequelize.BOOLEAN
      },
      judge_ng: {
          type: Sequelize.BOOLEAN
      },
      defect_type: {
          type: Sequelize.STRING
      },
      defect_declare_comments: {
          type: Sequelize.STRING
      },
      defect_declare_photo: {
          type: BLOB
      },
      defect_correction_date: {
          type: Sequelize.DATE
      },
      defect_correction_zone: {
          type: Sequelize.STRING
      },
      defect_correction_who: {
          type: Sequelize.STRING
      },
      defect_correct_photo: {
          type: Sequelize.BLOB
      },
      defect_correction_comments: {
          type: Sequelize.STRING
      }
    });
  
    return PFICardItem;
  };
  