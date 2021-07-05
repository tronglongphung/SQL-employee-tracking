const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_DB",
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

const runSearch = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "Add department":
          addDepartment();
          break;

        case "Add role":
          addRole();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "View departments":
          viewDepartments();
          break;

        case "View roles":
          viewRoles();
          break;

        case "View employees":
          viewEmployees();
          break;

        case "Update employee roles":
          updateEmployeeRole();
          break;

        case "Exit":
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What department would you like to add?",
    })
    .then((answer) => {
      const query = "INSERT INTO department SET ?";
      connection.query(query, { name: `${answer.department}` }, (err, res) => {
        if (err) throw err;
        console.log(`Added ${answer.department} into Department`);
      });
      connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        // console.table(res);
        runSearch();
      });
    });
};
const addRole = () => {
  inquirer
    .prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "What is the role title?",
      },
      {
        name: "roleSalary",
        type: "input",
        message: "What is the role salary?",
      },
      {
        name: "departmentID",
        type: "list",
        message: "Which department is this person?",
        choices: [
          { name: "Sales", value: 1 },
          { name: "Engineer", value: 2 },
          { name: "Legal", value: 3 },
        ],
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO role SET ?";
      connection.query(
        query,
        {
          title: `${answer.roleTitle}`,
          salary: `${answer.roleSalary}`,
          department_id: `${answer.departmentID}`,
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `Added ${answer.roleTitle}, ${answer.roleSalary} into Role`
          );
        }
      );
      connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        // console.table(res);
        runSearch();
      });
    });
};
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name?",
      },
      {
        name: "roleId",
        type: "list",
        message: "What is the role?",
        choices: [
          { name: "Sales", value: 1 },
          { name: "Engineer", value: 2 },
          { name: "Legal", value: 3 },
        ],
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO employee SET ?";
      connection.query(
        query,
        {
          first_name: `${answer.firstName}`,
          last_name: `${answer.lastName}`,
          role_id: `${answer.roleId}`,
          //   how to do joining?
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `Added new employee ${answer.firstName} ${answer.lastName}`
          );
        }
      );
      connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        // console.table(res);
        runSearch();
      });
    });
};
const viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};
const viewRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};
const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};
const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "list",
        message: "Who would you like to update?",
        choices: [
          { name: "Benjamin Franklin", value: 1 },
          { name: "Dyon Squat", value: 2 },
          { name: "Sabrina Malley", value: 3 },
        ],
      },
      {
        name: "role",
        type: "list",
        message: "What role are you changing to?",
        choices: [
          { name: "Sales Manager", value: 2 },
          { name: "Engineer Boss", value: 3 },
          { name: "Legal Crying Professional", value: 4 },
        ],
      },
    ])

    .then((answer) => {
      const query = "UPDATE employee SET role_id = ? WHERE id = ?";
      connection.query(
        query,
        [answer.role, answer.name],

        (err, res) => {
          if (err) throw err;
          console.log(`Done!`);
        }
      );
    });
};
