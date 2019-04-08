import OSS from 'ali-oss';
export const Cookie = {

  Set: function(cName, cValue, cExp) { //cExp:cookie的有效期，传入的参数以分钟计算
    var str = cName + "=" + escape(cValue)
    if(cExp > 0) {
      var exp = new Date();
      exp.setTime(exp.getTime() + cExp * 60 * 1000);

      str = str + ";expires=" + exp.toGMTString();
    }
    document.cookie = str;
  },

  Get: function(objName) {

    var arrStr = document.cookie.split("; ");
    for(var i = 0; i < arrStr.length; i++) {
      var temp = arrStr[i].split("=");
      if(temp[0] == objName)
        return unescape(temp[1]);
    }
    return '';
  },

}

export const jzm = {
  findOnID: function(rpts, rid) {
    for(var n = 0; n < rpts.length; n++) {
      if(rpts[n].rid == rid) {
        return rpts[n].data;
      }
    }
    return "";
  },
  StrJoin:function(table,colName) //主要用于多表格多选，取出单列选中值，用逗号隔开
  {
    var colsValue ='';
    for(var i = 0; i < table.length; i++) {
      colsValue += "'" + table[i][colName] + "',";
    }
    colsValue = colsValue.substring(0, colsValue.length - 1);
    return colsValue;
  },
  SplitCodeName: function(codeName, para) {
    if(para == 'name') {
      return codeName.split('-')[1];
    } else {
      return codeName.split('-')[0];
    }
  }
}

export const Client = {
  NewOSS: function() {
    let client = new OSS({
      region: process.env.REGION,
      accessKeyId: process.env.ACCESS_KEYID,
      accessKeySecret: process.env.ACCESSKEYSECRET,
      bucket:process.env.bucket
    });
    return client;
  }
}
