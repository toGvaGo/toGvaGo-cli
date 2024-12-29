const copydir = require('copy-dir');

const fs = require('fs');

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

exports.checkMkdirExists = checkMkdirExists;
exports.copyDir = copyDir;
exports.mkdirGuard = mkdirGuard;
exports.copyFile = copyFile;
