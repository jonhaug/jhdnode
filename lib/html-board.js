var Board = require('./board');
var poss = require('./poss');
var Pos = require('./pos');

module.exports = function(board) {
    return prefix + blockParse(board)  + postfix;
}

function rowParse(board) {
    return '<table class="board">\n' +
	[0,1,2,3,4,5,6,7,8].map(function(i){return htmlRow(board,i);}).reduce(function(a,b) { return a+b+'\n'; }) +
	'</table>\n';
}

function htmlRow(b,i) {
    return '<tr>' + poss.row(i).arr.map(function(pos) {
	var val = b.getValue(pos);
	var thisId='id_' + (pos.x+1) + (pos.y+1);
	var thisClass='';
	if ((pos.x % 3) == 0) thisClass += 'topB ';
	if ((pos.x % 3) == 2) thisClass += 'botB ';
	if ((pos.y % 3) == 0) thisClass += 'lefB ';
	if ((pos.y % 3) == 2) thisClass += 'rigB ';
	return '<td class="' + thisClass + '" id="' + thisId + '">' + (val ? val+1 : '&nbsp;') + '</td>';
    }).reduce(function(a,b){return a+b;}) +
	'</tr>';
}

function blockParse(board) {
    return '<table>\n' +
	[0,1,2].map(function(i) {
	    return '<tr>' +
		[0,1,2].map(function(j) {
		    return '<td class="tdblock">' + htmlblock(board, i*3 + j) + '</td>';
		}).reduce(hcatnl) +
		'</tr>';
	}).reduce(hcatnl) +
	'</table>\n';
}

function htmlblock(board, n) {
    var startPos = poss.blk(n).arr[0];
    return '<table class="tblock" border="1">' +
	[0,1,2].map(function(i) {
	    return '<tr>' +
		[0,1,2].map(function(j) {
		    var value = board.getValue(new Pos(startPos.x+i,startPos.y+j));
		    return '<td>' + (value ? (value+1):'&nbsp;') + '</td>';
		}).reduce(hcat) +
		'</tr>\n';
	}).reduce(hcatnl) +
	'</table>\n';
}


var prefix =
    "<html><head><title>test</title>\n" +
    "<style>\n" +
    "  td { width: 5em; border: 1px solid #c9c9c9; padding: 10px 18px;}\n" +
    "  td.tdblock { width: 7em; margin: 0px; padding: 0px; border: 2px solid blue;}\n" +
    "  td.topB { border-top: 2px solid blue; }\n" +
    "  td.botB { border-bottom: 2px solid blue; }\n" +
    "  td.lefB { border-left: 2px solid blue; }\n" +
    "  td.rigB { border-right: 2px solid blue; }\n" +
    "  table { margin: 1em; font-size: xx-large; border-collapse: collapse; empty-cells: show;}\n" +
    "  table.tblock { table-layout: fixed; margin: 0px; font-size: xx-large;empty-cells: show;}\n" +
    "</style></head>\n" +
    "<body>\n";

var postfix = "</body>\n";

    function hcat(a,b) { return a+b;}
    function hcatnl(a,b) { return a+b+'\n';}