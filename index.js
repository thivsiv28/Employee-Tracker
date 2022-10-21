const inquirer = require('inquirer');
const questions = require('./questions');
const db = require('./db');
const { printTable } = require('console-table-printer');

const init = async () => {
    await db.connect();

    let mainAnswers = await inquirer.prompt(questions.mainQuestions);

    while (mainAnswers.action != 'quit') {
        await handleMainAnswers(mainAnswers);
        mainAnswers = await inquirer.prompt(questions.mainQuestions);
    }

    await db.end();
};

const handleMainAnswers = async (mainAnswers) => {
    if (mainAnswers.action == 'view_all_departments') {
        const departments = await db.getAllDepartments();
        printTable(departments);
    } else if (mainAnswers.action == 'view_all_employees') {
        const employees = await db.getDetailedEmployees();
        printTable(employees);
    } else if (mainAnswers.action == 'view_all_roles') {
        const roles = await db.getDetailedRoles();
        printTable(roles);
    } else if (mainAnswers.action == 'add_department') {
        await addDepartment();
    } else if (mainAnswers.action == 'add_role') {
        await addRole();
    } else if (mainAnswers.action == 'add_employee') {
        await addEmployee();
    } else {
        await updateEmployeeRole();
    }
};

const addDepartment = async () => {
    const departmentAnswers = await inquirer.prompt(questions.addDepartmentQuestions);
    await db.addDepartment(departmentAnswers);
};

const addRole = async () => {
    const roleQuestions = questions.addRoleQuestions;
    const departments = await db.getAllDepartments();

    roleQuestions[2].choices = departments.map(dept => {
        return {
            name: dept.name,
            value: dept.id
        };
    });
    const roleAnswers = await inquirer.prompt(roleQuestions);
    await db.addRole(roleAnswers);
    // console.log(roleAnswers);
};

const addEmployee = async () => {
    const employeeQuestions = questions.addEmployeeQuestions;
    const employees = await db.getAllEmployees();
    const roles = await db.getAllRoles();

    employeeQuestions[2].choices = roles.map(role => {
        return {
            name: role.name,
            value: role.id
        };
    });

    employeeQuestions[3].choices = employeeQuestions[3].choices.concat(employees.map(emp => {
        return {
            name: `${emp.firstname} ${emp.lastname}`,
            value: emp.id
        };
    }));

    const employeeAnswers = await inquirer.prompt(employeeQuestions);
    // console.log(employeeAnswers);
    await db.addEmployee(employeeAnswers);
};

const updateEmployeeRole = async () => {
    const updateQuestions = questions.updateEmployeeRole;
    const employees = await db.getAllEmployees();
    const roles = await db.getAllRoles();


    updateQuestions[0].choices = employees.map(emp => {
        return {
            name: `${emp.firstname} ${emp.lastname}`,
            value: emp.id
        };
    });

    updateQuestions[1].choices = roles.map(role => {
        return {
            name: role.name,
            value: role.id
        };
    });
    const answers = await inquirer.prompt(updateQuestions);
    await db.updateEmployeeRole(answers);
    // console.log(answers);
};


init().then(() => {
    console.log('Application finished');
    return;
}).catch((err) => {
    console.error('Error starting application', err);
}).finally(() => { });
