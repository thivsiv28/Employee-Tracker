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
        const employees = await db.getAllEmployees();
        printTable(employees);
    }
};

init().then(() => {
    console.log('Application remove');
}).catch((err) => {
    console.error('Error starting application', err);
});
