'use strict';

module.exports = function(config) {
  config.set({
    basePath: '../../',

    singleRun: true,
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: 'coverage/frontend',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },

    preprocessors: {
      'dist/*.js': ['coverage']
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
      'node_modules/chai-shallow-deep-equal/chai-shallow-deep-equal.js',
      'node_modules/q/q.js',
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/jquery-mockjax/dist/jquery.mockjax.js',
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/sinon-chai/lib/sinon-chai.js',
      'dist/jmap-client.js',
      // This must be here, before the actual tests
      'test/frontend/require.js',
      // Tests
      'test/common/**/*.js',
      'test/frontend/transport/JQueryTransport.js'
    ]
  });
};
