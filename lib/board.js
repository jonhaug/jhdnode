var Set = require('./set');
var poss=require('./poss');
var sprintf = require('sprintf').sprintf;

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
    var r =  that.arr[pos.x][pos.y];
 //   console.log('(' + pos.x + ',' + pos.y +  ':' + r + ')');
    return r;
}

Board.prototype.getValue=function(pos) {
    var that=this;
    var v=that.get(pos);
    if ((typeof v) == 'number') return v;
    return (v.size() == 1 ? v[0] : false);
}

Board.prototype.map=function(fn, myposs) {
    var that=this;
    myposs = myposs ? myposs : poss.all();
    myposs.map(function(x){ fn(that.get(x), x); });
}

// True if the given position may hold value value.
// Problem: how deep should one search?
// Start with just fixed value in any of the three niners it is in.
Board.prototype.isPossible=function(pos,value) {
    var that=this;
    if (that.getValue(pos)) return false;
    var myposs = poss.myPoss(pos);
    var r = true
    that.map(function(x,p) {
	if ((typeof x) == 'number' &&  x ==value) r=false;
    }, myposs);
    return r;
}

Board.prototype.mustBe = function(pos, niner, value) {
    var self = this;
    if (self.isPossible(pos, value)) {
	var places = 0
	self.map(function(v,p) {
	    if (self.isPossible(p, value)) places++;
	    console.log("pos=" + p + " places=" + places + ' value=' + value + ' v=' + v);
	}, niner);
	return (places == 1);
    } else {
	console.log("Not possible, pos=" + pos +  ' value=' + value  + ' b.pos=' + self.getValue(pos));
	return false;
    }
}

function string2arr(bString) {
    var sList=bString.split(/\s+/).filter(function(x) {return x.length > 0;});
    return sList.map(row2arr);
}

function row2arr(row) {
  //  console.log('row2arr: ' + row);
    var rowArr=[]
    for (var i=0; i<row.length; i++) {
	var x=row.charAt(i);
	if (x != '.') {
	    rowArr[i]=parseInt(x)-1; //console.log("(" + i + "." + rowArr[i] + ")");
	} else {
	    rowArr[i] = new Set([0,1,2,3,4,5,6,7,8]);
	}
    }
//    console.log(rowArr);
    return rowArr;
};
Board.prototype.row2arr=row2arr;

Board.prototype.toString=function() {
    var self=this;
    var result='[\n';
    var col=0;
    self.map(function(v,pos) {
	//console.log(pos);
	if (pos.y==0) result+= '[';
	if (typeof(v) != 'number') {
	    n=sprintf('%-8s',v.toCompact());
	} else {
	    n=sprintf('%-8d', v);
	};
	result += n;
	col += n.length;
	if (pos.y==8) {
	    result+=']\n'; col=0;
	    if (pos.x==2 || pos.x==5) {
		result += repeatString(80,'-');
		result += '\n';
	    }
	}
	if (pos.y==2) {
	    result+=' | ';
	} else if (pos.y==5) {
	    result+=' | ';
	}
    });
    result += ']';
    return result;
    
}

function repeatString(n,str) {
    if (! str) str=" ";
    if (n==0) return "";
    return str + repeatString(n-1,str);
}
module.exports = Board;
