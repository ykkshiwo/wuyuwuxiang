function getRad(d) {
  var PI = Math.PI;
  return d * PI / 180.0;
}

function getDistance(lat1, lng1, lat2, lng2) {
  // console.log("距离函数接受到的参数为： ", lat1, lng1, lat2, lng2)
  var lat1 = parseFloat(lat1) + 0.000001
  var z = (parseFloat(lat1) + parseFloat(lat2)) / 2
  var f = Math.PI * z / 180.0
  var g = getRad((lat1 - lat2) / 2);
  var l = getRad((lng1 - lng2) / 2);
  var sg = Math.sin(g);
  var sl = Math.sin(l);
  var sf = Math.sin(f);
  var s, c, w, r, d, h1, h2;
  var a = 6378137.0;//The Radius of eath in meter.   
  var fl = 1 / 298.257;
  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;
  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;
  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;
  s = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
  s = s / 1000;
  s = s.toFixed(2);//指定小数点后的位数。 
  console.log("距离函数计算结果为： ", s)
  return s;
}

function allDistance(szZuobiao){
  console.log(szZuobiao)
  var D=0;
  for (var i=0;i<szZuobiao.length-1;i++){
    var d = getDistance(szZuobiao[i][1], szZuobiao[i][0],szZuobiao[i+1][1],szZuobiao[i+1][0])
    console.log(d)
    D = parseFloat(D) + parseFloat(d)
    D = D.toFixed(2)
    console.log(D)
  }
  return D;
}

module.exports = {
  getDistance: getDistance,
  allDistance: allDistance
}