#!/usr/bin/env node

const yargs = require('yargs');
const { inquirerPrompt } = require('./inquirer');

const path = require('path');
const { copyDir, checkMkdirExists } = require('./copy');

yargs.command(
  ['create', 'c'],
  '新建一个模板',
  function (yargs) {
    return yargs.option('name', {
      alias: 'n',
      demand: true,
      describe: '模板名称',
      type: 'string'
    });
  },
  function (argv) {
    inquirerPrompt(argv).then(answers => {
      const { name, type } = answers;

      const isMkdirExists = checkMkdirExists(
        path.resolve(process.cwd(), `./src/pages/${name}`)
      );

      if (isMkdirExists) {
        console.log(`${name}文件夹已存在`);
      } else {
        copyDir(
          path.resolve(__dirname, `./template/${type}`),
          path.resolve(process.cwd(), `./src/pages/${name}`)
        );
      }
    });
  }
).argv;
