const csvtojson = require('csvtojson');
const mysql = require("mysql");

// database details  
const hostname = "localhost",
    port = '8889'
    username = "root",
    password = "root",
    databsename = "testdb"
  
  
// connect to the database
let con = mysql.createConnection({
    host: hostname,
    port: port,
    user: username,
    password: password,
    database: databsename,
});
  
con.connect((err) => {
    if (err) return console.error('error: ' + err.message);
  
    con.query("DROP TABLE products", 
        (err, drop) => {
  
        // Query to create table "products"
        var createStatament = 
        "CREATE TABLE products(Product_Name char(50), " +
        "Product_Description char(50), Original_Price int, Selling_Price int)"
  
        // Creating table "products"
        con.query(createStatament, (err, drop) => {
            if (err)
                console.log("ERROR: ", err);
        });
    });
});
  
// CSV file name
const fileName = "products.csv";
  
csvtojson().fromFile(fileName).then(source => {
  
    // Fetching the data from each row and inserting to the table "products"
    for (var i = 0; i < source.length; i++) {
        var Name = source[i]["product_name"],
            Description = source[i]["product_description"],
            O_Price = source[i]["original_price"],
            S_Price = source[i]["selling_price"]
  
        var insertStatement = "INSERT INTO products values(?, ?, ?, ?)";
        var items = [Name, Description, O_Price, S_Price];
  		
        // Inserting data of current row into database
        con.query(insertStatement, items, 
            (err, results, fields) => {
            if (err) {
                console.log("Unable to insert item at row ", i + 1);
                return console.log(err);
            }
        });
    }
    console.log("Records inserted into database successfully...!!");
});