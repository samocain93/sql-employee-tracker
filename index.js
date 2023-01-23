// ----- REQUIRE VARIABLES ----- // 

const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

// ----- CREATE CONNECTION TO DATABASE ----- //

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'GoNole$0533',
        database: 'employees_db'

    })

    db.connect((err) => {
        if (err) throw err;
        console.log('Connected to the database successfully!');
        init();
    })


// ----------- APPLICATION QUESTIONS -------------- //



// INITIAL APP QUESTION // 

    const question = [
        {
            type: 'list',
            name: 'choice',
            message: "What would you like to do?",
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        }
    ];

    // ----- ADD DEPARTMENT QUESTION PROMPT ----- // 

    const addDepartmentQuestion = [
        {
            type: 'input',
            name: 'name',
            message: 'Please create a name for your new department'
        }
    ]


    // ----- START APP FUNCTION ----- //

    function init() {
        inquirer.prompt(question).then((response) => {
            if (response.choice === 'View All Employees') {
                viewEmployees();
            } else if (response.choice === 'Add Employee') {
                addEmployee();
            } else if (response.choice === 'View All Departments'){
                viewDepartments();
            } else if (response.choice === 'Add Department'){
                addDepartment();
            } else if (response.choice === 'Update Employee Role') {
                updateEmployee();
            } else if (response.choice === 'View All Roles') {
                viewRoles();
            } else if (response.choice === 'Add Role') {
                addRole();
            } else if (response.choice === 'Update Employee Manager') {
                updateEmployeeManager();
            } else if (response.choice === 'View Employees by Manager') {
                viewEmployeesByManager();
            } else if (response.choice === 'View Employees by Department') {
                viewEmployeesByDepartment();
            } else if (response.choice === 'View Total Utilized Budget') {
                viewTotalUtilizedBudget();
            }
        })
    }

    
// VIEW ALL DEPARTMENTS // 

    function viewDepartments() {
        db.query('SELECT * FROM department;', (err, data) => {
            console.table(data);
            init();
        })
    };


// ADD DEPARTMENT // 

    function addDepartment() {
        inquirer.prompt(addDepartmentQuestion).then((response) => {
            db.query('INSERT INTO department (name) VALUES (?)', [response.name], (err) => {
                viewDepartments();
            })
        })
        
    };



// VIEW ALL EMPLOYEES

    function viewEmployees() {



    };

// ADD EMPLOYEE //

    function addEmployee() {
        


    };



// UPDATE EMPLOYEE ROLE //

    function updateEmployee() {



    };


// VIEW ALL ROLES //

    function viewRoles() {



    };





// ADD ROLE // 

    function addRole() {



    }



// UPDATE EMPLOYEE MANAGER // 

    function updateEmployeeManager() {



    }


// VIEW EMPLOYEES BY MANAGER // 

    function viewEmployeesByManager() {

    }



// VIEW EMPLOYEES BY DEPARTMENT // 

    function viewEmployeesByDepartment() {



    }




// VIEW TOTAL UTILIZED BUDGET // 

    function viewTotalUtilizedBudget() {



    }





