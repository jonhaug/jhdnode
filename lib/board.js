var Set = require('./set');

function Board() {
    var b=new Array(9);
    for (var i=0;i<9;i++) {
	b[i]=new Array(9);
	for (var j=0;j<9;j++) {
	    b[i][j]=new Set([0,1,2,3,4,5,6,7,8]);
	}
    }
    this.arr=b;
}

Board.prototype.set(pos,v) {
    var that=this;
    that.b[pos.x][pos.y]=v;
}

Board.prototype.get(pos) {
    var that=this;
    return that.arr[pos.x][pos.y];
}

Board.prototype.getValue(pos) {
    var that=this;
    var v=that.get(pos);
    return (v.size() == 1 : v[0] : false);
}

Board.prototype.map(poss, fn) {
    var that=this;
    poss.map(function(x){ fn(that.get(x), x); });
}

Board.prototype.string2arr(bString) {
    var sList=bString.split(/\W+/);
    return sList.map(function(row) {
	var rowArr=[]
	for (var i=0; i<9; i++) {
	    var x=row.charAt(i);
	    if (x != '.') {
		rowArr[i]=parseInt(x);
	    }
	}
	return rowArr;
    });
}

