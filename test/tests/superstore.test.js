var prefix = '';
try {
  localStorage.test = 'test';
  localStorage.removeItem('test');
} catch (err) {
  if (err.code == 22) prefix = '// ';
}

var tests = {};

tests["setUp"] = function() {
  Superstore.clear();
};

tests["Should be able to set and get data against a key"] = function() {
  var deferred = Q.defer();
  Superstore.set('quay', 'val you', function() {
    Superstore.get('quay', function(err, value) {
      assert.equals('val you', value);
      deferred.resolve();
    });
  });
  return deferred.promise;
};

tests[prefix + "Should be able to read things (twice) from local storage"] = function() {
  var deferred = Q.defer();
  var deferred2 = Q.defer();
  localStorage.keyTwo = 3884;
  Superstore.get('keyTwo', function(err, value) {
    assert.equals(3884, value);
    deferred.resolve();
  });
  Superstore.get('keyTwo', function(err, value) {
    assert.equals(3884, value);
    deferred2.resolve();
  });
  return Q.all([deferred.promise, deferred.promise]).then(function() {
    /* Hack around a bug in buster.js - https://github.com/busterjs/buster-test/pull/14 */
  });
};

tests[prefix + "Should be able to unset things"] = function() {
  var deferred = Q.defer();
  localStorage.keyThree = "Hello";
  Superstore.unset('keyThree', function() {
    assert.equals(undefined, localStorage.keyThree);
    deferred.resolve();
  });
  return deferred.promise;
};

tests[prefix + "Shouldn't need to provide a set callback to set"] = function() {
  Superstore.set("keyFour", "OK");
  assert.equals(localStorage.keyFour, "\"OK\"");
};

tests[prefix + "Shouldn't need to provide a set callback to unset"] = function() {
  var deferred = Q.defer();
  localStorage.keyFifth = true;
  Superstore.unset('keyFifth', function() {
    assert.equals(undefined, localStorage.keyFifth);
    deferred.resolve();
  });
  return deferred.promise;
};

tests["Getting an unset key should return a nully value"] = function() {
  var deferred = Q.defer();
  Superstore.get("keySixth", function(err, value) {
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
  Superstore.set('keySeventh', obj, function() {
    assert.equals(JSON.stringify(obj), localStorage.keySeventh);
    deferred.resolve();
  });
  return deferred.promise;
};

tests["Set should fire a callback"] = function() {
  var deferred = Q.defer();
  var spy = this.spy();
  Superstore.set('keyNinth', 'A', function () {
    spy();
    deferred.resolve();
  });
  return deferred.promise.then(function() {
    assert.called(spy);
  });;
};

tests[prefix + "#clear() clears"] = function() {
  var deferred = Q.defer();
  Superstore.set('keyTenth', 'A', function() {
    Superstore.set('keyEleventh', 'B', function() {
      Superstore.clear(function() {
        assert.equals(undefined, localStorage.keyTenth);
        assert.equals(undefined, localStorage.keyEleventh);
        deferred.resolve();
      });
    });
  });
  return deferred.promise;
};

tests[prefix + "#clear(false) only clear the cache"] = function() {
  var deferred = Q.defer();
  Superstore.set('keyTwelth', 'A', function() {
    localStorage.keyTwelth = JSON.stringify('B');
    Superstore.get('keyTwelth', function(err, value) {
      assert.equals(value, 'A');
      Superstore.clear(false, function() {
        Superstore.get('keyTwelth', function(err, value) {
          assert.equals(value, 'B');
          deferred.resolve();
        });
      });
    });
  });
  return deferred.promise;
};

tests["watch for changes in other processes"] = function() {
  var deferred = Q.defer();
  Superstore.set('key13', 'A', function() {
    var event = new CustomEvent("storage");
    event.key = "key13";
    event.newValue = "\"B\"";

    window.dispatchEvent(event);
    Superstore.get('key13', function(err, value) {
      assert.equals(value, 'B');
      deferred.resolve();
    });
  });
  return deferred.promise;
};

buster.testCase('superstore', tests);
