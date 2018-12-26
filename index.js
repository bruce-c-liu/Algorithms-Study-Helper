const fs = require('fs');
const prompt = require('./prompt').prompt;
let entries = require('./prompt').entries;
const nodeCleanup = require('node-cleanup');

nodeCleanup(function (exitCode, signal) {
  entries = JSON.stringify(entries, null, '\t');
  fs.writeFileSync('entries.json', entries);

  if (signal) {
    // RECEIVES SIGHUP IF TERMINAL IS CLOSED
    console.log('Got signal: ', signal);
    nodeCleanup.uninstall(); // don't call cleanup handler again
    process.kill(process.pid, signal);
    return false;
  } else {
    // console.log('In cleanup. Exit code is', exitCode);
    console.log('Exiting...');
  }
});

console.log('Hello! Welcome to Bruce\'s Algorithms Study Helper.\nEnter a number to begin...');
prompt();
