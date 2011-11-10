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

exports['single'] = function(test) {
    var set = new Set([1,4,6]);
    test.equal(false, set.singleton());
    test.equal(undefined, set.singleValue());
    var nset = new Set([3,4,5]);
    set = set.cut(nset);
    test.equal(true, set.singleton());
    test.equal(4, set.singleValue());
    test.done();
}

exports['map'] = function(test) {
    var set = new Set([1,2,3,5,6]);
    var sum=0;
    set.map(function(x) { sum += x; })
    test.equal(17, sum);
    test.done();
}

exports['isSet'] = function(test) {
    var set = new Set([1,2]);
    test.ok(Set.isSet(set));
    test.ok(Set.isSet(set.setOfSet()));
    test.ok(!Set.isSet(5));
    test.ok(!Set.isSet(true));
    test.ok(!Set.isSet([1,2,3]));
    test.done();
}
