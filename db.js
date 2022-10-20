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

const addDepartment = async ({ name }) => {
    await connection.execute('INSERT INTO department (name) VALUES (?)',
        [name]);
};

const addRole = async ({ name, department, salary }) => {
};

const addEmployee = async ({ firstname, lastname, manager, role }) => {

};

const getAllEmployees = async () => {
    const [rows, fields] = await connection.execute("SELECT * FROM employee");
    return rows;
};

const getAllDepartments = async () => {
    const [rows, fields] = await connection.execute("SELECT * FROM department");
    return rows;

};

module.exports = {
    connect,
    getAllDepartments,
    getAllEmployees,
};
