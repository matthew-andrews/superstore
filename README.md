# superstore [![Build Status](https://travis-ci.org/matthew-andrews/superstore.svg?branch=master)](https://travis-ci.org/matthew-andrews/superstore)

Superstore is a simple lightweight asynchronous wrapper around the Web Storage APIs [localStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) and [sessionStorage](https://developer.mozilla.org/en/docs/Web/API/Window/sessionStorage).  Its features include:

If you require an synchronous version please use [superstore-sync](https://github.com/matthew-andrews/superstore-sync) instead.

- It is [resilient to iOS's strange behaviour in private browsing mode](http://stackoverflow.com/questions/14555347/html5-localstorage-doesnt-works-in-ios-safari-private-browsing).
- It accepts objects as values and runs `JSON.stringify` on **#set** and `JSON.parse` on **#get** for you.

## Installation

### npm
```
npm install superstore --save
```

### bower
```
bower superstore --save
```

## api

Superstore is an instantiable module.  All Superstore methods return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will resolve with the stored value. Its methods are:

### constructor (type, namespace)

```js
var localStore = new Superstore('local', 'foo');
var sessionStore = new Superstore('session', 'bar');
```

### #get(key)

### #set(key, value)

### #unset(key)

### #clear()

### Superstore.isPersisting()
returns a boolean set to true if data is being persisted to storage, or false if it is being kept in memory (e.g. if localStorage is full or inaccessible).

## Example usage

```js
var Superstore = require('superstore');
var store = new Superstore('local', 'foo');

store.get('bar').then(function(value){
  // Do something with value
});
```
