# superstore [![Build Status](http://jenkins:8080/buildStatus/icon?job=superstore)](http://dev01-jenkins01-uk1.ak.ft.com:8080/view/Core%20Libraries/job/superstore/)

Superstore is a simple lightweight asynchronous wrapper around localStorage.  Its features include:

- It is [resilient to iOS's strange behaviour in private browsing mode](http://stackoverflow.com/questions/14555347/html5-localstorage-doesnt-works-in-ios-safari-private-browsing).
- By making use of [setImmediate](https://github.com/NobleJS/setImmediate) its callbacks are truly asynchronous whilst still being cross-browser and performant (compared with `setTimeout(function() {}, 0)` [which introduces a delay of *at least* 10ms](https://developer.mozilla.org/en-US/docs/Web/API/window.setTimeout#Minimum.2F_maximum_delay_and_timeout_nesting)).
- It accepts objects as values and runs `JSON.stringify` and `JSON.parse` for you.

## api

Superstore is an uninstantiable module.  Its methods are:

### #get(key, callback)

### #set(key, value, callback)

### #unset(key, callback)

### #clear(callback)

## todo

JSDoc comments and automatically generating documentation.
