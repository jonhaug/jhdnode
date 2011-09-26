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

exports['Simple'] = function (test) {
    var b = new Board(testBoard);

    test.equal(2,b.getValue(3,0));
    test.done();
};
