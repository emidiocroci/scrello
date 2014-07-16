Scrello - the scrum side of trello
==================================

Scrello, the scrum side of trello, is a web application that let you manage a full scrum process using Trello as a digital scrum board.

Trello - Developer API Keys
===========================

Before you start you need the **Trello Developer API Keys**. You can generate the key and secret hash [here](https://trello.com/1/appKey/generate).

You can use the key and secret values in this way:

	~$ sudo TRELLO_KEY=key TRELLO_SECRET=secret node app.js

Otherwise you can define TRELLO_KEY and TRELLO_SECRET as environment variables of your operating system.

Installation Requirements
=========================

In order to install Scrello, you need to have already installed:
* [Node.js](http://nodejs.org/) (version 0.10.3 or higher) and [npm](https://npmjs.org/)
* [MongoDB](http://www.mongodb.org/) (version 2.0.4 or higher)

Scrello uses several dependencies which are listed in the `package.json` file so that npm  will install them for you. So, once you have installed Node.js, MongoDB and npm, you can download Scrello and install its dependencies with:

	~$ git clone https://github.com/emidiocroci/scrello.git
	~$ sudo npm install -d

Now you can run your Scrello installation just typing:

	~$ node app.js
	
How To Run Tests
=========================

In order to run tests, you need to have installed *grunt* and *grunt-cli*

To run tests you have to execute:

	~$ grunt mochaTest
