var htmlBoard = require('../lib/html-board');
var Board = require('../lib/board');
var fs = require('fs');

var testBoard =
    '53..7....\n' +
    '6..195...\n' +
    '.98....6.\n' +
    '8...6...3\n' +
    '4..8.3..1\n' +
    '7...2...6\n' +
    '.6....28.\n' +
    '...419..5\n' +
    '....8..79\n';

exports['Simple'] = function (test) {
    var b = new Board(testBoard);
    var html = htmlBoard(b);
    fs.writeFileSync('x.html', html, encoding='utf8');
    test.ok(html.length > 10);
    test.done();
};
