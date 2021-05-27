USE employee_DB;

SELECT * FROM department;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineer'), ('Legal');



SELECT * FROM role;

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 20000, 1), ('Engineer Boss', 10000, 2), ('Legal Crying Professional', 900000, 3);



SELECT * FROM employee;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Benjamin', 'Franklin', 1, 1), ('Dyon', 'Squat', 2, 2), ('Sabrina', 'Malley', 3, 3);