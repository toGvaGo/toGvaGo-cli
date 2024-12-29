#!/usr/bin/env node

const yargs = require('yargs');

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
    console.log('argv', argv);
  }
).argv;
