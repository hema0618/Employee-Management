
const inquirer = require("inquirer");
const consoleTable = require("console.table")

const mysql = require("mysql");

// connection to sql database

var connection = mysql.createConnection({
    host: "localhost",
  
    
    // Your username
    user: "root",
  
    // Your password
    password: "Arun0618!",
    database: "employees"
  });

 // CONNECT TO THE MYSQL SERVER AND SQL DATABASE
connection.connect(function(err){
    if (err) throw err;
    startApp();
})


function startApp() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "Welcome to our employee database! What would you like to do?",
        choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "Add an employee",
                "Add department",
                "Add a role",
                "EXIT"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View all employees":
                viewEmployees();
                break;
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Add department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "EXIT": 
                endApp();
                break;
            default:
                break;
        }
    })
}

  
  
  
 // function artistSearch() {
   // inquirer
     // .prompt({
       // name: "artist",
        //type: "input",
        //message: "What artist would you like to search for?"
      //})
      //.then(function(answer) {
       // var query = "SELECT position, song, year FROM top5000 WHERE ?";
        //connection.query(query, { artist: answer.artist }, function(err, res) {
          //if (err) throw err;
          //for (var i = 0; i < res.length; i++) {
            //console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
          //}
          //runSearch();
        //});
      //});
  //}
  
  