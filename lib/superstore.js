/**
 * Superstore
 *
 * @author Matt Andrews <matthew.andrews@ft.com>
 * @copyright The Financial Times [All Rights Reserved]
 */

var keys = {};
var store = {};
var persist = true;

exports.get = function(key, cb) {
  if (keys[key]) return cb(undefined, store[key]); 
  store[key] = localStorage[key]; 
  keys[key] = true;
  cb(undefined, store[key]);
};

exports.set = function(key, value, cb) {
  store[key] = value;
  keys[key] = true;
  try {
    localStorage[key] = value;
  } catch(err) {

    // Known iOS Private Browsing Bug - fall back to non-persistent storage
    if (err.code === 22) {
      persist = false;
    } else {
      return cb && cb(err);
    }
  }
  if (cb) cb();
};

exports.unset = function(key, cb) {
  delete store[key];
  delete keys[key];
  try {
    localStorage.removeItem(key);
  } catch(err) {
    return cb && cb(err);
  } 
  if (cb) cb();
};
