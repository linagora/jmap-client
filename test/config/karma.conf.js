'use strict';

module.exports = function(config) {
  config.set({
    basePath: '../../',

    singleRun: true,
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],

    reporters: ['spec', 'coverage'],

    preprocessors: {
      'dist/*.js': ['babel', 'coverage']
    },

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'text-summary'},
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: 'lcov' },
        { type: 'cobertura', subdir: 'cobertura' }
      ]
    },

    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-spec-reporter',
      'karma-coverage'
    ],

    colors: true,
    autoWatch: true,
    files: [
      'node_modules/chai/chai.js',
      'node_modules/chai-datetime/chai-datetime.js',
      'node_modules/q/q.js',
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/jquery-mockjax/dist/jquery.mockjax.js',
      'dist/jmap-client.js',
      // This must be here, before the actual tests
      'test/frontend/require.js',
      // Tests
      'test/common/**/*.js',
      'test/frontend/transport/JQueryTransport.js'
    ]
  });
};
