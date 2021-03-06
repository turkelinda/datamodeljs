/*
**  datamodeljs
**  Library for defining and managing entity objects.
**  Copyright (c) 2013 - 2015 msg systems ag (http://www.msg-systems.com)
**
**  Contributors:
**  see: https://github.com/msg-systems/datamodeljs/graphs/contributors
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            options: {
                jshintrc: "jshint.json"
            },
            gruntfile:   [ "Gruntfile.js" ],
            sourcefiles: [ "lib/datamodel.js" ],
            testfiles: [ "test/**/*.js" ]
        },
        mochaTest: {
            test: {
                src: [ "test/mocha/**/*.js" ]
            },
            options: {
                require: "test/common.js"
            }
        },
        clean: {
            clean:     [ ],
            distclean: [ "node_modules" ]
        }
    });

    require("load-grunt-tasks")(grunt, { pattern: "grunt-*" });

    grunt.registerTask("default", [ "jshint", "mochaTest" ]);
};