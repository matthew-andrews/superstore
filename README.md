# superstore [![Build Status](https://travis-ci.org/matthew-andrews/superstore.png?branch=master)](https://travis-ci.org/matthew-andrews/superstore)

Superstore is a simple lightweight asynchronous wrapper around localStorage.  Its features include:

- It is [resilient to iOS's strange behaviour in private browsing mode](http://stackoverflow.com/questions/14555347/html5-localstorage-doesnt-works-in-ios-safari-private-browsing).
- By making use of [setImmediate](https://github.com/NobleJS/setImmediate) its callbacks are truly asynchronous whilst still being cross-browser and performant (compared with `setTimeout(function() {}, 0)` [which introduces a delay of *at least* 10ms](https://developer.mozilla.org/en-US/docs/Web/API/window.setTimeout#Minimum.2F_maximum_delay_and_timeout_nesting)).
- It accepts objects as values and runs `JSON.stringify` on **#set** and `JSON.parse` on **#get** for you.

## installation

```
npm install superstore
```

## api

Superstore is an uninstantiable module.  All Superstore methods return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will resolve with the stored value. Its methods are:

### #get(key)

### #set(key, value)

### #unset(key)

### #clear()

## Example usage

```
var Superstore = require('superstore');
var store = new Superstore('foo');

store.get('bar').then(function(value){
  \\Do something with value
});
```

## todo

- JSDoc comments and automatically generating documentation.
- Should clear and unset be merged?  
- Split the tests up into those that test the async layer and those that test the localStorage layer.  (The point above is a dependency)
