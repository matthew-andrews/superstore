buster.testCase('superstore', {
  "setUp": function() {
    Superstore.clear();
  },
  "Should be able to set and get data against a key": function() {
    Superstore.set('quay', 'val you', function() {
      Superstore.get('quay', function(err, value) {
        assert.equals('val you', value);
      }); 
    });
  },
  "Should be able to read things (twice) from local storage": function() {
    localStorage.keyTwo = 3884;
    Superstore.get('keyTwo', function(err, value) {
      assert.equals(3884, value);
    });
    Superstore.get('keyTwo', function(err, value) {
      assert.equals(3884, value);
    });
  },
  "Should be able to unset things": function() {
    localStorage.keyThree = "Hello";
    Superstore.unset('keyThree', function() {
      assert.equals(undefined, localStorage.keyThree);
    });
  },
  "Shouldn't need to provide a set callback to set": function() {
    Superstore.set("keyFour", "OK");
    assert.equals("\"OK\"", localStorage.keyFour);
  },
  "Shouldn't need to provide a set callback to unset": function() {
    localStorage.keyFifth = true;
    Superstore.unset('keyFifth');
    assert.equals(undefined, localStorage.keyFifth);
  },
  "Getting an unset key should return a nully value": function() {
    Superstore.get("keySixth", function(err, value) {
      assert.equals(value, undefined);
    });
  },
  "Should json encode and decode objects": function() {
    var obj = {
      test: [1,4,6,7]
    };
    Superstore.set('keySeventh', obj, function() {
      assert.equals(JSON.stringify(obj), localStorage.keySeventh);
    });
  },
  "Set should fire a callback": function() {
    var spy = this.spy();
    Superstore.set('keyNinth', 'A', spy);
    assert.called(spy);
  },
  "#clear() clears": function() {
    Superstore.set('keyTenth', 'A', function() {
      Superstore.set('keyEleventh', 'B', function() {
        Superstore.clear(function() {
          assert.equals(undefined, localStorage.A);
          assert.equals(undefined, localStorage.B);
        });
      });
    });
  },
  "#clear(false) only clear the cache": function() {
    Superstore.set('keyTwelth', 'A', function() {
      localStorage.keyTwelth = JSON.stringify('B');
      Superstore.get('keyTwelth', function(err, value) {
        assert.equals(value, 'A');
        Superstore.clear(false, function() {
          Superstore.get('keyTwelth', function(err, value) {
            assert.equals(value, 'B');
          });
        });
      });
    });
  }
});
