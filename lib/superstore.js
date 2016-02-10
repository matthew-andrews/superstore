/**
 * Superstore
 *
 * @author Matt Andrews <matthew.andrews@ft.com>
 * @copyright The Financial Times [All Rights Reserved]
 */
var sync = require('superstore-sync');

var keys = {};
var store = {};

function Superstore(type, namespace) {
  if(!namespace) {
    throw "Namespace required";
  }
  this.store = sync[type];
  this.namespace = "_ss."+namespace+".";
}

Superstore.prototype.get = function(key) {
  return new Promise(function(resolve) {
	resolve(this.store.get(this.namespace+key));
  }.bind(this));
};

Superstore.prototype.set = function(key, value) {
  return new Promise(function(resolve){
    resolve(this.store.set(this.namespace+key, value));
  }.bind(this));
};

Superstore.prototype.unset = function(key) {
  return new Promise(function(resolve) {
    resolve(this.store.unset(this.namespace+key));
  }.bind(this));
};

/**
 * #clear(true) and #clear() clear cache and persistent layer, #clear(false) only clears cache
 *
 */
Superstore.prototype.clear = function() {
  return new Promise(function(resolve) {
    resolve(this.store.clear(this.namespace));
  }.bind(this));
};

Superstore.isPersisting = sync.isPersisting;

module.exports = Superstore;
