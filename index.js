const inquirer = require('inquirer');
const db = require('./db/database');
const { getDepartments, getRoles, getEmployees, addDepartment } = require('./db/database');
require('console.table');

async function questionPrompt() {
    inquirer.prompt(
        {
            name: 'choosen',
            type: 'list',
            message: 'How can I help you?',
            choices: [
                'View all departments.',
                'View all roles.',
                'View all employees.',
                'I want to add a department.',
                'I want to add a role.',
                'I want to add an employee.',
                'I want to update an employee role.'
            ]
        })
        .then((answer) => {

            switch (answer.choosen) {
                case 'View all departments.':
                    viewDepartments();
                    break;
                case 'View all roles.':
                    getRoles();
                    break;
                case 'View all employees.':
                    getEmployees();
                    break;
                case 'I want to add a department.':
                    newDepartment();
                    break;
                case 'I want to add a role.':
                    db.addRole();
                    break;
                case 'I want to add an employee.':
                    db.addEmployee();
                    break;
                case 'I want to update an employee role.':
                    db.updateEmployee();
                    break;
            }
        })
}

function viewDepartments() {
    getDepartments()
        .then((results) => {
            console.table(results[0])
        })
        .then(() => questionPrompt());
};

function newDepartment() {
    addDepartment()
        // .then((results) => {
            
        //     console.table(results[0])
        // })
        .then(() => questionPrompt());
};

questionPrompt();

module.exports = { questionPrompt };





