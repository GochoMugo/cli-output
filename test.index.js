/**
 * testing the cli logger
 */


/* eslint-env mocha */


"use strict";


// built-in modules
var childProcess = require("child_process");


// npm-installed modules
var chalk = require("chalk");
var should = require("should");


// own modules
var cli = require("./index");


function run(fn, done) {
    var cmd = "node -e 'var cli = require(\"./index\");" +
        "" + fn.replace(/'/g, "\"") + "'";
    childProcess.exec(cmd, {
        cwd: __dirname,
    }, done);
}


describe("cli module", function() {
    it("exports logging functions", function() {
        var fns = [
            "debug",
            "prettyJSON",
            "rawJSON",
            "error",
            "log",
            "success",
        ];
        fns.forEach(function(fn) {
            should(cli[fn]).be.a.Function();
        });
    });
});


describe("cli common tests", function() {
    before(function() {
        process.env.DEBUG = 1;
    });

    after(function() {
        delete process.env.DEBUG;
    });

    ["log", "success", "debug", "rawJSON", "prettyJSON"].forEach(function(fn) {
        it("cli." + fn + " logs to stdout only", function(done) {
            run("cli." + fn + "('{ gocho: 101 }')", function(err, stdout, stderr) {
                should(err).not.be.ok();
                should(stdout).containEql("gocho");
                should(stderr).equal("");
                return done();
            });
        });
    });

    [{ log: "blue" }, { success: "green" }, { debug: "yellow" }].forEach(function(desc) {
        var fn;
        var color;
        for (var key in desc) {
            fn = key;
            color = desc[key];
        }
        it("cli." + fn + " uses " + color + " color", function(done) {
            run("cli." + fn + "('gocho')", function(err, stdout) {
                should(err).not.be.ok();
                should(stdout).containEql(chalk[color](""));
                return done();
            });
        });
    });
});


describe("cli.error", function() {
    it("logs to stderr only", function(done) {
        run("cli.error('gocho')", function(err, stdout, stderr) {
            should(err).not.be.ok();
            should(stdout).equal("");
            should(stderr).containEql("gocho");
            return done();
        });
    });

    it("uses red color", function(done) {
        run("cli.error('gocho')", function(err, stdout) {
            should(err).not.be.ok();
            should(stdout).containEql(chalk.red(""));
            return done();
        });
    });
});


describe("cli.debug", function() {
    it("does not log when DEBUG environment variable is NOT set", function(done) {
        run("cli.debug('debug')", function(err, stdout) {
            should(err).not.be.ok();
            should(stdout).equal("");
            return done();
        });
    });
});


describe("cli.rawJSON", function() {
    it("displays raw JSON", function(done) {
        run("cli.rawJSON({ gocho: 101 })", function(err, stdout) {
            should(err).not.be.ok();
            should(stdout).containEql("{");
            should(stdout).containEql("\"gocho\":");
            should(stdout).containEql("}");
            return done();
        });
    });

    it("same as .rjson", function() {
        should.strictEqual(cli.rawJSON, cli.rjson);
    });
});


describe("cli.prettyJSON", function() {
    it("displays prettyjson JSON", function(done) {
        run("cli.prettyJSON({ gocho: 101 })", function(err, stdout) {
            should(err).not.be.ok();
            should(stdout).containEql("gocho:");
            return done();
        });
    });

    it("same as .pjson", function() {
        should.strictEqual(cli.prettyJSON, cli.pjson);
    });
});


describe("cli.info", function() {
    it("is an alias of cli.log", function() {
        should.strictEqual(cli.info, cli.log);
    });
});
