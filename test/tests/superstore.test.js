buster.testCase('superstore', {
  "setUp": function() {
    localStorage.clear();
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
      console.log('OK', localStorage.keyThree);
      assert.equals(undefined, localStorage.keyThree);
    });
  },
  "Shouldn't need to provide a set callback to set": function() {
    Superstore.set("keyFour", "OK");
    assert.equals("OK", localStorage.keyFour);
  },
  "Shouldn't need to provide a set callback to unset": function() {
    localStorage.keyFifth = true;
    Superstore.unset('keyFifth');
    assert.equals(undefined, localStorage.keyFifth);
  }
});
