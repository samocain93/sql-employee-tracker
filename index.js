// REQUIRE VARIABLES // 

const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

// CREATE CONNECTION TO DATABASE

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'GoNole$0533',
        database: 'employees_db'

    })

    db.connect((err) => {
        if (err) throw err;
        console.log('Connected to the database successfully!')
    })


    // APPLICATION QUESTIONS

    const question = [
        {
            type: 'list',
            name: 'choice',
            message: "Let's Get Started: ",
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        }
    ]