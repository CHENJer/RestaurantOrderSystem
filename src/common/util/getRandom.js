/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
**
** 生成3-32位随机串：randomWord(true, 3, 32)
** 生成43位随机串：randomWord(false, 43)
*/
/*
function randomNum(randomFlag, min, max){
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // 随机产生
  if(randomFlag){
    range = Math.round(Math.random() * (max-min)) + min;
  }
  for(var i=0; i<range; i++){
    pos = Math.round(Math.random() * (arr.length-1));
    str += arr[pos];
  }
  return str;
}*/
function randomNum(longNum){
  for(var j=0;j<10;j++){
    var randStr = "";
    for (var i = 0; i < longNum-8; i++) {//此处生成longNum-8位数字，可随即更改
      var randItem = Math.floor(Math.random() * 10);
      randStr += randItem;
    }
    var today = new Date();
    var day   = today.getDate();
    var month = today.getMonth() + 1;           //显示月份比实际月份小1,所以要加1
    var year  = today.getFullYear();
    month 	  = month<10?"0"+month:month;       //数字<10，实际显示为，如5，要改成05
    day	      = day<10?"0"+day:day;             //和月份显示一样
    var date  = year+month+day;

    var value=date+randStr;//

    return value
  }
}
function getOnlyNum(En) {
  var en = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  var num = ['0','1','2','3','4','5','6','7','8','9'];
  var enres = "";
  var numres = ""
  for(var i = 0; i < 1 ; i ++) {
    var enrandom = Math.ceil(Math.random()*25);
    enres += en[enrandom];
  }
  for(var i = 0; i < 15 ; i ++) {
    var numrandom = Math.ceil(Math.random()*9);
    numres += num[numrandom];
  }
  return En+numres;




}
export {
  randomNum,
  getOnlyNum
}
