# aws-lamba-whereis

[![Build Status](https://travis-ci.org/tsamaya/aws-lambda-whereis.svg?branch=master)](https://travis-ci.org/tsamaya/aws-lambda-whereis) [![codecov](https://codecov.io/gh/tsamaya/aws-lambda-whereis/branch/develop/graph/badge.svg)](https://codecov.io/gh/tsamaya/aws-lambda-whereis)

:warning: work in progress with webpack / es6

## Quick start

### Prerequisites

- node, npm or yarn
- serverless : `$ npm install -g serverless`
- what3words API key : [register](https://accounts.what3words.com/)
- opencagedata API key : [register](https://geocoder.opencagedata.com/users/sign_up)
- google API key : [register](https://developers.google.com/)

### AWS - Credentials
To deploy; an AWS account is needed, AWS lambda is available with the free tier account for 12 months : https://aws.amazon.com/lambda/pricing/

[Watch the video on setting up credentials](https://www.youtube.com/watch?v=KngM5bfpttA)

or look at serverless documentation about [credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

Adding a profile on the AWS config

    $ serverless config credentials --provider aws --key <YOUR-AWS-KEY> --secret <YOUR-AWS-SECRET> --profile <namedProfile>

### Clone the repo

	$ git clone https://github.com/tsamaya/aws-lambda-whereis.git

	$ cd aws-lambda-whereis

### Setup

	$ npm i

create `environment.yml` file

    $ serverless env --attribute GOOGLE_API_KEY --value <YOUR-GOOGLE-API-KEY> --stage dev

    $ serverless env --attribute W3W_API_KEY --value <YOUR-W3W-API-KEY> --stage dev

    $ serverless env --attribute OPEN_CAGE_DATA_API_KEY --value <YOUR-OPEN-CAGE-DATA-API-KEY> --stage dev

create `.env` file

    $ serverless env generate

### Running locally

    $ sls offline start

#### sunny tests

  $ curl "http://localhost:3000/whereis?lat=40.714224&lng=-73.961452"

  $ curl "http://localhost:3000/whereisocd?lat=40.714224&lng=-73.961452"

  $ curl "http://localhost:3000/whereisw3w?addr=index.home.raft"

#### rainy tests

    $ curl "http://localhost:3000/whereis"

    $ curl "http://localhost:3000/whereis?lat=40.714224"

    $ curl "http://localhost:3000/whereis?lat=aa&lng=bb"

### deploy

    $ sls --aws-profile <namedProfile> deploy

## How to ?

- `$ npm i -g serverless`

- `$ serverless create --template aws-nodejs --path aws-lambda-whereis`

```
Serverless: Generating boilerplate...
Serverless: Generating boilerplate in "/Users/tsamaya/github/aws-lambda-whereis"
 _______                             __
|   _   .-----.----.--.--.-----.----|  .-----.-----.-----.
|   |___|  -__|   _|  |  |  -__|   _|  |  -__|__ --|__ --|
|____   |_____|__|  \___/|_____|__| |__|_____|_____|_____|
|   |   |             The Serverless Application Framework
|       |                           serverless.com, v1.24.1
 -------'

Serverless: Successfully generated boilerplate for template: "aws-nodejs"
```

- `$ cd aws-lambda-whereis && npm init -y`

adding dependencies

- `$ npm i -S axios dotenv`

adding environment file genrator to store API keys and the offline

- `$ npm i -D serverless-env-generator serverless-offline`

edit serverless.yml file, adding :

```yaml
plugins:
  - serverless-env-generator
  - serverless-offline

# Plugin config goes into custom:
custom:
  envFiles: #YAML files used to create .env file
    - environment.yml
```

create `environment.yml` file to store API keys:

    $ serverless env --attribute GOOGLE_API_KEY --value <YOUR-GOOGLE_API_KEY> --stage dev

    $ serverless env --attribute W3W_API_KEY --value <YOUR-W3W-API-KEY> --stage dev

edit `serverless.yml` file, find

```yaml
functions:
  hello:
    handler: handler.hello
```

replace by

```yaml
functions:
  whereIs:
    handler: handler.whereIs
    events:
      - http:
          path: whereis
          method: get
          cors: true
          request:
            parameters:
              querystrings:
                lat: false
                lng: false
                w3w: false
                addr: false
```

edit package.json file, find :

> TDOD adding dev dependencies

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

replace by

```json
"scripts": {
  "lint": "eslint .",
  "pretest": "npm run lint",
  "test": "jest"
},
```

## Resources

- [serverless](https://serverless.com)

## Licensing

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE.md) file.
