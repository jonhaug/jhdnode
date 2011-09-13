var Set = require('../lib/set');

exports['Simple'] = function (test) {
    var set = new Set([1,2,3,4,5]);
    test.equal(set.has(3), true);
    //    test.throws(function () { doubled.calculate('123'); });
    test.done();
};

exports['setsOfSets'] = function(test) {
    var set = new Set([5,6,7]);
    var ssets = set.setOfSet();
    test.equal(8, ssets.size());
    test.done();
}
