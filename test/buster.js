var config = module.exports;

config['superstore'] = {
  rootPath: '../',
  environment: 'browser',
  sources: [
    'node_modules/es6-promise/dist/es6-promise.js',
	'coverage/build/superstore.js',
    'node_modules/q/q.js'
  ],
  tests: [
    'test/tests/*.js'
  ],
  extensions: [
    require('buster-istanbul')
  ],
  'buster-istanbul': {
    instrument: false,
    outputDirectory: 'coverage',
    format: ["cobertura", "lcov"]
  }
};
