// Dependencies
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
connection.connect(function (err) {
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
                "Update employee role",
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
                case "Update employee role":
                    updateemployeerole();
                    break;
                case "EXIT":
                    endApp();
                    break;


            }
        })
}



// view employee

function viewEmployees() {
    var query =
        "SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;";
    connection.query(query, function (err, res) {
        console.table(res);
        startApp();
    });
}
//view Depatment

function viewDepartments() {
    var query = "SELECT name, id FROM employees.department ORDER BY id asc";
    connection.query(query, function (err, res) {
        console.table(res);
        startApp();
    });
}


// view roles

function viewRoles() {
    var query =
        "SELECT role.title, role.salary, department.name FROM role, department WHERE department.id = role.department_id;";
    connection.query(query, function (err, res) {
        console.table(res);
        startApp();
    });
}




// add employee

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?",
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "roleID",
                type: "input",
                message: "What is the employee's role ID?"
            },
            {
                name: "manID",
                type: "list",
                message: "What is your manager ID?",
                choices: [1, 2, 3, 4]
            }

        ]).then(function (answer) {
            var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            connection.query(query, [answer.firstName, answer.lastName, answer.roleID, answer.manID], function (err, res) {
                if (err) throw (err);
                for (var i = 0; i < res.length; i++) {
                    console.log(`New Employee: ${res[i].firstName} ${res[i].lastName} ${res[i].roleID} ${res[i].manID}`);
                }
                startApp();
            });
        });
}


//add department


function addDepartment() {
    inquirer
        .prompt([
            {
                name: "new_dept",
                type: "input",
                message: "What is the new department you would like to add?"
            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.new_dept
                }
            );
            var query = "SELECT * FROM department";
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.table('All Departments:', res);
                startApp();
            })
        })
}
// add role


function addRole() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "new_role",
                    type: "input",
                    message: "What is the Title of the new role?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the salary of this position? (Enter a number?)"
                },
                {
                    name: "deptChoice",
                    type: "rawlist",
                    choices: function () {
                        var deptArry = [];
                        for (let i = 0; i < res.length; i++) {
                            deptArry.push(res[i].name);
                        }
                        return deptArry;
                    },
                }
            ]).then(function (answer) {
                let deptID;
                for (let j = 0; j < res.length; j++) {
                    if (res[j].name == answer.deptChoice) {
                        deptID = res[j].id;
                    }
                }

                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.new_role,
                        salary: answer.salary,
                        department_id: deptID
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log("Your new role has been added!");
                        startApp();
                    }
                )
            })
    })

}


//update employee role

function updateemployeerole() {
    //ask which employee to update
    inquirer
        .prompt([

            {
                name: "currentEmployee",
                type: "choices",
                message: "What is the ID of the employee you would like to update?",
            },

            {
                name: "newRoleTitle",
                type: "input",
                message: "What is the title of their new role?",
            },
            {
                name: "newRoleSalary",
                type: "input",
                message: "What is their new salary?",
            },

            {
                name: "newRoleDeptID",
                type: "list",
                message: "What department will they belong to? Select 1 for Sales, 2 for Engineering, 3 for Finance, 4 for HR.",
                choices: [1, 2, 3, 4]
            },
        ])
        .then(function (answer) {
            var query = "UPDATE employee.role_id, SET title = ?, salary = ?, department_id = ?  WHERE id = ?";
            connection.query(query, [answer.newRoleTitle, answer.newRoleSalary, answer.newRoleDeptID,parseInt(answer.currentEmployeeID) ], function (err, res) {
                if (err) throw (err);
                console.log("successful update!");
            })
        }

        )
}
       

function endApp() {
    connection.end();
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










        

