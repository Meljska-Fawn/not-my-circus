const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
require('console.table');
const { questionPrompt } = require('./index');

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
            questionPrompt();
        });
};

function getRoles() {
    db.query('SELECT * FROM roles',
        function (err, results) {
            console.table(results);
        });
};

function getEmployees() {
    db.query('SELECT * FROM employees',
        function (err, results) {
            console.table(results);
        });
};

module.exports = {
    getDepartments,
    getRoles,
    getEmployees
};