#!/usr/bin/env node
const packager = require('electron-packager');
const path = require('path');

packager({
  dir: './',
  out: path.join(__dirname, '../release/macosx'),
  overwirte: true,
  platform: 'darwin',
  arch: 'x64',
  ignore: [
    '.vscode',
    '.editorconfig',
    '.eslintignore',
    '.eslintrc',
    '.gitignore',
    '.npmignore',
    'npm-debug.log',
    'example',
    'scripts',
    'app',
    'main.development.js',
    'release',
    'node_modules',
  ],
  asar: false,
  version: '1.3.5',
  prune: true,
}, function(err, appPaths) {
  console.error(err);
});
