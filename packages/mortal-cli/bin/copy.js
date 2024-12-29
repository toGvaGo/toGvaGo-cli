const copydir = require('copy-dir');

const fs = require('fs');

const path = require('path');

//拷贝文件夹
function copyDir(from, to, options) {
  mkdirGuard(to);
  copydir.sync(from, to, options);
}

function checkMkdirExists(path) {
  return fs.existsSync(path);
}

function mkdirGuard(target) {
  try {
    fs.mkdirSync(target, { recursive: true });
  } catch (e) {
    mkdirp(target);
    function mkdirp(dir) {
      if (fs.existsSync(dir)) {
        return ture;
      }

      const dirname = path.dirname(dir);
      mkdirp(dirname);
      fs.mkdirSync(dir);
    }
  }
}

//拷贝文件
function copyFile(from, to) {
  const buffer = fs.readFileSync(from);
  const parentPath = path.dirname(to);

  mkdirGuard(parentPath);
  fs.writeFileSync(to, buffer);
}

//动态文件生成
const Mustache = require('mustache');

function readTemplate(path, data = {}) {
  const str = fs.readFileSync(path, { encoding: 'utf8' });
  return Mustache.render(str, data);
}

function copyTemplate(from, to, data = {}) {
  if (path.extname(from) !== '.tpl') {
    return copyFile(from, to);
  }
  const parentToPath = path.dirname(to);
  mkdirGuard(parentToPath);
  fs.writeFileSync(to, readTemplate(from, data));
}

exports.checkMkdirExists = checkMkdirExists;
exports.copyDir = copyDir;
exports.mkdirGuard = mkdirGuard;
exports.copyFile = copyFile;
exports.readTemplate = readTemplate;
exports.copyTemplate = copyTemplate;
