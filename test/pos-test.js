var Pos = require('../lib/pos');

exports['Simple'] = function (test) {
    var pa = new Pos(1,4);
    var pb = new Pos(2,4);
    test.equal(true,pa.leq(pb));
    test.equal(false,pb.leq(pa));
    test.done();
};

exports['equals'] = function(test) {
    var pa = new Pos(1,4);
    var pb = new Pos(1,4);
    var pc = new Pos(4,1);
    test.equal(true, pa.equals(pb));
    test.equal(false, pa.equals(pc));
    test.done();
}
