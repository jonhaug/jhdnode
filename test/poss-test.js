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

exports['rows and columns'] = function(test) {
    var x = poss.row(5).remove(poss.col(2));
    test.equal(8,x.size());
    var y = x.remove(poss.blk(5));
    test.equal(5,y.size());
    test.done();
}

exports['Block and setOfSet'] = function(test) {
    var x = poss.blk(5).setOfSet().filter(function(x){return x.size()==2;});
    test.equal(36,x.size());
    test.done();
}

exports['myBlk, myCol and myRow tests'] = function(test) {
    var pos = new Pos(5,6);
    var r = poss.myRow(pos);
    test.equal(true, r.has(pos));
    var c = poss.myCol(pos);
    test.equal(true, c.has(pos));
    var b = poss.myBlk(pos);
    test.equal(true, b.has(pos));
    var epos=r.cut(c).cut(b);
    test.equal(true, epos.has(pos));
    test.equal(1, epos.size());
    test.done();
}