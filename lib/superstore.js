/**
 * Superstore
 *
 * @author Matt Andrews <matthew.andrews@ft.com>
 * @copyright The Financial Times [All Rights Reserved]
 */

require('setimmediate');
var sync = require('superstore-sync');

var keys = {};
var store = {};
var persist = true;

function Superstore(namespace) {
  if(!namespace) {
    throw "Namespace required";
  }

  this.namespace = "_ss."+namespace+".";
};

Superstore.prototype.get = function(key, cb) {
  setImmediate(cb, undefined, sync.get(this.namespace+key));
};

Superstore.prototype.set = function(key, value, cb) {
  sync.set(this.namespace+key, value);
  if (cb) setImmediate(cb);
};

Superstore.prototype.unset = function(key, cb) {
  sync.unset(this.namespace+key);
  if (cb) setImmediate(cb);
};

/**
 * #clear(true) and #clear() clear cache and persistent layer, #clear(false) only clears cache
 *
 */
Superstore.prototype.clear = function(cb) {
  sync.clear(this.namespace);
  if (cb) setImmediate(cb);
};

module.exports = Superstore;
