/**
 * Superstore
 *
 * @author Matt Andrews <matthew.andrews@ft.com>
 * @copyright The Financial Times [All Rights Reserved]
 */

var keys = {};
var store = {};
var persist = true;

var setImmediate = require('setimmediate'); 
function callImmediate() {
  arguments[0].apply(this, [].splice.call(arguments, 1));
}

exports.get = function(key, cb) {
  if (keys[key]) return callImmediate(cb, undefined, store[key]); 
  var data = localStorage[key];

  // Slightly weird hack because JSON.parse of an undefined value throws
  // a weird exception "SyntaxError: Unexpected token u" 
  if (data) data = JSON.parse(data);
  store[key] = data;
  keys[key] = true;
  callImmediate(cb, undefined, store[key]);
};

exports.set = function(key, value, cb) {
  try {
    localStorage[key] = JSON.stringify(value);
  } catch(err) {

    // Known iOS Private Browsing Bug - fall back to non-persistent storage
    if (err.code === 22) {
      persist = false;
    } else {
      return cb && callImmediate(cb, err);
    }
  }
  store[key] = value;
  keys[key] = true;
  if (cb) callImmediate(cb);
};

exports.unset = function(key, cb) {
  delete store[key];
  delete keys[key];
  try {
    localStorage.removeItem(key);
  } catch(err) {
    return cb && callImmediate(cb, err);
  } 
  if (cb) callImmediate(cb);
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
 
  if (persist && hard === true) localStorage.clear();
  store = {};
  keys = {};
  if (cb) callImmediate(cb);
};
