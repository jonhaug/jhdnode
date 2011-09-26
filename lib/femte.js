function m2(arr, fn) {
    for(var i=0;i<arr.length-1;i++) {
        fn(arr[i],arr[i+1]);
    }
};

 function red(arr) {
     if (arr.length ==1) {
         return arr[0];
     } else {
         var newarr=[];
         m2(arr,function(x,y) {newarr.push(x+y);});
         return red(newarr);
     }
 }

function perm(arr, fn, current) {
    var ncurrent= (current ? current : []);
    if (arr.length==0) {
        fn(ncurrent);
    } else {
        for (var i=0; i<arr.length; i++) {
            var narr=arr.slice();
            var el=narr.splice(i,1)[0];
            var nncurrent=ncurrent.slice();
            nncurrent.push(el);
            perm(narr,fn,nncurrent);
        }
    }
}


var arr=[ -5, -2, 4, -7, 8, 6 ];
perm(arr, function(x) { var r=red(x); if (r==1) { console.log(x);}});

