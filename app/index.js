'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');

var MarkdownGenerator = module.exports = function MarkdownGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  
  this.on('end', function () {
    this.installDependencies({ npm: true, skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MarkdownGenerator, yeoman.generators.Base);

MarkdownGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'input',
    name: 'defaultMdFile',
    message: "What's the name of your default markdown file?",
    default: _s.slugify(this.appname) + '.md'
  }];

  this.prompt(prompts, function (props) {
    this.defaultMdFile = props.defaultMdFile;
    this.defaultHtmlFile = this.defaultMdFile.replace('.md', '.html');

    cb();
  }.bind(this));
};

MarkdownGenerator.prototype.app = function app() {
  this.mkdir('html');

  this.copy('default.md', this.defaultMdFile);
  this.copy('_package.json', 'package.json');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
};
