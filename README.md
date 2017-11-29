# aws-lamba-whereis

[![Build Status](https://travis-ci.org/tsamaya/aws-lambda-whereis.svg?branch=master)](https://travis-ci.org/tsamaya/aws-lambda-whereis)

## Quick start

### Prerequisites

- node, npm or yarn
- serverless : `$ npm install -g serverless`
- what3words API key : [register](https://accounts.what3words.com/)

### AWS - Credentials
[Watch the video on setting up credentials](https://www.youtube.com/watch?v=KngM5bfpttA)

or look at serverles documentatoon about [credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

Adding a profile on the AWS config

    $ serverless config credentials --provider aws --key <YOUR-AWS-KEY> --secret <YOUR-AWS-SECRET> --profile <namedProfile>

### Clone the repo

	$ git clone https://github.com/tsamaya/aws-lambda-whereis.git

	$ cd aws-lambda-whereis

### Setup

	$ npm i

create `environment.yml` file

    $ serverless env --attribute GOOGLE_API_KEY --value <YOUR-GOOGLE_API_KEY> --stage dev

    $ serverless env --attribute W3W_API_KEY --value <YOUR-W3W-API-KEY> --stage dev

### Quick test

    $ sls offline start

sunny tests:

  $ curl "http://localhost:3000/whereis?lat=40.714224&lng=-73.961452"

rainy tests:

    $ curl "http://localhost:3000/whereis"

    $ curl "http://localhost:3000/whereis?lat=40.714224"

    $ curl "http://localhost:3000/whereis?lat=aa&lng=bb"

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

create `environment.yml` file to store API keys

- `$ serverless env --attribute W3W_API_KEY --value $W3W_API_KEY --stage dev`

- `$ serverless env --attribute W3W_API_KEY --value $W3W_API_KEY --stage dev`

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
                lat: true
                lng: true
```

edit package.json file, find :

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

replace by

```json
"scripts": {
  "lint": "eslint .",
  "test": "npm run lint"
},
```

## Resources

- [serverless](https://serverless.com)

## Licensing

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE.md) file.
