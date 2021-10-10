# Micro Services example using AWS Serverless

#### Copied this template from Codingly.io: Base Serverless Framework Template

https://codingly.io

## What's included

- Folder structure used consistently across our projects.
- [serverless-pseudo-parameters plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Allows you to take advantage of CloudFormation Pseudo Parameters.
- [serverless-bundle plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Bundler based on the serverless-webpack plugin - requires zero configuration and fully compatible with ES6/ES7 features.

## Getting started

```
sls create --name YOUR_PROJECT_NAME --template-url https://github.com/codingly-io/sls-base
cd YOUR_PROJECT_NAME
npm install
```

- serverless.yml defines the core resources for cloud formation
- reosurces/AuctionsTable.yml defines the table name dynamically based on the stage you are deploying to. AuctionsTable-${self:provider.stage}
- iam/AuctionsTableIAM.yml defines IAM roles required by Lambda (Lambda Access DyanmoDb. Each action such as putitem,getitem and scan are given seperate permissions)

- createAuction HTTP POST
- getAuctions HTTP GET
- getAuctions HTTP GET
- placeBid HTTP PATCH

- processAuctions Aws Event bridge rule

TIP: You can tail the log using `sls logs -f processAuctions -t` command.

