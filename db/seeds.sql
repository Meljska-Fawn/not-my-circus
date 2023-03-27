INSERT INTO department (id, department_name)
VALUES (001, "Sales"),
       (002, "Engineering"),
       (003, "Finance"),
       (004, "Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES (101, "Salesperson", 80000, 001),
       (102, "Lead Engineer", 150000, 002),
       (103, "Software Engineer", 120000, 002),
       (104, "Account Manager", 160000, 003),
       (105, "Accountant", 125000, 003),
       (106, "Legal Team Lead", 250000, 004),
       (107, "Lawyer", 190000, 004);
       
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (201, "Mike", "Chan", 101, null),
       (202, "Ashley", "Rodriguez", 102, null),
       (203, "Kevin", "Tupik", 103, 202),
       (204, "Kumal", "Singh", 104, null),
       (205, "Malia", "Brown", 105, 204),
       (206, "Sarah", "Lourd", 106, null),
       (207, "Tom", "Allen", 107, 206);
