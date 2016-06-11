# Sentiview

  Sentiview provides a new way to interview, incorporating face analysis to help you make more informed decisions.

## Table of Contents
1. [Usage](#Usage)
2. [Getting started](#Getting-Started)
  1. [Clone the latest version](#Installing-Dependencies)
  2. [Install Dependencies](#Installing-Dependencies)
  3. [Setup Environment Variables](#Environment-Variables)
  4. [Start the application](#Start-application)
3. [Technologies](#Technologies)
4. [Architecture](#Architecture)
5. [Team](#Team)
6. [Contributing](#Contributing)

## Usage

Landing Page:
![landing_page](https://raw.githubusercontent.com/crypticzoologists/sentiview/master/screenshots/landing_page.png)

Login:
![login_page](https://raw.githubusercontent.com/crypticzoologists/sentiview/master/screenshots/login_page.png)

Home:
![home_page](https://raw.githubusercontent.com/crypticzoologists/sentiview/master/screenshots/home_page.png)

Record:
![record_page](https://raw.githubusercontent.com/crypticzoologists/sentiview/master/screenshots/record_page.png)

Graphs:
![graphs_page](https://raw.githubusercontent.com/crypticzoologists/sentiview/master/screenshots/session_page.png)

Session Overview:
![sessions_page](https://github.com/crypticzoologists/sentiview/blob/master/screenshots/sessions_page.png?raw=true)

Calendar:
![calendar_page](https://raw.githubusercontent.com/crypticzoologists/sentiview/master/screenshots/calendar_page.png)

## Getting started

#### 1. Clone the latest version

  Start by cloning the latest version of Sentiview on your local machine by running:

  ```sh
  $ git clone https://github.com/crypticzoologists/sentiview
  $ cd sentiview
  ```

#### 2. Install Dependencies
  From within the root directory run the following command to install all dependencies:

  ```sh
  $ npm install
  ```

#### 3. Setup Environment Variables

##### Server side setup

  1. Copy and save the  ``` example.env ``` file in the env folder as ``` development.env ```.
  2. Replace the port with your desired port and enter the login credentials for your MySQL server (make sure it is running)

##### Client side setup

  1. Create a free account on http://face.sightcorp.com/ and create a new application for a new App Key.
  2. Copy and save the  ``` client-config.example.js ``` file in the env folder as ``` client-config.js ```.
  3. Enter and save your Client ID and App Key in the ``` client-config.js ``` file.

#### 4. Run the application

  1. Create a build folder within client/build. From within the root directory run the following command to make sure Browserify builds the bundle file and rebuilds on every change with Watchify:

  ```sh
  $ npm run bundle
  ```

  2. In a new terminal window run the following command to start the application:

  ```sh
  $ npm start
  ```

  After that open in your browser the localhost with your chosen port, e.g. ``` http://localhost:4568/ ``` to access the application.

#### 5. Run tests

  Configure the environment variable `NODE_ENV` prior to running tests.

   ```sh
  $ export NODE_ENV=development
  $ npm test
  ```

  You may use `npm run test-client` or `np run test-server` to run front-end and back-end tests independently.

## Technologies

##### Front end:
- React
- Face Analysis Cloud Engine API by Sightcorp
- PeerJS
- Socket.io
- Browserify
- Chartjs
- Babel

##### Back end:
- Node
- Express
- Jade
- Bookshelf/Knex
- MySQL
- Passport

##### Testing:
- Mocha
- Chai
- jsdom

##### Continuous Integration:
- Travis CI

##### Deployment:
- Digital Ocean Droplet
- pm2: Production Process Manager

## Architecture
![sentimize](https://cloud.githubusercontent.com/assets/10008938/15795587/c0bfd19a-29a7-11e6-9402-de7dabdf1526.png)

<!-- ### Database Schema
<b> to be added </b> -->

## Directory Layout
```
├── /env/                       # Environment variables
├── /node_modules/              # 3rd-party libraries and utilities
├── /client/                    # Client source code
│   ├── /build/                 # Build file produced with Browserify
│   ├── /components/            # React components
│     ├── /home-view/           # Home view components
│     ├── /main-layout/         # Main Layout components
│     ├── /record-view/         # Record view components
│     ├── /report-view/         # Reporting view components
│     ├── /calendar-view/       # Calendar view components
│     ├── /sessions-view/       # Sessions view components
│     ├── /App.jsx/             # Main React App
│   ├── /lib/                   # Lib files, e.g. from FACE API
│   ├── /style/                 # CSS Style files
│   ├── /index.jsx              # Index file to attach React to DOM
├── /server/                    # Server source code
│   ├── /config/                # Initial server config files
│   ├── /controllers/           # Controllers for database interaction
│   ├── /lib/                   # Lib for util functions
│   ├── /models/                # Data models
│   ├── /routes/                # Routes for incoming GET and POST requests
│   ├── /views/                 # Jade templating views
│   └── /server.js              # Server-side startup script
├── /test/                      # Server and client side tests
│   ├── /client/                # Client side tests
│   ├── /server/                # Server side tests
|   ├── /data/                  # Holds seed & dummy data
└── package.json                # List of 3rd party libraries and utilities to be installed
└── .babelrc                    # Babel presets
└── .eslintrc                   # ESLint settings
```

## Team
  - Product Owner:            [Chris Ng](https://github.com/chrisng93)
  - Scrum Master:             [Will Tang](https://github.com/willwtang)
  - Development Team Members: [Chris Ng](https://github.com/chrisng93), [Will Tang](https://github.com/willwtang), [Daniel Rabinovich](https://github.com/Drabin)

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
