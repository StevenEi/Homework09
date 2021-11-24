var fs = require("fs")
var inquirer = require("inquirer")

var ReadmeContent = new Promise(function (resolve) {
    resolve(inquirer.prompt([
        {
            type: "input",
            name: "Title",
            message: "What is the title of your project?",
        },
        {
            type: "input",
            name: "Description",
            message: "Describe your project",
        },
        {
            type: "input",
            name: "Installation",
            message: "What are the necessary steps to install your project, if any? (Beyond npm registry and associated packages)",
        },
        {
            type: "input",
            name: "Usage",
            message: "What are the instructions and examples for use of this project? (Add screenshots here)",
        },
        {
            type: "input",
            name: "Contributors",
            message: "Who were the contributors toward this project?",
        },
        {
            type: "input",
            name: "Tests",
            message: "Add any testing information and applicable instructions here",
        },
        {
            type: "input",
            name: "QuestionGitHub",
            message: "Please enter your GitHub username",
        },
        {
            type: "input",
            name: "QuestionEmail",
            message: "Please enter your email for possible questions",
        },
        {
            type: "list",
            name: "License",
            message: "Choose the applicable license for your project",
            choices: [
                "Apache 2.0 License",
                "Boost Software License 1.0",
                "BSD 3-Clause License",
                "BSD 2-Clause License",
                "CC0",
                "Attribution 4.0 International",
            ],
        }
    ])
    )
});

ReadmeContent.then(function(data){

licenseChoice(data);

const md = `# ${data.Title}

${licenseBadge}
## Project Description 
${data.Description}

# Table of Contents 
1. [Installation Information](#installation-information)
2. [Usage](#usage)
3. [Contributors](#contributors)
4. [Tests](#tests)
5. [Questions](#questions)
6. [Licensing](#licensing)

## Installation Information
Install the npm registry using "npm install" in the console and then install any desired packages by typing "[package name] install" <br /> 
${data.Installation} 

## Usage 
${data.Usage}

## Contributors 
${data.Contributors}

## Tests 
${data.Tests}

## Questions 
Please refer to my GitHub for other repositories and associated source code. Please send any questions concerning my projects to the email listed below. <br />
Github account: https://github.com/${data.QuestionGitHub} <br /> 
Send me an email at: ${data.QuestionEmail}
    
## Licensing 
This application is covered by the ${data.License} license.
`;
    fs.writeFile('README.md', md, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('Success!');
    });
})

function licenseChoice (data) {
    switch(data.License) {
        case "Apache 2.0 License":
            licenseBadge = "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
            break;
        case "Boost Software License 1.0":
            licenseBadge = "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)"
            break;
        case "BSD 3-Clause License":
            licenseBadge = "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"
            break;
        case "BSD 2-Clause License":
            licenseBadge = "[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)"    
            break;
        case "CC0":
            licenseBadge = "[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)"
            break;
        case "Attribution 4.0 International":
            licenseBadge = "[![License:(https://licensebuttons.net/l/by/4.0/80x15.png)](https://creativecommons.org/licenses/by/4.0/)"
            break;
    }
}