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

    var files = fs.readdirSync('./');

    const repo = core.getInput('repo');

    
    console.log(JSON.stringify(repo, null, '\t'));


    shell.cd('./')
    shell.exec('git clone ' + repo )
    
    console.log(JSON.stringify(files, null, '\t'));


    core.setOutput("files : ", files.toString());


    console.log(JSON.stringify(github, null, '\t'));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
