# Bucket_List

Bucketlist is a mini app where a logged in user can input a number of experiences or achievements that a he hopes to have or accomplish during his lifetime

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Testing](#testing)
  - [Development](#development)

### API Deployment

API is deployed at [Bucketlist Heroku App](https://bucketlist01.herokuapp.com/)

### Documentation

Documentation was done with swagger and hosted at [SwaggerHub](https://app.swaggerhub.com/apis-docs/BucketList/bucket-list/1.0.0)

## Technologies

- [NodeJS](https://nodejs.org/) - Runtime Environment
- [Anugular](https://angular.io/) - Frontend Framework Powered by Google
- [ExpressJs](https://expressjs.com/) - Web Application Framework
- [NPM](https://www.npmjs.com/) - Dependency Manager
- [HTML](https://www.w3c.com/) - Hyper Text Markup language
- [CSS](https://www.w3c.com/) - Casacading Style Sheet

## Requirements

- Node.js v10.x or higher
- npm
- MongoDB instance (local or remote)

### Supporting Packages

#### Linter(s)

- [ESLint](https://eslint.org/) - Linter Tool to adhere to standards using AirBnB.

#### Compiler

- [Babel](https://babel.io/) - Compiler for Next Generation JavaScript

## Features

### Users

- User can sign up
- User can sign in
- User (authenticated) can view profile
- User (authenticated) can create a bucketlist.
- User (authenticated) can edit a specific bucketlist.
- User (authenticated) can delete a specific bucketlist.
- User (authenticated) can view a specific bucketlist.
- User (authenticated) can view all bucketlist.
- User (authenticated) can view all bucketlist with a specific name.
- User (authenticated) can view all bucketlist with a pagination.
- User (authenticated) can post bucketlist items.
- User (authenticated) can edit bucketlist items.
- User (authenticated) can delete bucketlist items.

## API Endpoints

<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th></tr>
<tr><td>POST</td><td>api/v2/auth/signUp</td><td>Creates a new user</td></tr>
<tr><td>POST</td><td>api/v2/auth/signIn</td><td>User login</td></tr>
<tr><td>GET</td><td>/api/v2/auth</td><td>User profile details</td></tr>

<tr><td>POST</td><td>/api/v2/bucketlists</td><td>Creates a new bucketlist</td></tr>
<tr><td>GET</td><td>/api/v2/bucketlists</td><td>View all bucketlists</td></tr>
<tr><td>GET</td><td>/api/v2/bucketlists?name=xxxx</td><td>View all bucketlists with the name passed</td></tr>
<tr><td>GET</td><td>/api/v2/bucketlists?page=xxxx&limit=xxxx</td><td>View all bucketlists with pagination</td></tr>
<tr><td>PUT</td><td>/api/v2/bucketlists/<:id></td><td>Update a specific buckelist</td></tr>
<tr><td>GET</td><td>/api/v2/bucketlists/<:id></td><td>Get a specific buckelist</td></tr>
<tr><td>DELETE</td><td>/api/v2/bucketlists/<:id></td><td>Delete a specific buckelist</td></tr>
<tr><td>POST</td><td>/api/v2/bucketlists/<:id>/items</td><td>Add an item to a bucketlist</td></tr>
<tr><td>PUT</td><td>/api/v2/bucketlists/<:bucket_id>/items/<:item_id></td><td>Update an item from a bucket list</td></tr>
<tr><td>DELETE</td><td>/api/v2/bucketlists/<:bucket_id>/items/<:item_id></td><td>Delete an item from a bucket list</td></tr>

</table>

## Getting Started

### Installation

- git clone
  [Bucketlist](https://github.com/judeokafor/bucketlist.git)
- Run - npm install to install packages
- Run npm run build to build the project
- Run npm run dev to start the backend server for development
- Cd into angular-src and run ng serve to start the server for development
- Run npm start to start the server for production
- Navigate to [localhost:4200](http://localhost:4200/) in browser to access the frontend
- Navigate to [localhost:6060](http://localhost:6060/) in postman to access the
  application

**NOTE:** Create a `.env` file configuration following the `.sample.env`.

### Testing

#### Prerequisites

- [Postman](https://getpostman.com/) - API Toolchain

#### Testing with Postman

- After installing as shown above
- Navigate to [localhost:6060](http://localhost:6060/) in
  [Postman](https://getpostman.com/) to access the application

### Development

You can run npm run dev in development to use [Nodemon](https://nodemon.io/)

[Nodemon](https://nodemon.io/) restarts your code after a file change or type 'rs' to restart.
