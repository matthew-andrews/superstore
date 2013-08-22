/**
 * Superstore
 *
 * @author Matt Andrews <matthew.andrews@ft.com>
 * @copyright The Financial Times [All Rights Reserved]
 */

require('setimmediate');
var sync = require('./superstore-sync');

var keys = {};
var store = {};
var persist = true;

exports.get = function(key, cb) {
  setImmediate(cb, undefined, sync.get(key));
};

exports.set = function(key, value, cb) {
  sync.set(key, value);
  if (cb) setImmediate(cb);
};

exports.unset = function(key, cb) {
  sync.unset(key);
  if (cb) setImmediate(cb);
};

/**
 * #clear(true) and #clear() clear cache and persistent layer, #clear(false) only clears cache
 *
 */
exports.clear = function(hard, cb) {
  switch (arguments.length) {
    case 1:
      cb = hard;
    case 0:
      hard = true;
  }
  sync.clear(hard);
  if (cb) setImmediate(cb);
};
