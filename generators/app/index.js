'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var expressive = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Be ' + chalk.red('Expressive.')
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
      this.fs.copy(
        this.templatePath('_index.html'),
        this.destinationPath('public/index.html')
      );
      this.fs.copy(
        this.templatePath('_main.scss'),
        this.destinationPath('scss/main.scss')
      );
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('_server.js'),
        this.destinationPath('server.js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },

  install: function () {
    this.npmInstall([ 'gulp', 'gulp-sass', 'gulp-plumber', 'gulp-autoprefixer', 'browser-sync'], {saveDev: true });
    this.npmInstall(['express'], { save: true });
  }
});

module.exports = expressive;
