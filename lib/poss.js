
var Pos = require('./pos');
var Set = require('./set');

function seq(low,high) {
  var s=[];
  while (low < high) {
    s.push(low++);
  }
  return s;
}

function row(rowNo) {
  return new Set(seq(0,9).map(function(x){return new Pos(x,rowNo);}),Pos.sortFunc);
}
function col(colNo) {
  return new Set(seq(0,9).map(function(y){return new Pos(colNo,y);}),Pos.sortFunc);
}
function blk(blkNo) {
  var xBase = (blkNo % 3) * 3;
  var yBase = parseInt(blkNo / 3) * 3;
  return new Set(seq(0,9).map(function(i){
	return new Pos(xBase + (i % 3), yBase + parseInt((i/3)));
      }),Pos.sortFunc);
}
function all() {
  var s=row(0);
  for (var i=1;i<9;i++) s=s.union(row(i));
  return s;
}

function myRow(pos) { return row(pos.y); }
function myBlk(pos) { return blk((pos.x - pos.x % 3)/3 + (pos.y - pos.y % 3));}
function myCol(pos) { return col(pos.x); }

module.exports.row = row;
module.exports.col = col;
module.exports.blk = blk;
module.exports.all = all;
module.exports.myRow = myRow;
module.exports.myCol = myCol;
module.exports.myBlk = myBlk;
