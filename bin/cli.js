#!/usr/bin/env node

// const { exeSync } = require("child_process");

// const runCommand = (command) => {
//   try {
//     console.log("Downloading files...");
//     exeSync(`${command}`, { stdio: "inherit" });
//   } catch (e) {
//     console.log(`Failed to execute ${command}`, e);
//     return false;
//   }
//   return true;
// };
// const repoName = process.argv[2];
// const gitCheckoutCommand = `git clone --dept 1 http://github.com/hhimanshu/react-starter ${repoName}`;
// const installDepCommand = `cd ${repoName} && ${repoName}`;

// console.log(`cloning the repository with ${repoName}`);
// const checkout = runCommand(gitCheckoutCommand);

// if (!checkout) process.exit(code);

// console.log(`Installing dependencies for ${repoName}`);
// const installDep = runCommand(installDepCommand);

// if (!installDep) process.exit(code);

// console.log("Congratulations you are ready. Follow the command to start");

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("my boilerplate");
  console.log("For example :");
  console.log("    npx create-my-boilerplate my-app");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/unegbuclinton/reacr-tsx-boilerplate.git";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(
      `The file ${projectName} already exist in the current directory, please give it another name.`
    );
  } else {
    console.log(err);
  }
  process.exit(1);
}

async function main() {
  try {
    console.log("Downloading files...");
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log("Installing dependencies...");
    execSync("npm install");

    console.log("Removing useless files");
    execSync("npx rimraf ./.git");
    fs.rmdirSync(path.join(projectPath, "bin"), { recursive: true });

    console.log("The installation is done, this is ready to use !");
  } catch (error) {
    console.log(error);
  }
}
main();
