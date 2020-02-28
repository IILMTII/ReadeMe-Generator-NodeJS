const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "username",
            message: "What is your GitHub Username?"
        },
        {
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

// function generateHTML(answers) {
//     return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
//   <title>Document</title>
// </head>
// <body>
//   <div class="jumbotron jumbotron-fluid">
//   <div class="container">
//     <h1 class="display-4">Hi! My name is ${answers.name}</h1>
//     <p class="lead">I am from ${answers.location}.</p>
//     <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
//     <ul class="list-group">
//       <li class="list-group-item">My GitHub username is ${answers.github}</li>
//       <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
//     </ul>
//   </div>
// </div>
// </body>
// </html>`;
// }

promptUser()
    .then(function({ username }) {
        const queryUrlrepo = `https://api.github.com/users/${username}/repos?per_page=100`;
        const queryUrlname = `https://api.github.com/users/${username}`;

        // axios.get(queryUrlname).then(function(res) {
        //     // const repoNames = res.data.map(function(repo) {
        //     //     return repo.name;
        //     // });
        //     console.log(res);
        //     console.log(res.data.login);
        //     console.log(res.data.email);
        //     if (res.data.email === null) {
        //         console.log("Email set to Private. Change Email privacy settings in Github to log.");
        //     }
        //     // const repoNamesStr = repoNames.join("\n");

        //     // fs.writeFile("repos.txt", repoNamesStr, function(err) {
        //     //     if (err) {
        //     //         throw err;
        //     //     }

        //     //     console.log(`Saved ${repoNames.length} repos`);
        //     // });
        // });
        // axios.get(queryUrlname).then(function(res) {

        //     console.log(res);
        //     console.log(res.data.login);
        //     console.log(res.data.email);
        //     if (res.data.email === null) {
        //         console.log("Email set to Private. Change Email privacy settings in Github to log.");
        //     }

        // });
        axios.get(queryUrlname).then(function(res) {
            console.log(res);
            console.log("Readme.md Generated !");
            const data = generateReadme(res);

            return writeFileAsync("Readme.md", data);

        })



    });
// .then(function(answers) {
//         const html = generateHTML(answers);

//         return writeFileAsync("index.html", html);
//     })
//     .then(function() {
//         console.log("Successfully wrote to index.html");
//     })
//     .catch(function(err) {
//         console.log(err);
//     });


function generateReadme(res) {

    if (res.data.email === null) {
        var email = "Email is set to Private. Change Email privacy settings in Github, to log.";
    } else {
        var email = res.data.email;
    }
    var badgeLicense = '[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)]';
    return `# Your Project Title\nName: ${res.data.login}\n## Description\nEmail: ${email}\n## Table of Contents\n* [Installation](#installation)\n* [Usage](#usage)\n* [Credits](#credits)\n* [License](#license)\n## Installation\n## Usage\n## Credits\n## License\n${badgeLicense}
    The last section of a good README is a license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, use [https://choosealicense.com/](https://choosealicense.com/)\n## Badges\n![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)\n## Contributing`;
}