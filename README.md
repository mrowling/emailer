# Emailer

A [Node.js](https://github.com/nodejs/node) project in [TypeScript](https://github.com/Microsoft/TypeScript)

- [TypeScript](https://github.com/Microsoft/TypeScript) for ES6 transpilation and Type definitions for Node.js v10 and Jest
- [TSLint](https://github.com/palantir/tslint), [.editorconfig](https://editorconfig.org/) and [Prettier](https://github.com/prettier/prettier)for consistent file formatting.
- [Jest](https://github.com/facebook/jest) unit testing and code coverage,
- [TypeORM](https://github.com/typeorm/typeorm) for Entity management
- [NPM scripts for common operations](#available-scripts),
- Examples of Typescript Unit Tests using [ts-jest](https://github.com/kulshekhar/ts-jest)

This application exposes a REST API that send emails on behalf of a user. It connects to multiple third party email service providers with a failover mechanism to use different providers as required.

## Quick start

This project is intended to be used with v10 LTS release of [Node.js](https://github.com/nodejs/node) or newer and [NPM](https://github.com/npm/cli). Make sure you have those installed.

An `example.env` file is provided in this repository, these can be configured as required in your environment.


### Authentication

In a real world scenario, authentication / security requires a large amount of forethought, effort and consideration. Rather than implement a half baked password solution, in this implementation a user is not required to be authorised.

### API Documentation

**Send Email**
----

* **URL:**

  /v1/send

* **Method:**
  
  `POST`


* **Data Params**

   **Required:**
 
   `to=[string]`
   `subject=[string]`
   `text=[string]`

   **Optional:**
 
   `cc=[string]`
   `bcc=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success : true }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'Validation error: child "subject" fails because ["subject" is required]' }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: "Unable to succesfully send email" }`

* **Sample Call:**

```
curl -X POST \
  http://localhost:8080/v1/email \
  -H 'Content-Type: application/json' \
  -d '{
    "to": "mitchell.rowling@gmail.com,to@erinandmitchell.com",
    "cc": "cc@erinandmitchell.com,copy@erinandmitchell.com",
    "bcc": "bcc@erinandmitchell.com,blind@erinandmitchell.com",
    "subject": "Hello World",
    "text": "Enjoy your email!"
  }'
```

### Testing

Functional tests are located in the `__tests__` directory. Unit Tests are stored alongside their associated source files with the suffix `*.spec.ts`.

This will also produce a code coverage report. Due to time limitations, Code Coverage is currently very low, however the core concepts are demonstrated and can be hooked into a CI/CD pipeline.

## Available scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `build` - transpile TypeScript to ES6,
- `watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests
- `start` - starts the node application
- `start` - starts the node application and starts the debugger
