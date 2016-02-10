var prefix = '';
try {
  localStorage.test = 'test';
  localStorage.removeItem('test');
} catch (err) {
  if (err.code == 22) prefix = '// ';
}

var tests = {};
var store    = new Superstore("local", "testing123");
var dupStore = new Superstore("local", "testing123");
var buggyLocalStorage = false;

try {
	localStorage.test = 'test';
	localStorage.removeItem('test');
} catch (err) {
	if (err.code == 22) prefix = '// ';
	buggyLocalStorage = true;
}

function getLocalStorage(key) {
  return localStorage[store.namespace+key];
}

function setLocalStorage(key, val) {
  return localStorage[store.namespace+key] = val;
}

tests["setUp"] = function() {
  localStorage.clear();
};

tests["Should be able to set and get data against a key"] = function() {
  var deferred = Q.defer();
  store.set('quay', 'val you').then(function() {
    return store.get('quay');
  }).then(function(value) {
      assert.equals('val you', value);
      deferred.resolve();
  });
  return deferred.promise;
};

tests[prefix + "Should be able to read things (twice) from local storage"] = function() {
  var deferred = Q.defer();
  var deferred2 = Q.defer();
  store.set('keyTwo', 3884).then(function(){
    return store.get('keyTwo');
  }).then(function(value) {
    assert.equals(3884, value);
    deferred.resolve();
    return store.get('keyTwo');
  }).then(function(value) {
    assert.equals(3884, value);
    deferred2.resolve();
  });
  return Q.all([deferred.promise, deferred.promise]).then(function() {
    /* Hack around a bug in buster.js - https://github.com/busterjs/buster-test/pull/14 */
  });
};

tests[prefix + "Should be able to unset things"] = function() {
  var deferred = Q.defer();
  getLocalStorage("keyThree", "Hello");
  store.unset('keyThree').then(function() {
    assert.equals(undefined, getLocalStorage("keyThree"));
    deferred.resolve();
  });
  return deferred.promise;
};

tests["Getting an unset key should return a nully value"] = function() {
  var deferred = Q.defer();
  store.get("keySixth").then(function(value) {
    assert.equals(value, undefined);
    deferred.resolve();
  });
  return deferred.promise;
};

tests[prefix + "Should json encode and decode objects"] = function() {
  var deferred = Q.defer();
  var obj = {
    test: [1,4,6,7]
  };
  var key = 'keySeventh';
  store.set(key, obj).then(function(value) {
    assert.equals(obj, value);
    assert.equals(JSON.stringify(obj), getLocalStorage(key));
    deferred.resolve();
  });
  return deferred.promise;
};

tests["Set should fire a callback"] = function() {
  var deferred = Q.defer();
  var spy = this.spy();
  store.set('keyNinth', 'A').then(function () {
    spy();
    deferred.resolve();
  });
  return deferred.promise.then(function() {
    assert.called(spy);
  });
};

tests[prefix + "#clear() clears only our namespaced data"] = function() {
  var deferred = Q.defer();
  localStorage["other"] = "123";

  store.set('keyTenth', 'A').then(function() {
    return store.set('keyEleventh', 'B');
  }).then(function() {
    return store.clear();
  }).then(function() {
    assert.equals(undefined, getLocalStorage("keyTenth"));
    assert.equals(undefined, getLocalStorage("keyEleventh"));
    assert.equals("123",     localStorage["other"]);
    deferred.resolve();
  });
  return deferred.promise;
};

tests["watch for changes in other processes"] = function() {
  var deferred = Q.defer();
  store.set('key13', 'A').then(function() {
    var event = new CustomEvent("storage");
    event.key = store.namespace+"key13";
    event.newValue = "\"B\"";

    window.dispatchEvent(event);
    return store.get('key13');
  }).then(function(value) {
     assert.equals(value, 'B');
     deferred.resolve();
  });
  return deferred.promise;
};

tests["throw error if no namespace given"] = function() {
  var errStr;
  try {
    var store = new Superstore();
  } catch(e) {
    errStr = e;
  }

  assert.equals(errStr, "Namespace required");
};

tests["be able to set in one instance of superstore and get from another instance"] = function() {
  var deferred = Q.defer();

  store.set('dupKey', 'hello').then(function() {
    return dupStore.get('dupKey');
  }).then(function(value) {
    assert.equals("hello", value);
    deferred.resolve();
  });
  return deferred.promise;
};

tests["#isPersisting returns whether or not the data is persisting to storage"] = function() {
	assert.equals(Superstore.isPersisting(), !buggyLocalStorage);
};


buster.testCase('superstore', tests);
