'use strict';

module.exports = function(grunt) {
  var CI = grunt.option('ci');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      lib: 'lib',
      test: 'test',
      dist: 'dist',
      name: 'jmap-client'
    },
    concat: {
      options: {
        separator: ';\n'
      },
      dist: {
        options: {
          banner: '(function() {\nthis.jmap = {};\n',
          footer: '\n}).call(typeof exports !== \'undefined\' ? exports : typeof window !== \'undefined\' ? window : this);',
          process: function(src, filepath) {
            /*
             * When babel compile ES6 class to ES5 it create a variable which is a function.
             * Replace all variable like `var Jmap = (function () {` by `var Jmap = this.JMAP.Jmap = (function () {`
             * in order to export all class.
             */
            return src.replace(/var (?!_)(.*?) = (?=\(?function \w*?\([^)]*\) \{)/g, 'var $1 = this.jmap.$1 = ');
          }
        },
        src: [
          // Models
          '<%= project.dist %>/lib/models/Model.js',
          '<%= project.dist %>/lib/models/Account.js',
          '<%= project.dist %>/lib/models/Mailbox.js',
          '<%= project.dist %>/lib/models/MessageList.js',
          '<%= project.dist %>/lib/models/Thread.js',
          '<%= project.dist %>/lib/models/EMailer.js',
          '<%= project.dist %>/lib/models/Message.js',
          // Promises
          '<%= project.dist %>/lib/promises/PromiseProvider.js',
          '<%= project.dist %>/lib/promises/ES6PromiseProvider.js',
          '<%= project.dist %>/lib/promises/QPromiseProvider.js',
          // Transport
          '<%= project.dist %>/lib/transport/Transport.js',
          '<%= project.dist %>/lib/transport/RequestTransport.js',
          '<%= project.dist %>/lib/transport/JQueryTransport.js',
          // Other
          '<%= project.dist %>/lib/utils/Utils.js',
          '<%= project.dist %>/lib/Client.js'
        ],
        dest: '<%= project.dist %>/<%= project.name %>.js'
      }
    },
    uglify: {
      dist: {
        files: [
          {
            dest: '<%= project.dist %>/<%= project.name %>.min.js',
            src: ['<%= project.dist %>/<%= project.name %>.js']
          }
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: CI && 'checkstyle',
        reporterOutput: CI && 'jshint.xml'
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= project.test %>/**/*.js',
          '<%= project.lib %>/**/*.js'
        ]
      }
    },
    jscs: {
      lint: {
        options: {
          config: '.jscsrc',
          esnext: true
        },
        src: ['<%= jshint.all.src %>']
      },
      fix: {
        options: {
          config: '.jscsrc',
          esnext: true,
          fix: true
        },
        src: ['<%= jshint.all.src %>']
      }
    },
    lint_pattern: {
      options: {
        rules: [
          { pattern: /(describe|it)\.only/, message: 'Must not use .only in tests' }
        ]
      },
      all: {
        src: ['<%= jshint.all.src %>']
      }
    },
    mochacli: {
      options: {
        require: ['chai'],
        reporter: 'spec',
        timeout: 3000
      },
      all: ['<%= project.test %>/backend/**/*.js']
    },
    watch: {
      files: ['<%= jshint.all.src %>'],
      tasks: ['test']
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= project.dist %>/*',
            '!<%= project.dist %>/.git*'
          ]
        }]
      }
    },

    babel: {
      dist: {
        files: [{
          expand: true,
          dest: '<%= project.dist %>',
          src: ['<%= project.lib %>/**/*.js'],
          ext: '.js'
        }]
      }
    },

    karma: {
      unit: {
        configFile: 'test/config/karma.conf.js'
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('compile', 'Compile from ES6 to ES5', ['clean:dist', 'babel', 'concat:dist', 'uglify']);
  grunt.registerTask('dist', ['test']);
  grunt.registerTask('linters', 'Check code for lint', ['jshint:all', 'jscs:lint', 'lint_pattern:all']);
  grunt.registerTask('test', 'Lint, compile and launch test suite', ['linters', 'compile', 'mochacli', 'karma']);
  grunt.registerTask('dev', 'Launch tests then for each changes relaunch it', ['test', 'watch']);

  grunt.registerTask('default', ['test']);

};
