const inquirer = require('inquirer');
const { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployee } = require('./db/database');
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

async function newDepartment() {
    const answer = await inquirer.prompt([
        {
            name: 'newDepartment',
            message: 'Enter the name of the new department.',
        },
    ]);
        await addDepartment(answer);
        console.log(`${answer.newDepartment} added to the database.`);
        questionPrompt();
};

async function newRole() {

    const depts = await getDepartments();
    console.table(depts[0]);
        
    const res = await inquirer.prompt([
        {
            name: "department_id",
            message: "Enter a department id (view table).",
        },
        {
            name: "title",
            message: "What is the title of the role?",
        },
        {
            name: "salary",
            message: "What is the salary for the role?",
        },
    ]);
    const { department_id, title, salary } = res;
    await addRole(department_id, title, salary);
    console.log(`${title} added.`);
    await questionPrompt();
};

async function newEmployee() {

    const roles = await getRoles();
    console.table(roles[0]);

    const res = await inquirer.prompt([
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
            message: 'What is the role id for the employee (view table)?',
        },
        {
            name: 'managerId',
            message: 'What is the manager id for the employees manager (leave blank if there is no manager)?',
        },
    ]);
        const { firstName, lastName, roleId, managerId } = res;
        await addEmployee(firstName, lastName, roleId, managerId);
        console.log(`${firstName} ${lastName} added.`);
        questionPrompt();
};

async function updateEmployeeRole() {
    const res = await inquirer.prompt([
        {
            name: 'employeeId',
            message: 'Enter the employees id.',
        },
        {
            name: 'roleId',
            message: 'What is the new role id for the employee?',
        },
    ]);
        const { employeeId, roleId } = res;
        await updateEmployee(employeeId, roleId);
        console.log(`Updated employee's role.`);
        questionPrompt();
};

questionPrompt();