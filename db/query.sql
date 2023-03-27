SELECT department.department_name AS department, roles.title
FROM roles
LEFT JOIN department
ON roles.department_id = department.id
ORDER BY department.department_name;

SELECT roles.title AS roles, employees.role_id FROM employees
LEFT JOIN roles
ON employees.role_id = roles.id
ORDER BY roles.title;

-- SELECT employees.id AS id, employees.manager_id FROM employees
-- LEFT JOIN employees
-- ON employees.manager_id = employees.id
-- ORDER BY employees.first_name, employees.last_name;


