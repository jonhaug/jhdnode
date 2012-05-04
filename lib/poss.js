
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
  return new Set(seq(0,9).map(function(y){return new Pos(rowNo,y);}),Pos.sortFunc);
}
function col(colNo) {
  return new Set(seq(0,9).map(function(x){return new Pos(x,colNo);}),Pos.sortFunc);
}
function blk(blkNo) {
  var yBase = (blkNo % 3) * 3;
  var xBase = parseInt(blkNo / 3) * 3;
  return new Set(seq(0,9).map(function(i){
     // console.log('i='+i + ' x='+(xBase + parseInt(i/3)) + ' y='+(yBase + (i % 3)));
	return new Pos(xBase + parseInt(i/3), yBase + (i % 3));
      }),Pos.sortFunc);
}
function all() {
  var s=row(0);
  for (var i=1;i<9;i++) s=s.union(row(i));
  return s;
}

function myRow(pos) { return row(pos.x); }
function myBlk(pos) { return blk((pos.x - pos.x % 3) + (pos.y - pos.y % 3)/3);}
function myCol(pos) { return col(pos.y); }

function myPoss(pos) { return myRow(pos).union(myBlk(pos)).union(myCol(pos)); }

module.exports.row = row;
module.exports.col = col;
module.exports.blk = blk;
module.exports.all = all;
module.exports.myRow = myRow;
module.exports.myCol = myCol;
module.exports.myBlk = myBlk;
module.exports.myPoss = myPoss;
