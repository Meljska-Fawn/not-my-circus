const inquirer = require('inquirer');
const db = require('./database');
const { getDepartments, getRoles, getEmployees } = require('./database');

async function questionPrompt() {
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "How can I help you?",
            choices: [
                "View all departments.",
                "View all roles.",
                "View all employees.",
                "I want to add a department."

            ]
        })
        .then((answer) => {

            switch (answer.action) {
                case "View all departments.":
                    getDepartments();
                    break;
                case "View all roles.":
                    getRoles();
                    break;
                case "View all employees.":
                    getEmployees();
                    break;
            }
        })
}

questionPrompt();

module.exports = questionPrompt





