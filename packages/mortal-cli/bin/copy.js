const copydir = require('copy-dir');

const fs = require('fs');

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

exports.checkMkdirExists = checkMkdirExists;
exports.copyDir = copyDir;
exports.mkdirGuard = mkdirGuard;
