var Board = require('./board');
var Poss = require('./poss');
var Set = require('./set');

module.exports = Solution_step;

function Solution_step(b) {
    // for all positions with more than one value
    //   find all posible values
    //      only one value possible?
    //          --> this is the value.
    //              make a structure 'singleValue': [ X ]
    //              where X={ pos: pos, value: value }
    //      is new set of values less than original set?
    //          --> make a structure 'mulValues': [Y]
    //              where Y={pos: pos, values: values }
    //
    // TODO: add pedagogic information on why this is so.

    var all=Poss.all();
    var result={};
    all.map(function(pos) {
	var cur=b.get(pos);
	if (typeof(cur) != 'number') {
	    var oth=new Set([]);
	    var poss=Poss.myPoss(pos);
	    b.map(function(x) {
		if (sing(x)) { oth = oth.add(x);}
	    }, poss);
	    var nw=cur.remove(oth);
	    if (! cur.equals(nw)) {
		if (sing(nw)) {
		    addProp(result, 'singleValue', {pos:pos, value:nw.singleValue()});
		} else {
		    addProp(result, 'mulValues', {pos: pos, values: nw});
		}
	    }
	}
    });
    return result;
};


function addProp(object, key, value) {
    if (object[key]) {
	object[key].push(value);
    } else {
	object[key]=[value];
    }
}

function sing(x) {
    return (typeof(x)=='number') || x.singleton();
}



