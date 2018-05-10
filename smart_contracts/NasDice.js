'use strict';

var NasDice = function() {


};

NasDice.prototype = {
  init: function() {
    // initialize some things here
    this.balance = new BigNumber(0);
    this.owner = Blockchain.transaction.from;

  },
  _convertToNas: function(value) {
    var res = new BigNumber(value);
    var nas = new BigNumber(10 * Math.pow(10, 18));
    return res.dividedBy(nas);
  },
  _convertToWei: function(value) {
    var res = new BigNumber(value);
    var nas = new BigNumber(10 * Math.pow(10, 18));
    return res.times(nas);
  }
};

module.exports = NasDice;