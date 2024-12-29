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
  //拷贝文件夹
  //   function (argv) {
  //     inquirerPrompt(argv).then(answers => {
  //       const { name, type } = answers;

  //       const isMkdirExists = checkMkdirExists(
  //         path.resolve(process.cwd(), `./src/pages/${name}`)
  //       );

  //       if (isMkdirExists) {
  //         console.log(`${name}文件夹已存在`);
  //       } else {
  //         copyDir(
  //           path.resolve(__dirname, `./template/${type}`),
  //           path.resolve(process.cwd(), `./src/pages/${name}`)
  //         );
  //       }
  //     });
  //     }
  //拷贝文件
  function (argv) {
    inquirerPrompt(argv).then(answers => {
      const { name, type } = answers;

      const isMkdirExists = checkMkdirExists(
        path.resolve(process.cwd(), `./src/pages/${name}`)
      );

      if (isMkdirExists) {
        console.log(`${name}文件已存在`);
      } else {
        copyFile(
          path.resolve(__dirname, `./template/${type}/index.js`),
          path.resolve(process.cwd(), `./src/pages/${name}/index.js`),
          {
            name
          }
        );
      }
    });
  }
).argv;
