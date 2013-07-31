var config = module.exports;

config['superstore'] = {
  rootPath: '../',
  environment: 'browser',
  sources: [
    'coverage/build/superstore.js'
  ],
  tests: [
    'test/tests/*.js'
  ],
  extensions: [
    require('buster-istanbul')
  ],
  'buster-istanbul': {
    outputDirectory: 'coverage'
  }
};
