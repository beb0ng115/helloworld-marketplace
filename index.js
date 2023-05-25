const core = require('@actions/core');
const wait = require('./wait');
const github = require("@actions/github")
var fs = require('fs');
const shell = require('shelljs')




// most @actions toolkit packages have async methods
async function run() {
  try {
    const name = core.getInput('who-to-greet');
    console.log(`Hello ${name}`);

    const time = new Date();
    core.setOutput("time", time.toTimeString());


    const repo = core.getInput('repo');
    const app_name = core.getInput('app-name');


    
    console.log(JSON.stringify(repo, null, '\t'));


    shell.cd('./')
    shell.exec(`git clone ${repo.toString()}` )

    core.setOutput("repo", repo.toString());
    var files = fs.readdirSync(`./${app_name.toString()}`);

    
    console.log(JSON.stringify(files, null, '\t'));


    core.setOutput("files : ", files.toString());


    console.log(JSON.stringify(github, null, '\t'));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
