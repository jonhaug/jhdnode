
var Pos = require('pos');
var Set = require('set');

function seq(low,high) {
  var s=[];
  while (low < high) {
    s.push(low++);
  }
  return s;
}

function row(rowNo) {
  return new Set(seq(0,9).map(function(x){return new Pos(x,rowNo);}),Pos.leq);
}
function col(colNo) {
  return new Set(seq(0,9).map(function(y){return new Pos(colNo,y);}),Pos.leq);
}
function blk(blkNo) {
  var xBase = (blkNo % 3) * 3;
  var yBase = parseInt(blkNo / 3) * 3;
  return new Set(seq(0,9).map(function(i){
	return new Pos(xBase + (i % 3), yBase + parseInt((i/3)));
      }),Pos.leq);
}

module.exports.row = row;
module.exports.col = col;
module.exports.blk = blk;

  

    
