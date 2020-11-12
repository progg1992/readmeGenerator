const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
let licenseDc;

// array of questions for user
const questions = [
    {
        type: "input",
        message: "Project Title",
        name: "projectTitle"
      },
      {
        type: "input",
        message: "Installation:",
        name: "installation",
      },
      {
        type: "input",
        message: "Usage:",
        name: "usage",
      },
      {
        type: "list",
        message: "License:",
        name: "license",
        choices: [
          "MIT",
          "Apache",
          "Creative Commons",
          "None"
        ]
      },
      {
        type: "input",
        message: "Contibuting:",
        name: "contributing",
      },
      {
        type: "input",
        message: "Tests:",
        name: "test",
      }, {
        type: "input",
        message: "Questions:",
        name: "questions",
      },
];

// function to generate readme file
function generatereadme(questions) {
  return `
  # ${questions.projectTitle}
  
  ## Table of Contents:

  * [Installing](#Installing)
  * [Usage](#Usage)
  * [Contributing](#Contributing)
  * [License](#License)
  
  ### Installing
  
  ${questions.installation}
      
  ## Usage
  
  ${questions.usage}

  ## Contributing
  
  ${questions.contributing}
  
  ## License

  ${licenseDc}

  ## Tests
  
  ${questions.test}
  `;
}

// function to initialize program
function init() {
    inquirer.prompt(questions)
    .then(function(questions) {
      switch (questions.license) {
        case "MIT":
          licenseDc = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
          break;       
      
        default:
          break;
      }
      const readme = generatereadme(questions)
      
      return writeFileAsync("readme.md", readme)
    })
    .then(function() {
        console.log("Generated Readme!")
    })
    .catch(function(err) {
      console.log(err)
    })
};

// function call to initialize program
init();
