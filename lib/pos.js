function Pos(x,y) {
    this.x=x;
    this.y=y;
}

Pos.prototype.leq=function(otherPos) {
    var that=this
    return (that.y < otherPos.y ||
	    (that.y == otherPos.y && that.x <= otherPos.x));
};
Pos.prototype.sortFunc=function(otherPos) {
    return this.leq(otherPos) ? -1 : 1;
}   

Pos.prototype.equals=function(otherPos) {
    var that=this
    return that.leq(otherPos) && otherPos.leq(that);
}
Pos.prototype.toString=function() {
    var that=this
    return "(" + that.x + ',' + that.y + ')';
};

module.exports=Pos

    

    


    

    