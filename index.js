const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

function promptUserSecond() {
    return inquirer.prompt([{
        type: "input",
        name: "username",
        message: "What is your GitHub Username?"
    }]);
}

function promptUserFirst() {
    return inquirer.prompt([{
            type: "input",
            name: "title",
            message: "Project title ?"
        },
        {
            type: "input",
            name: "description",
            message: "Write a short description on the project ?"
        },
        {
            type: "input",
            name: "contents",
            message: "Table of contents ?"
        },
        {
            type: "input",
            name: "installation",
            message: "Installation procedure ?"
        },
        {
            type: "input",
            name: "usage",
            message: "Project walkthrough ?"
        },
        {
            type: "input",
            name: "license",
            message: "Licenses ?"
        },
        {
            type: "input",
            name: "contributions",
            message: "Any contributions ?"
        },
        {
            type: "input",
            name: "tests",
            message: "Any test cases ?"
        }
    ]);
}

promptUserFirst()
    .then(function(data) {
        appendFileAsync("Readme.md", `# Your Project Title\n${data.title}`);

    })
    // .then(function() {
    //     console.log("Successfully wrote to index.html");
    // })
    .catch(function(err) {
        console.log(err);
    })
    .then(function() {
        promptUserSecond()
            .then(function({ username }) {
                // const queryUrlrepo = `https://api.github.com/users/${username}/repos?per_page=100`;
                const queryUrlname = `https://api.github.com/users/${username}`;

                axios.get(queryUrlname).then(function(res) {
                    // console.log(res);
                    const data = generateReadmeLogin(res);
                    console.log("Readme.md Generated !");
                    return writeFileAsync("Readme.md", data);


                })
            })
            .catch(function(err) {
                console.log(err);
            });
    })



function generateReadmeLogin(res) {

    if (res.data.email === null) {
        var email = "Email is set to Private. Change Email privacy settings in Github, to log.";
    } else {
        var email = res.data.email;
    }
    var badgeLicense = '![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)';
    return `# Your Project Title:\nName: ${res.data.login}\n## Description:
    \nEmail: ${email}\n## Table of Contents\n* [Installation]
    (#installation)\n* [Usage](#usage)\n* [Credits](#credits)\n
    * [License](#license)\n## Installation\n## Usage\n## Credits\n
    ## License\n${badgeLicense}The last section of a good README is a 
    license. This lets other developers know what they can and cannot 
    do with your project. If you need help choosing a license, use 
    [https://choosealicense.com/](https://choosealicense.com/)\n
    ## Badges\n![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
    \n## Contributing`;
}