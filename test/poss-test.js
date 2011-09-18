var Pos = require('../lib/pos');
var poss=require('../lib/poss');
var Set = require('../lib/set');

exports['Simple'] = function (test) {
    var r0=poss.row(0);
    var r1=poss.row(1);
    var rr=r0.union(r1);
    test.equal(true,rr.checkOrder());
    test.done();
};

exports['Simpler'] = function(test) {
    var p1=new Pos(0,2);
    var p2=new Pos(2,0);
    var p3=new Pos(1,1);
    var r=[];
    r.push(p3); r.push(p2); r.push(p1);
    var pp=new Set(r,Pos.leq);
    test.equal(true, pp.checkOrder());
    test.done();
};

