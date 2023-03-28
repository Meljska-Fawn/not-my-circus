const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
require('console.table');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

function getDepartments() {
    return db.promise().query('SELECT * FROM department')
};

function getRoles() {
    db.query('SELECT roles.id, roles.title, department.department_name AS department, FORMAT(roles.salary, 0) AS salary FROM roles JOIN department ON roles.department_id = department.id ORDER BY roles.id;',
        function (err, results) {
            console.table(results);
        });
};

function getEmployees() {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.department_name AS department, FORMAT(roles.salary, 0) AS salary, CONCAT_WS(" ", employees.first_name, employees.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees m ON employees.manager_id = m.id ORDER BY employees.id',
        function (err, results) {
            console.table(results);
        });
    // add if else statement for no manager
};

function addDepartment() {
    inquirer.prompt([
        {
            name: 'newDepartment',
            message: 'Enter the name of the new department.',
        },
    ])
        .then((answer) => {
            console.log(`${answer} is added`);
            return db.promise().query('INSERT INTO department SET ?', answer)
                // {
                //     department_name: answer.newDepartment
                // },
                // console.log(`${answer.newDepartment} added.`))
        })
};

function addRole() {
    getDepartments();

    inquirer.prompt([
        {
            name: 'department',
            message: 'Enter a department id.',
        },
        {
            name: 'title',
            message: 'What is the title of the role?',
        },
        {
            name: 'salary',
            message: 'What is the salary for the role?',
        },
    ])
        .then((answer) => {
            db.query('INSERT INTO roles SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department
                },
                console.log(`${answer.title} added.`))
        })
};

function addEmployee() {

    inquirer.prompt([
        {
            name: 'firstName',
            message: 'Enter the employees first name.',
        },
        {
            name: 'lastName',
            message: 'Enter the employees last name.',
        },
        {
            name: 'roleId',
            message: 'What is the role id for the employee?',
        },
        {
            name: 'managerId',
            message: 'What is the manager id for the employees manager (leave blank if there is no manager)?',
        },
    ])
        .then((answer) => {
            db.query('INSERT INTO employees SET ?',
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleId,
                    manager_id: answer.managerId
                },
                console.log(`${answer.firstName} ${answer.lastName} added.`))
        })
}
function updateEmployee() {

    inquirer.prompt([
        {
            name: 'employeeId',
            message: 'Enter the employees id.',
        },
        {
            name: 'roleId',
            message: 'What is the new role id for the employee?',
        },
    ])
        .then((answer) => {
            db.query('UPDATE employees SET role_id = ? WHERE id = ?',
                [answer.role_id, answer.id],
                console.log(`Updated employee's role.`))
        })
};

module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployee
};