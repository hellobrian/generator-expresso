'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

var files = [
  'package.json',
  '.editorconfig',
  '.gitignore',
  '.sass-lint.yml',
  'server.js',
  'gulpfile.js',
  'bin/www',
  'scss/main.scss',
  'views/index.html'
]

describe('expresso:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file(files);
  });
});
