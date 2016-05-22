"use strict";

/**
 * Dependencies
 */
var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var mocha = require("gulp-mocha");

// Hack around nodemon, that doesn't wait for tasks to finish on change
var nodemon_instance;

gulp.task("start-server", function () {
    if (!nodemon_instance) {
        nodemon_instance = nodemon({
            script: "server.js",
            nodeArgs: ["--harmony", "--debug"],
            watch: "__manual_watch__",
            ext: "__manual_watch__"
        });
    }
    else {
        nodemon_instance.emit("restart");
    }
});

gulp.task("test", function () {
    return gulp.src("test/**/test-*.js", {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on("error", function (error) {
            console.error(error);
            process.exit(1);
        })
        .on("end", function () {
            process.exit(0);
        });
});