require('setimmediate');

module.exports = callImmediate;

function callImmediate() {
  var self = this;
  var args = [].splice.call(arguments, 0);
  setImmediate(function () {
    args[0].apply(self, args.splice(1));
  });
}
