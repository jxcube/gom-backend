Gift-O-Matic Back-end
=====================

This repository is for the back-end implementation of Gift-O-Matic Application.

## Requirements
- [Node.js](http://nodejs.org/)
- [PostgreSQL 9+](http://www.postgresql.org/)
- [Git](http://git-scm.com/)

## Installation
1. Clone the repository and download the dependencies,

        $ git clone https://github.com/jxcube/gom-backend
        $ cd gom-backend
        $ npm install
2. Edit [config/index.js](./config/index.js), put your *postgres* password there,

  *__Note__: `postgres` password is the password that you entered the first time you installed PostgreSQL*

3. Create a database called `gom_db` (via *pgAdmin* or command-line),

4. Install `nodemon` module globally,

        $ npm install nodemon -g

  *__Note__: on Mac/Linux you might want to use `sudo`*

5. Finally, start the server!

        $ npm start
        
## Contribute
To contribute, you must follow our coding styles and standards:
* use **spaces** instead of **~~tabs~~** for indentation
* use **4** spaces for indentation
* always put a **semicolon** (;) at the end of every line of code
* every variable has their own `var`
```javascript
// Do this!
var fs = require('fs');
var http = require('http');

// Not this!
var fs = require('fs'),
    http = require('http');
```
