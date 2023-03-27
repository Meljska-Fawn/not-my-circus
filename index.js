const inquirer = require('inquirer');
const db = require('./database');
const { getDepartments, getRoles, getEmployees } = require('./database');

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
                'I want to add an employee.'
            ]
        })
        .then((answer) => {

            switch (answer.choosen) {
                case 'View all departments.':
                    getDepartments();
                    break;
                case 'View all roles.':
                    getRoles();
                    break;
                case 'View all employees.':
                    getEmployees();
                    break;
                case 'I want to add a department.':
                    db.addDepartment();
                    break;
                case 'I want to add a role.':
                    db.addRole();
                    break;
                case 'I want to add an employee.':
                    db.addEmployee();
                    break;
            }
        })
}

questionPrompt();

module.exports = questionPrompt;





