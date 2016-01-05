'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const introMessage = () => {
  console.log(
    `
    [Expresso]

    A generator for scaffolding a simple express app:

    * Nunjucks
    * SCSS
    * Gulp
    * Mocha
    * a11y
    `
  );
}

var expresso = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    introMessage();

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
    this.log(`

      Expresso has successfully completed your express scaffold!

      Run the app:
      $ npm run dev

      Then visit http://localhost:3000

      `);
  }
});

module.exports = expresso;
