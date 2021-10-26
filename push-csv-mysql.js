const fs = require('fs');
const mysql = require('mysql');
const csv = require('fast-csv');

// Import CSV Data to MySQL database
importCsvData2MySQL('model-master.csv');

function importCsvData2MySQL(filename){
    let stream = fs.createReadStream(filename);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();

            // Create a connection to the database
            const connection = mysql.createConnection({
                host: 'localhost',
                port: '8889',
                user: 'root',
                password: 'root',
                database: 'testdb'
            });

            // Open the MySQL connection
            connection.connect((error) => {
                if (error) {
                    console.error(error);
                } else {
                    let query = 'INSERT INTO modelmaster (id, brand, model, proddate, tmckatashi, tmsmodelcode, drivetrain, enginetype, enginedisplay, engine, trans, fuel, seatnumber, vdscode, mvobmaterial) VALUES ?';
                    connection.query(query, [csvData], (error, response) => {
                        console.log(error || response);
                    });
                }
            });
        });

    stream.pipe(csvStream);
}