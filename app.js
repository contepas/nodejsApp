"use strict";

//Problem: I need a simple way to look at my teamtreehouse personal info from a web browser to get
//badge's and course's names who include <nameInfoToSearch>
//Solution: I will use Node.js to perform the profile look ups and serve my template via HTTP

//Plan the solution:
// create a web server

//===REQUIRE==========
const https = require('https');
const http = require('http');
const router = require('./router');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  router.home(req, res);
  router.treeHouseSkills(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



// function that handle the reading of files and marge in values
//  + read from file and get a string
//  + marges values into string
