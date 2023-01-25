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



// ----- INITIAL APP QUESTION ----- // 

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

    const addRoleQuestion = [
        {
            type: 'input',
            name: 'title',
            message: 'Please enter a title for the new role'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary for the new role'
        },
        {
            type: 'list',
            name: 'id',
            message: 'Please enter the corresponding Department ID for the new role',
            choices: []
        },

    ]

    const addEmployeeQuestion = [
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter the first name of the new employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter the last name of the new employee'
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Please select the role for the new employee',
            choices: []
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Please select the manager for the new employee',
            choices: []
        },

    ]

    const updateEmployeeQuestion = [
        {
            type: 'list',
            name: 'employee',
            message: 'Please select which employee you would like to update',
            choices: []
        },
        {
            type: 'list',
            name: 'newTitle',
            message: 'Please select the new role for this employee',
            choices: []
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
            }
        })
    }

    
// ----- VIEW ALL DEPARTMENTS -----  // 

    function viewDepartments() {
        db.query('SELECT * FROM department;', (err, data) => {
            if (err) throw err;
            console.table(data);
            init();
        })
    };


// ----- ADD DEPARTMENT ----- // 

    function addDepartment() {
        inquirer.prompt(addDepartmentQuestion).then((response) => {
            db.query('INSERT INTO department (name) VALUES (?)', [response.name], (err) => {
                viewDepartments();
            })
        })
        
    };

    // -----  ADD ROLE -----  // 

    function addRole() {
        db.query('SELECT name, id AS value FROM department;', (err, data) => {
            addRoleQuestion[2].choices = data;
            inquirer.prompt(addRoleQuestion).then((response) => {
                db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [response.title, response.salary, response.id], (err) => {
                    viewRoles();
                })
            })
        })
        
    }

    //  ----- ADD EMPLOYEE -----  //

    function addEmployee() {
       
        db.query('SELECT title AS name, id AS value FROM role;', (err, data) => {
            db.query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee', (err, employeeData) => {
                addEmployeeQuestion[2].choices = data;
                addEmployeeQuestion[3].choices = employeeData;
                inquirer.prompt(addEmployeeQuestion).then((response) => {
                    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)' , [response.firstName, response.lastName, response.roleId, response.managerId], (err) => {
                        viewEmployees()
                    })
                })
               
            })
        })


    };



// ----- VIEW ALL EMPLOYEES ----- //

    function viewEmployees() {
        db.query('SELECT * FROM employee;', (err, data) => {
            if (err) throw err;
            console.table(data);
            init();
        })

    };






// ----- UPDATE EMPLOYEE ROLE ----- //

    function updateEmployee() {

        db.query('SELECT title AS name, id AS value FROM role;', (err, data) => {
            db.query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee', (err, employeeData) => {
                updateEmployeeQuestion[1].choices = data;
                updateEmployeeQuestion[0].choices = employeeData;
                inquirer.prompt(updateEmployeeQuestion).then((response) => {
                    db.query('UPDATE employee SET role_id=? WHERE id=?', [response.newTitle, response.employee], (err) => {
                        viewEmployees()
                    })
                })
               
            })
        })


    };


//  ----- VIEW ALL ROLES -----  //

    function viewRoles() {
        db.query('SELECT * FROM role;', (err, data) => {
          
            if (err) throw (err)
            console.table(data)
            init()
        
        })


        };




