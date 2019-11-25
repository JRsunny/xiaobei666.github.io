var zyHost = window.location.host;
if (zyHost==="wbs.zyebank.com.cn:9009"||zyHost==="wbs.zyebank.net"||zyHost==="wbs.zyebank.cn"||zyHost==="wbs.zyebank.com") {
  zyHost = '';
} else {
  // zyHost = 'http://40.64.133.70:8088'; // 永健
  zyHost = 'http://40.64.133.113:8088'
}
// 兼容页面及字体大小
(function(win, doc) {
  var win = window;
  var doc = win.document;	
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in win ? "orientationchange" : "resize",
    recalc = function() {
      var clientwidth = docEl.clientWidth;
      if(!clientwidth) { return false; }
      var fz = 100 * (clientwidth / 375) + "px"
      docEl.style.fontSize = fz
      var realfz = win.getComputedStyle(docEl).fontSize
      if (fz !== realfz) {
        docEl.style.fontSize = fz.replace("px", '') * (fz.replace("px", '') / realfz.replace("px", '')) + "px"
      }
    };
  if(!doc.addEventListener) { return false; }
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(window, document);
/**
 * 异步请求服务
 * @param url 请求地址 
 * @param data 请求数据对象
 * @param succ 成功回调函数
 * @param err 失败回调函数
 */
function ajaxPost(url, data, succ, err) {
  $.ajax({
    type: "POST",
    url: url,
    async: true,
    data: data,
    success: succ,
    error: err
  })
};
// 获取页面传值，返回一个对象
function getParams() {
  var arrTmp = [], getSearch = window.location.search;
  var getObj = {};
  if (getSearch) {
    arrTmp = getSearch.substr(1).split("&");
    for (var i = 0;i<arrTmp.length;i++) {
      var arrTemp = arrTmp[i].split("=");
      getObj[arrTemp[0]] = decodeURIComponent(arrTemp[1]);
    }
    return getObj;
  }
};
// // 钱格式转换1230000 => 1,230,000.00
window.comFormatMoney = function  (s,n) {
  if (!s) { return '0.00' }
  var isNagtive = false
  if (parseFloat((s + '')) < 0) {
    isNagtive = true
    s = s.toString()
    s = s.replace(/-/g, '')
  }
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
  var I = s.split('.')[0].split('').reverse()
  var r = s.split('.')[1]
  var t = ''
  for (var i = 0; i < I.length; i++) {
    t += I[i] + ((i + 1) % 3 === 0 && (i + 1) !== I.length ? ',' : '')
  }
  if (isNagtive) {
    var str = '-' + t.split('').reverse().join('') + '.' + r
    if (str === 'NaN.undefined') {
      str = '0.00'
    }
    return str
  } else {
    var str = t.split('').reverse().join('') + '.' + r
    if (str === 'NaN.undefined') {
      str = '0.00'
    }
    return str
  }
};
// 银行卡格式化
window.comFormatBankNum = function (value) {
  let bankNumStr = value.replace(/\s/g, '')
  if (bankNumStr.length > 32) {
    bankNumStr = bankNumStr.substring(0, 32)
  }
  let bankNumArr = bankNumStr.split('')
  for (let i = 1; i < bankNumArr.length; i++) {
    if ((((i + 1) % 5 === 0) && i !== 5) && i !== 0) {
      bankNumArr.splice(i, 0, ' ')
    }
  }
  bankNumStr = bankNumArr.join('')
  return bankNumStr
};
// 手机号码格式化 344
window.comFormatTel = function (value) {
  let telStr = value.replace(/\s/g, '')
  if (telStr.length > 11) {
    telStr = telStr.substring(0, 11)
  }
  let telArr = telStr.split('')
  for (let i = 1; i < telArr.length; i++) {
    if (i === 3 || i === 8) {
      telArr.splice(i, 0, ' ')
    }
  }
  telStr = telArr.join('')
  return telStr
};
// 身份证前四***后四
window.comFornatIdCard = function (value) {
  if (!value) { return '' }
  value = value.slice(0, 4) + '  **** ****  ' + value.slice(-4)
  return value
}
// bankCode-->bankBg
window.bankCodeToBankBg = function (value) {
  switch (value) {
    case '102':
      value = true
      break
    case '103':
      value = true
      break
    case '104':
      value = true
      break
    case '105':
      value = true
      break
    case '301':
      value = true
      break
    case '302':
      value = true
      break  
    case '304':
      value = true
      break
    case '305':
      value = true
      break
    case '307':
      value = true
      break 
    case '308':
      value = true
      break
    case '309':
      value = true
      break
    case '310':
      value = true
      break
    default:
      value = false
  }
  return value
}


