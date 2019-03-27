[![Build Status](https://travis-ci.org/daisymacharia/SMS-Management-Application.svg?branch=master)](https://travis-ci.org/daisymacharia/SMS-Management-Application)
[![Coverage Status](https://coveralls.io/repos/github/daisymacharia/SMS-Management-Application/badge.svg?branch=api%2Ftesting)](https://coveralls.io/github/daisymacharia/SMS-Management-Application?branch=api%2Ftesting)

# SMS-Management-Application

An SMS-Management-Application is a system that enables users send sms to each other

### Features

- Contacts can be created with the following fields:
  - First name
  - Last name
  - Phone number
- Contact can send an sms to another existing contact
- The status of the message is set as sent when a message has been sent
- When a contact is deleted, all messages associated with that contact are also deleted

### Technologies used

- [NodeJs](https://nodejs.org/en) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express - fast node.js network app framework
- [PostgreSQL](https://www.postgresql.org/)- The Relational database
- [Sequelize.js](http://docs.sequelizejs.com/manual/installation/getting-started.html) - An ORM to interface with PostgresQL
- [Postman](https://www.getpostman.com/) - testing the API

### Installation

##### Prerequisites

- [Node.js](https://nodejs.org/) v7+
  Check your node version by typing `node -v`, node will also install npm for you which we will require in this project.

```sh
$ git clone https://github.com/daisymacharia/SMS-Management-Application.git
$ cd SMS-Management-Application
$ yarn install
```

To set up the database:

1. Create a db: Type `creadtedb <db name>` in your terminal
2. Create a .env file and add the following with the correct variables:

```
  DB_PASSWORD=
  DB_USER=
  DB_NAME=
  DB_TEST_NAME=
  DB_PORT=5432
  NODE_ENV=development
  HOST=127.0.0.1
```

`Note: The DB_PASSWORD and DB_USER are your postgres user (superuser is root) and password`

Run migration to create the tables in the database:

```sh
$ sequelize db:migrate
```

Start the server.

```sh
$ yarn run dev
```

To run Tests locally,

```sh
$ yarn run tests
```

### Endpoints

| VERB   | URL                                | ACTION                                     |
| ------ | ---------------------------------- | ------------------------------------------ |
| POST   | /api/contact                       | Creates a new contact                      |
| DELETE | /api/contact/:phoneNumber          | Deletes contact                            |
| PUT    | api/contact/:phoneNumber           | updates a contact                          |
| POST   | /api/message/                      | Create and send a message                  |
| DELETE | /api/message/:id                   | Deletes a message that has the provided id |
| GET    | /api/message/:id                   | Gets a message                             |
| GET    | /api/message/sent/:phoneNumber     | Get all messages sent to a contact         |
| GET    | /api/message/received/:phoneNumber | Get all messages recieved by a contact     |
| GET    | /api/contact/message/:id           | Get messages elonging to a contact         |

### Apiary Documentation

https://smsmanagement.docs.apiary.io/#/reference/0/

### Future Improvements

- Write MORE Tests
- Add a catching User interface
