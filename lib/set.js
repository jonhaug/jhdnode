function m2(arr, fn) {
    for(var i=0;i<arr.length-1;i++) {
        fn(arr[i],arr[i+1]);
    }
};

function map2(arr,fn) {
    for(var i=0;i<arr.length;i++) {
        fn(arr[i],(i+1<arr.length ? arr[i+1] : undefined));
    }
};

// Return arr where successive duplicates are removed.  Like the unix command uniq.
function uniq(arr,eq) {
    var result=[];
    var local_eq = eq ? eq : function(x,y) { return x==y; };
    map2(arr,function(x,y) {
        if (y==undefined || ! local_eq(x,y)) result.push(x);
    });
    return result;
}

// Return an array of all element combinations of input arr.
function arrOfArr(arr) {
    if (arr.length==0) {
        return [[]];
    } else {
        var first=arr[0];
        var rest=arr.slice(1);
        var _ss=arrOfArr(rest);
        var _ssx=_ss.map(function(x) {return [first].concat(x);});
        return _ssx.concat(_ss);
    }
}

function Set(arr,leq) {
    var myleq = leq ? leq : function(x,y) {return x<=y;};
    this.leq = myleq;
    var myArr=arr.slice();
    myArr.sort(function(x,y) {return (myleq(x,y) ? -1 : 1);});
    this.arr=uniq(myArr,function(x,y){return (myleq(x,y) && myleq(y,x));});
}

Set.isSet=function(x) { return (typeof(x.arr)=='object' && typeof(x.leq)=='function');}

Set.prototype.geq=function(x,y) {var that=this; return that.leq(y,x);};
Set.prototype.size=function() {var that=this;return that.arr.length;}
Set.prototype.eq=function(x,y) {var that=this; return (that.leq(x,y) && that.leq(y,x));};
Set.prototype.size=function() {var that=this;return that.arr.length;}
Set.prototype.has=function(x) {
    var that=this;var aa=function(y) { return that.eq(x,y); }
    return this.arr.some(aa);
};
Set.prototype.subset=function(otherSet) {
    var that=this;
    return that.arr.every(function(x){return otherSet.has(x);});
}
Set.prototype.equals = function(otherSet) {
    var that=this;
    return Set.isSet(otherSet) && that.subset(otherSet) && otherSet.subset(that);
}
Set.prototype.add=function(x) {var that=this; return new Set(that.arr.concat(x),that.leq);}
    Set.prototype.union=function(otherSet) { var that=this; return new Set(that.arr.concat(otherSet.arr),that.leq);};

Set.prototype.toString=function() {var that=this; return "{" + that.arr + '}';}
Set.prototype.emptySet=function() {var that=this; return new Set([],that.leq);}

Set.prototype.filter=function(f) {var that=this; var newArr=that.arr.filter(f); return new Set(newArr,that.leq);}

Set.prototype.cut=function(otherSet) {
    var that=this;
    return that.filter(function(x) {return otherSet.has(x);});
};

Set.prototype.remove = function(otherSet) {
    var that=this;
    return that.filter(function(x) {return ! otherSet.has(x);});
};

Set.prototype.singleton = function() {
    var that=this;
    return that.size() == 1;
}

Set.prototype.singleValue = function() {
    var that=this;
    if (that.singleton()) return that.arr[0];
}

Set.prototype.map = function(fn) {
    var that=this;
    that.arr.map(fn);
}

Set.prototype.checkOrder=function() {
    var that=this;
    var ok=true;
    map2(that.arr, function(a,b) {
	    if (!(a==undefined) && !(b==undefined) && !that.leq(a,b)) {
		console.log('Warning! ' + a + ' is not leq than ' + b);
		ok=false;
	    }
	});
    return ok;
}


Set.prototype.toCompact = function() {
    var self=this;
    var result='';
    if (self.arr.length == 0) return result;
    var beg=self.arr[0];
    if (typeof(beg) != 'number') return '(not numbers)';
    var prev=beg;
    for(var i=1;i<self.arr.length;i++) {
	var curr=self.arr[i];
//	console.log('beg=' + beg + ' prev=' + prev + ' curr=' + curr);
	if (prev+1 == curr) {
	    prev=curr;
	} else {
	    if (beg == prev) {
		result += beg;
	    } else if (beg+1 == prev) {
		result += beg + '' + prev;
	    } else {
		result += beg + '-' + prev;
	    }
	    beg=curr;prev=curr;
	}
    }
    if (beg == prev) result += beg
    else if (beg+1 == prev) result += beg + '' + prev
    else result += beg + '-' + prev
    return result;
}


Set.prototype.setOfSet=function() {
    var that=this;
    var arrArr=arrOfArr(that.arr);
    var arrSet=arrArr.map(function(x){ return new Set(x,that.leq);});
    var setSet=new Set(arrSet,function(x,y){return x.subset(y);});
    return setSet;
}

module.exports = Set;

// var sa=new Set([1,2,3]);
// var sb=new Set([2,3,4]);

// var ssx=new Set([sa,sb],function(x,y){return x.subset(y);});
