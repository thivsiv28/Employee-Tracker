USE employee_tracker_db;

INSERT INTO department (name) VALUES
    ('Engineering'), ('Finance'), ('Legal'), ('Sales');

INSERT INTO role (name, department_id, salary) VALUES
    ('Lead Engineer', 1, 150000),
    ('Software Engineer', 1, 120000),
    ('Account Manager',2, 160000),
    ('Accountant', 2, 125000),
    ('Legal Team Lead', 3, 250000),
    ('Lawyer', 3, 190000),
    ('Saleslead', 4, 100000),
    ('Salesperson', 4, 80000);

INSERT INTO employee (firstname, lastname, manager_id, role_id) VALUES
    ('John', 'Doe', null, 7),
    ('Mike', 'Chan', 1, 8),
    ('Ashley', 'Rodriguez', null, 1),
    ('Kevin', 'Tupik', 3, 2),
    ('Knoll', 'Singh', null, 3),
    ('Malia', 'Brown', 5, 4),
    ('Sarah', 'Lourd', null, 5),
    ('Tom', 'Allen', 5, 6);