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
        src: ['<%= project.lib %>/**/*.js'],
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
    gjslint: {
      options: {
        flags: [
          '--disable 0110',
          '--nojsdoc'
        ],
        reporter: {
          name: CI ? 'gjslint_xml' : 'console',
          dest: CI ? 'gjslint.xml' : undefined
        }
      },
      all: {
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
        '<%= project.lib %>/**/*.js',
        '<%= project.test %>/**/*.js'
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-gjslint');
  grunt.loadNpmTasks('grunt-continue');
  grunt.loadNpmTasks('grunt-lint-pattern');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('dist', ['test', 'clean:dist', 'concat:dist', 'uglify']);
  grunt.registerTask('linters', 'Check code for lint', ['jshint:all', 'gjslint:all', 'lint_pattern:all']);
  grunt.registerTask('test', ['linters', 'mochacli']);
  grunt.registerTask('dev', ['test', 'watch']);

  grunt.registerTask('default', ['test']);

};
