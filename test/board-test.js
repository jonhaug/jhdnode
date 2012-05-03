var Pos = require('../lib/pos');
var Board = require('../lib/board');
var Poss = require('../lib/poss');
var Set = require('../lib/set');

var testBoard =
    '..234....\n' +
    '....1.6.9\n' +
    '.2.......\n' +
    '.........\n' +
    '...7...8.\n' +
    '.........\n' +
    '.........\n' +
    '.........\n' +
    '.........\n';

var sndTestBoard =
    '53..7....\n' +
    '6..195...\n' +
    '.98....6.\n' +
    '8...6...3\n' +
    '4..8.3..1\n' +
    '7...2...6\n' +
    '.6....28.\n' +
    '...419..5\n' +
    '....8..79\n';

exports['One line'] = function (test) {
    var b = new Board();
    var arr = b.row2arr('..2.59...');
    // console.log('arr=' + arr);
    test.equal(1,arr[2]);
    test.done();
};


exports['Full board'] = function(test) {
    test.expect(4);
    var b = new Board(testBoard);
    test.equal(9,b.arr.length);
    //console.log(b);
    var pos = new Pos(1,4);
    //console.log('4,1=' + b.get(pos));
    test.equal(0,b.get(pos));
    var niner=new Set([0,1,2,3,4,5,6,7,8]);
    test.ok(niner.equals(b.get(new Pos(1,1))));
    test.ok(!niner.equals(b.get(new Pos(1,4))));
    //console.log(b.toString());
    test.done();
};
exports['Snd full board'] = function(test) {
    test.expect(4);
    var b = new Board(sndTestBoard);
    test.equal(9,b.arr.length);
    //console.log(b);
    var pos = new Pos(4,0);
//    console.log('4,1=' + b.get(pos));
    test.equal(3,b.get(pos));
    var niner=new Set([0,1,2,3,4,5,6,7,8]);
    test.ok(niner.equals(b.get(new Pos(1,1))));
    test.ok(!niner.equals(b.get(new Pos(1,4))));
    console.log(b.toString());
    test.done();
};
exports['is possible'] = function(test) {
    test.expect(7);
    var b = new Board(sndTestBoard);
    test.ok(! b.isPossible(new Pos(0,3),2));
    test.ok(! b.isPossible(new Pos(3,3),2));
    test.ok( b.isPossible(new Pos(2,4),2));
    test.ok(! b.isPossible(new Pos(4,6),2));
    test.ok(! b.isPossible(new Pos(6,8),2));
    test.ok( b.isPossible(new Pos(7,6),2));
    test.ok( b.isPossible(new Pos(7,7),2));
    test.done();
}
