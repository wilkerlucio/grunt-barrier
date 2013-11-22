/*
 * grunt-barrier
 * https://github.com/wilkerlucio/grunt-barrier
 *
 * Copyright (c) 2013 Wilker Lucio
 * Licensed under the MIT license.
 */

'use strict';

var path = require("path");

module.exports = function(grunt) {
  grunt.registerMultiTask("barrier", "Run Barrier test suite", function() {
    var args, done, files, options, spawnOptions, command;

    done    = this.async();
    options = this.options();
    files   = [];

    this.files.forEach(function(pair) {
      pair.src.forEach(function(f) {
        files.push(path.resolve(f));
      });
    });

    args = [];

    if (options.reporter) {
      args.push("--reporter");
      args.push(options.reporter);
    }

    command = path.resolve(path.join(__dirname, '..', '..', '.bin', 'barrier'));

    if (options.cmd) {
      command = options.cmd;
    }

    spawnOptions = {
      opts: {
        env: process.env,
        stdio: 'inherit'
      },
      cmd: command,
      args: args.concat(grunt.file.expand(files))
    };

    grunt.util.spawn(spawnOptions, function(err, output) {
      done();
    });
  });
};
