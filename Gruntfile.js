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
      all: [
        '<%= project.test %>/common/**/*.js',
        '<%= project.test %>/backend/**/*.js'
      ]
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

    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify']
          ],
          browserifyOptions: {
            standalone: 'jmap'
          },
          external: [
            'request',
            'q'
          ]
        },
        files: {
          '<%= project.dist %>/jmap-client.js': ['<%= project.lib %>/API.js']
        }
      }
    },

    karma: {
      unit: {
        configFile: '<%= project.test %>/config/karma.conf.js'
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('compile', 'Compile from ES6 to ES5', ['clean:dist', 'browserify', 'uglify']);
  grunt.registerTask('dist', ['test']);
  grunt.registerTask('linters', 'Check code for lint', ['jshint:all', 'jscs:lint', 'lint_pattern:all']);
  grunt.registerTask('test', 'Lint, compile and launch test suite', ['linters', 'compile', 'mochacli', 'karma']);
  grunt.registerTask('dev', 'Launch tests then for each changes relaunch it', ['test', 'watch']);

  grunt.registerTask('default', ['test']);

};
