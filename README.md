
# ACME TRADER CLIENT

This is a front end client built with ReactJs that will connect to the api served using the project at:
    
    https://github.com/ballerkobe808/acme-api.git

It lists currencies at https://www.kraken.com/help/api#public-market-data that have matching USD pairs.
It grabs current relevant trade data and displays them in graphical format. It also polls at a user specified frequency for the most up to date information   


## Requirements

For development, you will only need Node.js installed on your environement.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21

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

    $ npm start


## Simple build for production

    $ npm run build



---

## Languages & tools

### ReactJs

- [React](http://facebook.github.io/react) is used for UI.
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Redux

https://github.com/reduxjs/redux

### Ag-grid

https://www.ag-grid.com/



Any feedback or questions feel free to email daniel.kong@gmail.com. Thanks for looking!

