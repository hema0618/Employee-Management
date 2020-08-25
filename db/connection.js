
const inquirer = require("util");
const mysql = require("mysql");
// const consoleTable= require("console.table");

// connection to sql database

var connection = mysql.createConnection({
    host: "localhost",
  
    
    // Your username
    user: "root",
  
    // Your password
    password: process.env.MYSQL_key,
    database: "employees"
  });

  
//setting up connection.query to use promises 
// This allows us to use the async/await syntax
  connection.connect();

  connection.query = util.promisify(connection.query);

  module.exports = connection;