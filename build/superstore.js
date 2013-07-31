(function(e){if("function"==typeof bootstrap)bootstrap("superstore",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeSuperstore=e}else"undefined"!=typeof window?window.Superstore=e():global.Superstore=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
;