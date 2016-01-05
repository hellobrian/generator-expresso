'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var expresso = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('Expresso Time.')
    ));

    var prompts = [
      {
        name: 'authorName',
        message: 'What is your name?'
      },
      {
        name: 'projectName',
        message: 'What is the name of your project?'
      }
    ];

    this.prompt(prompts, function (props) {
      this.authorName = props.authorName;
      this.projectName = props.projectName;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.template('views/index.html', 'views/index.html');
      this.template('package.json', 'package.json');
      this.copy('scss/main.scss', 'scss/main.scss');
      this.copy('gulpfile.js', 'gulpfile.js');
      this.copy('server.js', 'server.js');
      this.copy('bin/www', 'bin/www');
    },

    projectfiles: function () {
      this.copy('.editorconfig', '.editorconfig');
      this.copy('.gitignore', '.gitignore');
      this.copy('.sass-lint.yml', '.sass-lint.yml');
    }
  },

  install: function () {
    this.npmInstall([
      'gulp',
      'gulp-sass',
      'gulp-nodemon',
      'gulp-autoprefixer',
      'browser-sync',
      'run-sequence',
      'gulp-mocha',
      'gulp-sourcemaps',
      'del',
      'gulp-a11y'
    ], {saveDev: true });
    this.npmInstall(['express', 'express-nunjucks', 'morgan'], { save: true });
  },

  end: function () {
    this.log('\n');
    this.log('\n$ npm run dev');
    this.log('\n');
  }
});

module.exports = expresso;
