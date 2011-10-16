var Set = require('./set');
var poss=require('./poss');

function Board(str) {
    var self=this;
    if (str) {
	self.arr=string2arr(str);
    } else {
	var b=new Array(9);
	for (var i=0;i<9;i++) {
	    b[i]=new Array(9);
	    for (var j=0;j<9;j++) {
		b[i][j]=new Set([0,1,2,3,4,5,6,7,8]);
	    }
	}
	this.arr=b;
    }
}

Board.prototype.set=function(pos,v) {
    var that=this;
    that.b[pos.x][pos.y]=v;
}

Board.prototype.get=function(pos) {
    var that=this;
//    console.log(pos);
    //console.log(that);
    return that.arr[pos.x][pos.y];
}

Board.prototype.getValue=function(pos) {
    var that=this;
    var v=that.get(pos);
    return (v.size() == 1 ? v[0] : false);
}

Board.prototype.map=function(fn, myposs) {
    var that=this;
    myposs = myposs ? myposs : poss.all();
    myposs.map(function(x){ fn(that.get(x), x); });
}

function string2arr(bString) {
    var sList=bString.split(/\s+/);
    return sList.map(row2arr);
}

function row2arr(row) {
    console.log('row2arr: ' + row);
    var rowArr=[]
    for (var i=0; i<row.length; i++) {
	var x=row.charAt(i);
	if (x != '.') {
	    rowArr[i]=parseInt(x);
	} else {
	    rowArr[i] = new Set([0,1,2,3,4,5,6,7,8]);
	}
    }
    return rowArr;
};
Board.prototype.row2arr=row2arr;

Board.prototype.toString=function() {
    var self=this;
    var result='[';
    self.map(function(v,pos) {
	if (pos.x==0) result+= '[';
	result += v.toString();
	if (pos.x==8) result+=']\n';
	if (pos.x==2 || pos.x==5) result+=' | ';
    });
    result += ']';
    return result;
    
}

module.exports = Board;
