var Pos = require('../lib/pos');
var Board = require('../lib/board');
var Poss = require('../lib/poss');
var Set = require('../lib/set');

// 3571841597 --> 1345789 --> 0234678
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

var niner = new Set([0,1,2,3,4,5,6,7,8]);

exports['One line'] = function (test) {
    var b = new Board();
    var arr = b.row2arr('..2.59...');
    // console.log('arr=' + arr);
    test.equal(1,arr[2]);
    test.equal(4,arr[4]);
    test.equal(8,arr[5]);
    test.ok(niner.equals(arr[0]));
    test.done();
};

exports['Subset one line'] = function(test) {
    
    test.done();
}

function sing(x) {
    return (typeof(x)=='number') || x.singleton();
}


exports['Full board'] = function(test) {
    var b = new Board(sndTestBoard);
    var singleCount=0;
    b.map(function(val, pos) { if (sing(val)) singleCount++;});
    test.equal(30,singleCount);
    singleCount=0;
    b.map(function(val, pos) { if (sing(val)) singleCount++;}, Poss.col(2));
    test.equal(1,singleCount);
    singleCount=0;
    b.map(function(val, pos) { if (sing(val)) singleCount++;}, Poss.row(2));
    test.equal(3,singleCount);
    singleCount=0;
    b.map(function(val, pos) { if (sing(val)) singleCount++;}, Poss.blk(2));
    test.equal(1,singleCount);
    test.done();
}

exports['Full board count all'] = function(test) {
    var b = new Board(sndTestBoard);
    var countAll=0;
    b.map(function(val, pos) { if (sing(val)) countAll++;});

    var countCol=0;
    for (var i=0; i<9; i++) {
	b.map(function(val, pos) { if (sing(val)) countCol++;}, Poss.col(i));
    }
    test.equal(countAll,countCol);

    var countRow=0;
    for (var i=0; i<9; i++) {
	b.map(function(val, pos) { if (sing(val)) countRow++;}, Poss.row(i));
    }
    test.equal(countAll,countRow);

    var countBlk=0;
    for (var i=0; i<9; i++) {
	b.map(function(val, pos) { if (sing(val)) countBlk++;}, Poss.blk(i));
    }
    test.equal(countAll,countBlk);

    test.done();
}

exports['Is possible to insert a number?'] = function(test) {
    var b = new Board(sndTestBoard);
    var pos = new Pos(0,3);
    test.ok(! b.getValue(pos));
    var poss = Poss.myPoss(pos);
    test.equal(21, poss.size());
    var knowns = new Set([]);
    b.map(function(x) { if (sing(x)) { knowns = knowns.add(x);}}, poss);
    test.ok(knowns.equals(new Set([0,2,3,4,6,7,8])));
    
    var other = niner.remove(knowns);

    
    test.done();
}
