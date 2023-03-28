const inquirer = require('inquirer');
const { getDepartments, getRoles, getEmployees, 
    addDepartment, addRole, addEmployee, updateEmployee } = require('./db/database');
require('console.table');

function questionPrompt() {
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
                    viewRoles();
                    break;
                case 'View all employees.':
                    viewEmployees();
                    break;
                case 'I want to add a department.':
                    newDepartment();
                    break;
                case 'I want to add a role.':
                    newRole();
                    break;
                case 'I want to add an employee.':
                    newEmployee();
                    break;
                case 'I want to update an employee role.':
                    updateEmployeeRole();
                    break;
            }
        })
}

async function viewDepartments() {
    const depts = await getDepartments();
            console.table(depts[0]);
            questionPrompt();
};

async function viewRoles() {
    const roles = await getRoles();
            console.table(roles[0]);
            questionPrompt();
};

async function viewEmployees() {
    const employees = await getEmployees();
            console.table(employees[0]);
            questionPrompt();
};

function newDepartment() {
    inquirer.prompt([
        {
            name: 'newDepartment',
            message: 'Enter the name of the new department.',
        },
    ])
        .then((answer) => {
        addDepartment(answer)
        .then(() => console.log(`${answer.newDepartment} added to the database.`))
        .then(() => questionPrompt());
        })
};

function newRole() {
    inquirer.prompt([
        {
            name: 'department_id',
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
        .then(res => {
        const { department_id, title, salary } = res;
        addRole(department_id, title, salary)
        .then(() => console.log(`${title} added.`))
        .then(() => questionPrompt());
        })
};

function newEmployee() {
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
        .then(res => {
        const { firstName, lastName, roleId, managerId } = res;
        addEmployee(firstName, lastName, roleId, managerId)
        .then(() => console.log(`${firstName} ${lastName} added.`))
        .then(() => questionPrompt());
        })
};

function updateEmployeeRole() {
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
        .then(res => {
        const { employeeId, roleId } = res;
        updateEmployee(employeeId, roleId)
        .then(() => console.log(`Updated employee's role.`))
        .then(() => questionPrompt());
        })
};

questionPrompt();