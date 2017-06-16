# leanplum-java-script-sdk-sample

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.1.4.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

*** We are in the process of releasing the Javascript SDK on `npm`. In the meantime, you will need to locally link to the [Leanplum-javascript-SDK](https://github.com/Leanplum/Leanplum-JavaScript-SDK)

### Prepare the SDK

1. `cd Leanplum-Javascript-SDK`

2. `npm i`

3. `npm i -g grunt-cli`

4. `grunt build`

5. `npm link`

### Run Sample app

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `npm i -g gulp`

4. Run `npm link leanplum-javascript-sdk` to locally link the SDK

5. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
