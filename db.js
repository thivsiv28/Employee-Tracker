const mysql = require('mysql2/promise');

let connection = null;
const connect = async () => {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'employee_tracker_db',
        password: 'password'
    });
    console.info('Database successfully connected');
};

const end = async () => {
    await connection.end();
};

const addDepartment = async ({ name }) => {
    await connection.execute('INSERT INTO department (name) VALUES (?)',
        [name]);
};

const addRole = async ({ name, departmentId, salary }) => {
    await connection.execute("INSERT INTO role (name, department_id, salary) VALUES (?, ?, ?)",
        [name, departmentId, salary]);
};

const addEmployee = async ({ firstname, lastname, managerId, roleId }) => {
    await connection.execute("INSERT INTO employee (firstname, lastname, manager_id, role_id) VALUES (?, ?, ?, ?)",
        [firstname, lastname, managerId, roleId]);
};

const getAllEmployees = async () => {
    const [rows, _] = await connection.execute("SELECT * FROM employee");
    return rows;
};

const getAllDepartments = async () => {
    const [rows, _] = await connection.execute("SELECT * FROM department");
    return rows;
};

const getAllRoles = async () => {
    const [rows, _] = await connection.execute("SELECT * FROM role");
    return rows;
};

const updateEmployeeRole = async ({ roleId, id }) => {
    await connection.execute("UPDATE employee SET role_id = ? WHERE id = ?",
        [roleId, id]);
};

const getDetailedEmployees = async () => {
    const [rows, _] = await connection.execute(`
        SELECT employee.id, employee.firstname, employee.lastname, 
        role.name as title, role.salary, department.name as department, 
        CONCAT(manager.firstname, ' ', manager.lastname) as manager
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id`);
    return rows;
};

const getDetailedRoles = async () => {
    const [rows, _] = await connection.execute(`
    SELECT role.id, role.name, department.name as department, role.salary
    FROM role
    INNER JOIN department ON department.id = role.department_id;`);

    return rows;
}

module.exports = {
    connect,
    end,
    getAllDepartments,
    getAllEmployees,
    getDetailedEmployees,
    getAllRoles,
    getDetailedRoles,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};
