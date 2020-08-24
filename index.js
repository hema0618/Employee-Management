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
    database: "top_songsDB"
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