
# ACME TRADER CLIENT

This is a front end client built with ReactJs that will connect to the api served using the project at:
    
- https://github.com/ballerkobe808/acme-api.git

It lists currencies at https://www.kraken.com/help/api#public-market-data that have matching USD pairs.
It grabs current relevant trade data and displays them in graphical format. It also polls at a user specified frequency for the most up to date information   


## Requirements

For development, you will need Node.js installed on your environement.

### Node

[Node](http://nodejs.org/) is easy to install & now includes [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v6.10.3

    $ npm --version
    3.10.10

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Install

    $ git clone https://github.com/ballerkobe808/acme-trader-client
    $ cd acme-trader-client
    $ npm install

## Start & watch
By default, the app looks for the acme-api at http://localhost:3000. You will need to have the acme-api up and running in order to be able to use the functionality in the acme-trader-client. To start the client:

    $ npm start
    Point your browser to: http://localhost:8000
    
## Simple build for production

    $ npm run build

---

## Languages & tools

### ReactJs

- [React](http://facebook.github.io/react) is used for UI.
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Redux

- [Redux](https://github.com/reduxjs/redux) is the store manager used in the app.

### Ag-grid

- [Ag-grid](https://www.ag-grid.com/) is used for the table to display the cryptocurrencies.

### Chart.js

- [Chart.js](http://www.chartjs.org/) is used to display the data graphically.




Any feedback or questions feel free to email daniel.kong@gmail.com. Thanks for looking!

