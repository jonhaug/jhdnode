var Pos = require('../lib/pos');
var Board = require('../lib/board');
var Poss = require('../lib/poss');

var testBoard =
    '..234....\n' +
    '....1.6.9.\n' +
    '.2.......\n' +
    '.........\n' +
    '...7...8.\n' +
    '.........\n' +
    '.........\n' +
    '.........\n' +
    '.........\n';

exports['One line'] = function (test) {
    var b = new Board();
    var arr = b.row2arr('..2.59...');
    console.log('arr=' + arr);
    test.equal(2,arr[2]);
    test.done();
};

exports['Full board'] = function(test) {
    var b = new Board(testBoard);
    console.log(b);
    var pos = new Pos(1,4);
    console.log('4,1=' + b.get(pos));
    test.equal(1,b.get(pos));
    test.done();
};
