const inquirer = require('inquirer');
const questions = require('./questions');
const db = require('./db');
const { printTable } = require('console-table-printer');

const init = async () => {
    await db.connect();
    const mainAnswers = await inquirer.prompt(questions.mainQuestions);
    console.log(mainAnswers);
    await handleMainAnswers(mainAnswers);
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
    console.log(roleAnswers);
};

init().then(() => {
    console.log('Application remove');
}).catch((err) => {
    console.error('Error starting application', err);
});
