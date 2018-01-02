# How to ?

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
