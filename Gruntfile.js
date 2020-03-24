module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    project: {
      lib: 'lib',
      test: 'test',
      dist: 'dist',
      doc: 'doc',
      apidoc: '<%= project.doc %>/api',
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

    eslint: {
      all: {
        src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/**/*.js']
      },
      options: {
        quiet: true
      }
    },

    lint_pattern: {
      options: {
        rules: [
          { pattern: /(describe|it)\.only/, message: 'Must not use .only in tests' }
        ]
      },
      all: {
        src: ['<%= eslint.all.src %>']
      }
    },

    mocha_istanbul: {
      coverage: {
        src: [
          '<%= project.test %>/common/',
          '<%= project.test %>/backend/'
        ],
        options: {
          require: ['chai'],
          reporter: 'spec',
          reportFormats: ['lcov', 'text-summary'],
          timeout: 3000,
          coverageFolder: 'coverage/backend',
          mask: '**/*.js',
          root: 'dist/'
        }
      }
    },

    lcovMerge: {
      options: {
        emitters: ['file'],
        outputFile: 'coverage/lcov-merged.info'
      },
      src: [
        'coverage/backend/lcov.info',
        'coverage/frontend/lcov.info'
      ]
    },

    coveralls: {
      options: {
        force: false // When true, grunt-coveralls will only print a warning rather than an error
      },
      publish: {
        src: 'coverage/lcov-merged.info'
      }
    },

    watch: {
      files: ['<%= eslint.all.src %>'],
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
      },
      apidoc: {
        files: [{
          src: ['<%= project.apidoc %>/**/*']
        }]
      }
    },

    browserify: {
      dist: {
        options: {
          transform: [
            'browserify-versionify',
            [
              'babelify',
              {
                presets: ['es2015'],
                plugins: [
                  ['transform-builtin-extend', { globals: ['Error'], approximate: true }],
                  'transform-object-assign',
                  'add-module-exports']
              }
            ]
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
    },

    jsdoc: {
      dist: {
        src: ['<%= project.lib %>/'],
        jsdoc: 'node_modules/jsdoc/jsdoc.js',
        options: {
          recurse: true,
          destination: '<%= project.apidoc %>',
          configure: '.jsdocrc'
        }
      }
    },

    release: {
      options: {
        file: 'package.json',
        additionalFiles: ['bower.json'],
        commitMessage: 'Bumped version to <%= version %>',
        tagName: 'v<%= version %>',
        tagMessage: 'Version <%= version %>',
        afterBump: ['exec:gitcheckout_ReleaseBranch', 'test', 'apidoc'],
        beforeRelease: ['exec:gitadd_DistAndAPIDoc', 'exec:gitcommit_DistAndAPIDoc'],
        afterRelease: ['exec:gitcheckout_master']
      }
    },

    exec: {
      gitcheckout_ReleaseBranch: {
        cmd: function() {
          return 'git checkout -b release-' + this.file.readJSON('package.json').version;
        }
      },
      gitcheckout_master: {
        cmd: 'git checkout master'
      },
      gitadd_DistAndAPIDoc: {
        cmd: 'git add -f dist/ doc/api/'
      },
      gitcommit_DistAndAPIDoc: {
        cmd: function() {
          return 'git commit -m"Added distribution and API documentation for release."';
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('compile', 'Compile from ES6 to ES5', ['clean:dist', 'browserify', 'uglify']);
  grunt.registerTask('coverage', ['test', 'lcovMerge', 'coveralls:publish']);
  grunt.registerTask('linters', 'Check code for lint', ['eslint:all', 'lint_pattern:all']);
  grunt.registerTask('test', 'Lint, compile and launch test suite', ['linters', 'compile', 'mocha_istanbul:coverage', 'karma']);
  grunt.registerTask('dev', 'Launch tests then for each changes relaunch it', ['test', 'watch']);
  grunt.registerTask('apidoc', 'Generates API documentation', ['clean:apidoc', 'jsdoc']);

  grunt.registerTask('default', ['test']);

};
