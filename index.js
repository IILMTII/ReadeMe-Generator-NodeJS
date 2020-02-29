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
            message: "What's the project title ?"
        },
        {
            type: "input",
            name: "description",
            message: "Please write a short description on the project:"
        },
        {
            type: "checkbox",
            name: "Installation",
            message: "Installation procedure ?",
            choices: [
                "Download folder from Github and Run .exe from local storage.",
                "Git clone program folder and install dependencies.",
                "Download package installer from website."
            ]
        },
        {
            type: "input",
            name: "Usage",
            message: "Enter a typical use case for this project ?"
        },
        {
            type: "input",
            name: "License",
            message: "Licenses ?"
        },
        {
            type: "checkbox",
            name: "badges",
            message: "Select some badges for your project:",
            choices: [
                "![GitHub license](https://img.shields.io/badge/GitHub-git-green.svg)",
                "![JavaScript Badge](https://img.shields.io/badge/JavaScript-ES6-blue.svg)",
                "![NodeJS Badge](https://img.shields.io/badge/NodeJS-v.10-lightgreen.svg)",
                "![Bootstrap Badge](https://img.shields.io/badge/Bootstrap-v.4.0-purple.svg)"
            ]
        },
        {
            type: "input",
            name: "Contributions",
            message: "Any contributions ?"
        },
        {
            type: "input",
            name: "Tests",
            message: "Any test cases ?"
        }
    ]);
}

promptUserFirst()
    .then(function(data) {
        console.log(data);
        var badgeLicense = '![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)';
        writeFileAsync("Readme.md", `# ${data.title}\n## Description:\n${data.description}\n## Table of Contents:\n* [Installation](#Installation)
        \n* [Usage](#Usage)\n* [Contributions](#Contributions)\n* [Test Cases](#Tests)\n* [Licenses](#License)\n* [Badges](#badges)
        \n## Installation:\n${data.Installation}\n## Usage:\n${data.Usage}\n## Contributions: \n${data.Contributions}
        \n## Test Cases:\n${data.Tests} \n## Licenses: \n${badgeLicense} 
         \n${data.License} \n## Badges:\n${data.badges}`);

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
                    console.log(res);
                    const data = generateReadmeLogin(res);
                    console.log("Readme.md Generated !");
                    return appendFileAsync("Readme.md", data);


                })
            })
            .catch(function(err) {
                console.log(err);
            });
    })



function generateReadmeLogin(res) {

    if (res.data.email === null) {
        var email = "Email is set to Private. Contact me on LinkedIn !";
    } else {
        var email = res.data.email;
    }

    return `
    \n## Questions ?, Contact:\n<p align="left"><img width="100" height="100" src=${res.data.avatar_url}></p>
     \n**Name:** ${res.data.login}, \n**Email:** ${email}`;
}