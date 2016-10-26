#!/usr/bin/env node
const packager = require('electron-packager');
const path = require('path');

packager({
  dir: './dist',
  out: path.join(__dirname, '../release/macosx'),
  overwrite: true,
  platform: 'darwin',
  arch: 'x64',
  asar: false,
  version: '1.3.5',
  prune: false,
}, function(err, appPaths) {
  console.error(err);
});
