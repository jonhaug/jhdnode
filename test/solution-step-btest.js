var buster = require('buster');
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


function sing(x) {
    return (typeof(x)=='number') || x.singleton();
}

buster.testCase("Solution step", {
    'One line': function () {
	var b = new Board();
	var arr = b.row2arr('..2.59...');
	// console.log('arr=' + arr);
	assert.equals(1,arr[2]);
	assert.equals(4,arr[4]);
	assert.equals(8,arr[5]);
	assert(niner.equals(arr[0]));
    },

    '//Subset one line': function() {
    },


    'Full board': function() {
	var b = new Board(sndTestBoard);
	var singleCount=0;
	b.map(function(val, pos) { if (sing(val)) singleCount++;});
	assert.equals(30,singleCount);
	singleCount=0;
	b.map(function(val, pos) { if (sing(val)) singleCount++;}, Poss.col(2));
	assert.equals(1,singleCount);
	singleCount=0;
	b.map(function(val, pos) { if (sing(val)) singleCount++;}, Poss.row(2));
	assert.equals(3,singleCount);
	singleCount=0;
	b.map(function(val, pos) { if (sing(val)) singleCount++;}, Poss.blk(2));
	assert.equals(1,singleCount);
    },

    'Full board count all': function() {
	var b = new Board(sndTestBoard);
	var countAll=0;
	b.map(function(val, pos) { if (sing(val)) countAll++;});

	var countCol=0;
	for (var i=0; i<9; i++) {
	    b.map(function(val, pos) { if (sing(val)) countCol++;}, Poss.col(i));
	}
	assert.equals(countAll,countCol);

	var countRow=0;
	for (var i=0; i<9; i++) {
	    b.map(function(val, pos) { if (sing(val)) countRow++;}, Poss.row(i));
	}
	assert.equals(countAll,countRow);

	var countBlk=0;
	for (var i=0; i<9; i++) {
	    b.map(function(val, pos) { if (sing(val)) countBlk++;}, Poss.blk(i));
	}
	assert.equals(countAll,countBlk);

    },

    'Is possible to insert a number?': function() {
	var b = new Board(sndTestBoard);
	var pos = new Pos(0,3);
	assert(! b.getValue(pos));
	var poss = Poss.myPoss(pos);
	assert.equals(21, poss.size());
	var knowns = new Set([]);
	b.map(function(x) { if (sing(x)) { knowns = knowns.add(x);}}, poss);
	assert(knowns.equals(new Set([0,2,3,4,6,7,8])));
    
	var other = niner.remove(knowns);
    },
});

