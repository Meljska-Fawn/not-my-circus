const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
require('console.table');
const index = require('./index');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

function getDepartments() {
    db.query('SELECT * FROM department',
        function (err, results) {
            console.table(results);
        });
        // questionPrompt();
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
        db.query('INSERT INTO department SET ?',
        {
            department_name: answer.newDepartment
        },
        console.log(`${answer.newDepartment} added.`))
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

module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole
};