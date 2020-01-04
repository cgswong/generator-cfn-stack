# CloudFormation template generator

Scaffolding for new AWS CloudFormation template projects.

## Features

- `template.yaml`, and `parameters.json` files to root path

- `.editorconfig`, `.gitignore`, and `.gitattributes` files to root path

- Option to choose a test framework:

  - [taskcat](https://github.com/aws-quickstart/taskcat)

- `test` directory with an example test based on test framework selection

- `.pre-commit-config.yaml` for `cfn-lint`, and other checks

## Prerequisites

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- [cfn-lint](https://github.com/aws-cloudformation/cfn-python-lint)
- [pre-commit](https://pre-commit.com/#install)
- For tests
  - **taskcat**

## Installation

1. Install [nodejs](https://nodejs.org/en/download/) `pro tip: use nvm`

2. Install Yeoman

   ```bash
   npm install -g yo
   ```

3. Install this generator

   ```bash
   npm install -g cfn-stack
   ```

## Usage

To use the included generator execute the below command in shell and provide your new module name for the prompt

```bash
> yo cfn-stack
...
? Enter name for the new CloudFormation template:  example-module
? Enter description for the new CloudFormation template:  Example CloudFormation template
? Enter author name:  jdoe
? Choose test framework (use arrow keys)
❯ taskcat
```

Project layout generated for the new CloudFormation template with _taskcat_ selection

```text
hello_world
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .pre-commit-config.yaml
├── README.md
├── template.yaml
├── parameters.json
├── events
│   └── event.json
├── functions
│   └── src
│       └── hello_world
│           ├── __init__.py
│           ├── lambda.py
│           └── requirements.txt
└── test
```

### Post generation steps

1. On the generated template's root path, initialize the git repository:

   ```bash
   git init
   ```

2. On the generated template's root path, install pre-commit hooks:

   ```bash
   pre-commit install
   ```

## Contribution

Found a bug? feel free to raise an issue. Pull requests are always welcome. Keen to review and merge.

## Maintainer

This project is maintained by [cgswong](https://github.com/cgswong)

### License

MIT
