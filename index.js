const core = require('@actions/core');
const wait = require('./wait');
const github = require("@actions/github")
var fs = require('fs');
const shell = require('shelljs')

const process = require('process');



// most @actions toolkit packages have async methods
async function run() {
  try {
    var name = core.getInput('who-to-greet') ? core.getInput('who-to-greet') : 'cong';

    var repo = core.getInput('repo') ? core.getInput('repo')
    : 'https://github.com/gabyshev/testapp';
    var app_name = core.getInput('app-name') ? core.getInput('app-name') : 'testapp';

    console.log(`Hello ${name}`);

    const time = new Date();
    core.setOutput("time", time.toTimeString());



    
    console.log(JSON.stringify(repo, null, '\t'));



    if(!fs.existsSync(`./${app_name.toString()}`)){
      shell.cd('./')
      shell.exec(`git clone ${repo.toString()}` )
      var files = fs.readdirSync(`./${app_name.toString()}`);
  
      
      console.log(JSON.stringify(files, null, '\t'));
      core.setOutput("files : ", files.toString());

  
      // console.log(JSON.stringify(github, null, '\t'));
    }else{
      shell.cd(`./${app_name.toString()}`)
      shell.exec(`git fetch && git checkout main` )
     var file_s = fs.readdirSync('./');
       console.log(JSON.stringify(file_s, null, '\t'));
      core.setOutput("files : ", file_s.toString());

    }

    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
