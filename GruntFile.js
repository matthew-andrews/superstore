module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    buster: {
      test: {}
    },

    browserify: {
      build: {
        src: 'lib/superstore.js',
        dest: 'build/superstore.js'
      },
      test: {
        src: 'coverage/lib/superstore.js',
        dest: 'coverage/build/superstore.js'
      },
      options: {
        standalone: 'Superstore'
      },
    },

    instrument: {
      files: 'lib/**/*.js',
      options: {
        basePath: 'coverage/'
      }
    },
  });

  grunt.loadNpmTasks('grunt-buster');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-istanbul');

  // Default task.
  grunt.registerTask('default', ['browserify:build']);
  grunt.registerTask('test', ['instrument', 'browserify:test', 'buster:test']);
};
 
