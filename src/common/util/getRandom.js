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
    for (var i = 0; i < longNum-8; i++) {//此处的10为生成10位数字，可随即更改
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

    var value=date+randStr;//此处的766是要求必须已766开头，如果不需要可以去掉并在for循环中填入你要的位数

    return value
  }
}

export {
  randomNum
}
