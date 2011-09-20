var Set = require('./set');

function Board() {
    var b=new Array(9);
    for (var i=0;i<9;i++) {
	b[i]=new Array(9);
	for (var j=0;j<9;j++) {
	    b[i][j]=new Set([0,1,2,3,4,5,6,7,9]);
	}
    }
    this.arr=b;
}

Board.prototype.set(x,y,v) {
    var that=this;
    b[x][y]=v;
}

Board.prototype.get(pos) {
    var that=this;
    return that.arr[pos.x][pos.y];
}

Board.prototype.map(poss, fn) {
    var that=this;
    poss.map(function(x){ fn(that.get(x)); });
}



