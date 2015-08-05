/**
 * Command-line Outputting
 */


"use strict";


exports = module.exports = {
    debug: debug,
    error: error,
    info: log,
    log: log,
    pjson: prettyJSON,
    prettyJSON: prettyJSON,
    rawJSON: rawJSON,
    rjson: rawJSON,
    success: success,
};


// built-in modules
var util = require("util");


// npm-installed modules
var consolejson = require("console.json"); // eslint-disable-line
var chalk = require("chalk");
var prettyjson = require("prettyjson");


// module variables
var marker = " >>> ";


/**
 * Wraps the arguments by formatting and adding the prefix/marker/PS1
 *
 * @param  {Object} args - arguments passed to high-level functions
 * @return {String} message
 */
function wrap(args) {
    var message = chalk.magenta(marker) + args[0];
    args[0] = message;
    message = util.format.apply(null, args);
    return message;
}


/**
 * Logs a normal message
 */
function log() {
    var message = wrap(arguments);
    message = chalk.blue(message);
    console.log(message);
}


/**
 * Logs a success message
 */
function success() {
    var message = wrap(arguments);
    message = chalk.green(message);
    console.log(message);
}


/**
 * Logs an error message
 */
function error() {
    var message = wrap(arguments);
    message = chalk.red(message);
    console.error(message);
}


/**
 * Logs a debug message
 */
function debug() {
    if (!process.env.DEBUG) {
        return;
    }
    var message = wrap(arguments);
    message = chalk.yellow(message);
    console.log(message);
}


/**
 * Display json in its raw form
 *
 * @param {JSON|Object} json
 */
function rawJSON(json) {
    console.json(json);
}


/**
 * Displays JSON in a pretty manner
 *
 * @param {JSON|Object} json
 */
function prettyJSON(json) {
    var text = prettyjson.render(json);
    console.log(text);
}
