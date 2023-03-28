const mysql = require('mysql2');
require('dotenv').config();

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
    return db.promise().query('SELECT roles.id, roles.title, department.department_name AS department, FORMAT(roles.salary, 0) AS salary FROM roles JOIN department ON roles.department_id = department.id ORDER BY roles.id;')
};

function getEmployees() {
    return db.promise().query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.department_name AS department, FORMAT(roles.salary, 0) AS salary, CONCAT_WS(" ", employees.first_name, employees.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id JOIN employees m ON employees.manager_id = m.id ORDER BY employees.id;')
};

function addDepartment(answer) {
    return db.promise().query('INSERT INTO department SET ?',
        {
            department_name: answer.newDepartment
        }
    )
};

function addRole(department_id, title, salary) {
    return db.promise().query('INSERT INTO roles (department_id, title, salary) VALUES (?, ?, ?)', [department_id, title, salary])
};

function addEmployee(firstName, lastName, roleId, managerId) {
    return db.promise().query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId])
};

function updateEmployee(employeeId, roleId) {
    return db.promise().query('UPDATE employees SET role_id = ? WHERE id = ?',
        [roleId, employeeId])
};

function deleteDepartment(departmentId) {
    return db.promise().query('DELETE FROM department WHERE id = ?', [departmentId])
};

function deleteRole(roleId) {
    return db.promise().query('DELETE FROM roles WHERE id = ?', [roleId])
};

function deleteEmployee(employeeId) {
    return db.promise().query('DELETE FROM employees WHERE id = ?', [employeeId])
};



module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployee,
    deleteDepartment,
    deleteRole,
    deleteEmployee
};