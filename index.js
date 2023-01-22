// REQUIRE VARIABLES // 

const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

// CREATE CONNECTION TO DATABASE

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


    // APPLICATION QUESTIONS

    const question = [
        {
            type: 'list',
            name: 'choice',
            message: "Let's Get Started: ",
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        }
    ];

    const addDepartmentQuestion = [
        {
            type: 'input',
            name: 'name',
            message: 'Please create a name for your new department'
        }
    ]


    // START APP //

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
            }
        })
    }

    


    function viewDepartments() {
        db.query('SELECT * FROM department;', (err, data) => {
            console.table(data);
            init()
        })
    }


    function addDepartment() {
        inquirer.prompt(addDepartmentQuestion).then((response) => {
            db.query('INSERT INTO department (name) VALUES (?)', [response.name], (err) => {
                viewDepartments();
            })
        })
        
    }
