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
      this.template('_index.html', 'views/index.html');
      this.template('_package.json', 'package.json');
      this.copy('_main.scss', 'scss/main.scss');
      this.copy('_gulpfile.js', 'gulpfile.js');
      this.copy('_server.js', 'server.js');
      this.copy('_www', 'bin/www');
      this.copy('_sass-lint.yml', '.sass-lint.yml');
    },

    projectfiles: function () {
      this.copy('editorconfig', '.editorconfig');
      this.copy('gitignore', '.gitignore');
    }
  },

  install: function () {
    this.npmInstall([ 'gulp', 'gulp-sass', 'gulp-plumber', 'gulp-autoprefixer', 'browser-sync'], {saveDev: true });
    this.npmInstall(['express', 'express-nunjucks', 'morgan'], { save: true });
  },

  end: function () {
    this.log('\n');
    this.log('\n$ npm run dev');
    this.log('\n');
  }
});

module.exports = expresso;
