const mainQuestions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            {
                name: 'View All Departments',
                value: 'view_all_departments',
            },
            {
                name: 'View All Employees',
                value: 'view_all_employees',
            },
            {
                name: 'Add Employee',
                value: 'add_employee',
            },
            {
                name: 'Update Employee Role',
                value: 'update_employee_role',
            },
            {
                name: 'View All Roles',
                value: 'view_all_roles',
            },
            {
                name: 'Add Role',
                value: 'add_role',
            },
            {
                name: 'Add Department',
                value: 'add_department',
            },
            {
                name: 'Quit',
                value: 'quit',
            }
        ]
    }
];

const addRoleQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the role?',
    }, {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
    },
    {
        type: 'list',
        name: 'department',
        message: 'What department does this role belong to?',
        choices: []
    }
];

const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'firstanme',
        message: 'What is the employee\'s first name',
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'What is the employee\'s last name',
    },
    {
        type: 'list',
        name: 'role',
        message: 'What is the employee\'s role?',
        choices: []
    },
    {
        type: 'list',
        name: 'manager',
        message: 'What is the employee\'s manager?',
        choices: [
            {
                name: 'None',
                value: 'none',
            }]
    },
];

const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
    }
];

module.exports = {
    mainQuestions,
    addRoleQuestions,
    addEmployeeQuestions,
    addDepartmentQuestions
};