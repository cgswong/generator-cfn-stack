'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {
    this.log(
      yosay('Welcome to the cfn-stack generator v0.1.0!')
    );

    this.answers = await this.prompt([{
        type: 'input',
        name: 'name',
        message: 'Enter name for the new CloudFormation stack: ',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter description for the new CloudFormation stack: ',
      },
      {
        type: 'input',
        name: 'author',
        message: 'Enter author name: ',
      },
      {
        type: 'list',
        name: 'testFramework',
        message: 'Choose test framework',
        choices: [{
            name: 'taskcat',
            value: '1',
            checked: true
          },
          {
            name: 'None',
            value: '2'
          },
        ]
      }
    ]);
  }

  writing() {
    this.destinationRoot(this.answers.name);

    // this.fs.copyTpl(
    //  `${this.templatePath()}/.!(gitignorefile|gitattributesfile|pre-commit-config|editorconfig)*`,
    //  this.destinationRoot(),
    //  this.props
    //);

    this.fs.copyTpl(
      this.templatePath('.gitignorefile'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('.gitattributesfile'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copyTpl(
      this.templatePath('.pre-commit-config.yaml'),
      this.destinationPath('.pre-commit-config.yaml')
    );

    this.fs.copyTpl(
      this.templatePath('.editorconfig'),
      this.destinationPath(`.editorconfig`)
    );

    this.fs.copy(
      this.templatePath('template.yaml'),
      this.destinationPath('template.yaml')
    );

    this.fs.copy(
      this.templatePath('parameters.json'),
      this.destinationPath('parameters.json')
    );

    mkdirp('.packages')

    this.fs.copy(
      this.templatePath('functions/**'),
      this.destinationPath('functions/')
    );

    mkdirp('functions/.packages')

    this.fs.copy(
      this.templatePath('events/*.json'),
      this.destinationPath('events/')
    );

    if (this.answers.testFramework === '1') {
      this.fs.copyTpl(
        `${this.templatePath()}/test/taskcat/.*.yml`,
        this.destinationRoot()
      );
    } else {
      this.fs.copyTpl(
        `${this.templatePath()}/test/taskcat/.taskcat.yml`,
        this.destinationRoot()
      );
    }

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
        name: this.answers.name,
        description: this.answers.description,
        author: this.answers.author,
        testFramework: this.answers.testFramework
      }
    );
  }
};