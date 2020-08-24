//switch cases with inquirer

const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable= require("console.table");

// connection to sql database

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "employees"
  });

  connection.connect(function(err) {
    if (err) throw err;
    startApp();
  });

  //creating a function

  function startApp() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all departments",
            "View all roles",
            "Add an employee",
            "Add department",
            "Add a role",
            "EXIT"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View all employees":
          viewEmployees();
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
  
       
        }
      });
  }

  function viewEmployees() {
    var query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res.length + " employees found!");
    console.table('All Employees:', res); 
    startApp();
    })
}

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
    if(err)throw err;
    console.table('All Departments:', res);
    startApp();
    })
}

function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res){
    if (err) throw err;
    console.table('All roles:', res);
    startApp();
    })
}