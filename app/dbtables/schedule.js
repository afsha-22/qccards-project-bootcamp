module.exports = (sequelize, Sequelize) => {
    
    const Schedule = sequelize.define("schedules", {
        seq_number: {
            type: Sequelize.INTEGER
        },
        pfi_processing_date: {
            type: Sequelize.DATE
        },
        vin_number: {
            type: Sequelize.STRING
        },
        mvo_number: { 
            type: Sequelize.STRING
        },
        actual_lineoff: {
            type: Sequelize.DATE
        },
        batch_number: {
            type: Sequelize.STRING
        },
        line: {
            type: Sequelize.STRING
        },
        material_description: {
            type: Sequelize.STRING
        },
        paint_description: { 
            type: Sequelize.STRING
        },
        trim: {
            type: Sequelize.STRING
        },
        engine_number: {
            type: Sequelize.STRING
        },
        katashiki: {
            type: Sequelize.STRING
        },
        cosi_created_date: {
            type: Sequelize.DATE
        },
        cosi_dlr_stock: {
            type: Sequelize.DATE
        },
        next_process_date: {
            type: Sequelize.DATE
        },
        guest_order_date: {
            type: Sequelize.DATE
        },
        po_order_date: {
            type: Sequelize.DATE
        },
        dealer_eta_date: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.STRING
        },
    });

    return Schedule;
};