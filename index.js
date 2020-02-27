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
    }]);
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
    return `
    # Your Project Title
    Name: ${res.data.login}
    ## Description 
    Email: ${email}
    Your GitHub profile is an extremely important aspect of your public identity as a developer. A well-crafted one allows you to show off your work to other developers as well as potential employers. An important component of your GitHub profile—and one that many new developers often overlook—is the README.md file.
    
    The quality of a README often differentiates a good project from a bad project. A good one takes advantage of the opportunity to explain and showcase what your application does, justify the technologies used, and even talk about some of the challenges you faced and features you hope to implement in the future. A good README helps you stand out among the large crowd of developers putting their work on GitHub.
    
    There's no one right way to structure a good README. There is one very wrong way, however, and that is to not include a README at all or to create a very anemic one. This guide outlines a few best practices. As you progress in your career, you will develop your own ideas about what makes a good README.
    
    At a minimum, your project README needs a title and a short description explaining the what, why, and how. What was your motivation? Why did you build this project? (Note: The answer is not "Because it was a homework assignment.") What problem does it solve? What did you learn? What makes your project stand out? If your project has a lot of features, consider adding a heading called "Features" and listing them here.
    
    If you're new to Markdown, read the GitHub guide on [Mastering Markdown](https://guides.github.com/features/mastering-markdown/).
    
    If you need an example of a good README, check out [the VSCode repository](https://github.com/microsoft/vscode).
    
    
    ## Table of Contents (Optional)
    
    If your README is very long, add a table of contents to make it easy for users to find what they need.
    
    * [Installation](#installation)
    * [Usage](#usage)
    * [Credits](#credits)
    * [License](#license)
    
    
    ## Installation
    
    What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.
    
    
    ## Usage 
    
    Provide instructions and examples for use. Include screenshots as needed. 
    
    
    ## Credits
    
    List your collaborators, if any, with links to their GitHub profiles.
    
    If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.
    
    If you followed tutorials, include links to those here as well.
    
    
    
    ## License
    
    The last section of a good README is a license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, use [https://choosealicense.com/](https://choosealicense.com/)
    
    
    ---
    
    🏆 The sections listed above are the minimum for a good README, but your project will ultimately determine the content of this document. You might also want to consider adding the following sections.
    
    ## Badges
    
    ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
    
    Badges aren't _necessary_, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.
    
    
    ## Contributing
    
    If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own.
    
    ## Tests
    
    Go the extra mile and write tests for your application. Then provide examples on how to run them.
    
    
    ---
    © 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.`;
}