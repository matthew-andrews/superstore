/**
 * Superstore synchronous library
 *
 * @author Matt Andrews <matthew.andrews@ft.com>
 * @copyright The Financial Times [All Rights Reserved]
 */

var keys = {};
var store = {};
var persist = true;

// Watch for changes from other tabs
window.addEventListener("storage", function(e) {
  if(keys[e.key]) {
    keys[e.key] = true;
    store[e.key] = JSON.parse(e.newValue);
  }
});

exports.get = function(key) {
  if (!keys[key] && persist) {
    var data = localStorage[key];

    // Slightly weird hack because JSON.parse of an undefined value throws
    // a weird exception "SyntaxError: Unexpected token u"
    if (data) data = JSON.parse(data);
    store[key] = data;
    keys[key] = true;
  }
  return store[key];
};

exports.set = function(key, value) {
  try {
    localStorage[key] = JSON.stringify(value);
  } catch(err) {

    // Known iOS Private Browsing Bug - fall back to non-persistent storage
    if (err.code === 22) {
      persist = false;
    } else {
      throw err;
    }
  }
  store[key] = value;
  keys[key] = true;
};

exports.unset = function(key) {
  delete store[key];
  delete keys[key];
  localStorage.removeItem(key);
};

/**
 * clear localstorage
 * @param clearPrefix will clear keys starting with `clearPrefix`
 * #clear(true) and #clear() clear cache and persistent layer, #clear(false) only clears cache
 *
 */
exports.clear = function(clearPrefix) {
  if(!clearPrefix) {
    if (persist) {
      localStorage.clear();
    }
    store = {};
    keys = {};
    return;
  }

  var clearKeyRegex = new RegExp("^"+clearPrefix);
  for(key in keys) {
    if(key.match(clearKeyRegex)) {
      this.unset(key);
    }
  }
};
