// 无卡取款银行卡号取后四位
Vue.filter('bankcode', function (value, type) {
  if (value === undefined) {
    return
  }
  return value.substr(value.length - 4)
})
// 卡号前4后4中间*
Vue.filter('cardTrim', function (value, type) {
  if (!value) { return '' }
  value = value.slice(0, 4) + '  ****  ****  ' + value.slice(-4)
  return value
})
// 卡号前6后4中间*
Vue.filter('cardTrim2', function (value, type) {
  if (!value) { return '' }
  value = value.slice(0, 4) + ' ' + value.slice(4, 6) + '  ****  ' + value.slice(-4)
  return value
})
// 卡号4位加一空格
Vue.filter('cardAddSpace', function (value, type) {
  if (!value) { return '' }
  value = value.replace(/(.{4})/g, '$1 ')
  return value
})
// 钱格式转换1230000 => 1,230,000.00
Vue.filter('Fmoney', function (s, n) {
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
    return '-' + t.split('').reverse().join('') + '.' + r
  } else {
    return t.split('').reverse().join('') + '.' + r
  }
})
// 金额大写
Vue.filter('amount', function (input) {
  if (input !== undefined) {
    var intPosTwo = input.indexOf(',')
    if (intPosTwo) {
      input = input.replace(/,/g, '')
    }
    if (parseFloat(input) < 0 || isNaN(input) || input === '') {
      return '零元整'
    }
    input = String(parseFloat(input))
    var strOutput = ''
    var strUnit = '仟佰拾万仟佰拾亿仟佰拾万仟佰拾元角分'
    input += '00'
    var intPos = input.indexOf('.')
    if (intPos >= 0) {
      input = input.substring(0, intPos) + input.substr(intPos + 1, 2)
    }
    strUnit = strUnit.substr(strUnit.length - input.length)
    for (var i = 0; i < input.length; i++) {
      strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(input.substr(i, 1), 1) + strUnit.substr(i, 1)
    }
    strOutput = strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零')
        .replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1')
        .replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(
            /^元/, '零元').replace(/零角/, '零').replace(/零分/, '')
    if (parseFloat(input) === 0) {
      return '零元整'
    }
    if (parseFloat(input) > 0 && parseFloat(input) < 100) {
      return strOutput.replace(/零元/, '').replace(/零/, '')
    }
    return strOutput
  }
  return '零元'
})
// 小数点取后四位
Vue.filter('fourfloat', function (value) {
  return parseFloat(value).toFixed(4)
})
// 小数点取后两位
Vue.filter('twofloat', function (value) {
  return parseFloat(value).toFixed(2)
})
// 不保留小数位
Vue.filter('zerofloat', function (money) {
  if (money) {
    money = money.toString().split('.')
    let _int = money[0]
    let _num = ''
    for (let i = _int.length - 1, j = 1; i >= 0; i--, j++) {
      _num += _int[i]
      if (j % 3 === 0 && j < _int.length) {
        _num += ','
      }
    }
    _num = _num.split('').reverse().join('')
    return _num
  }
})
// yyyyMMdd ==> yyyy-MM-dd
Vue.filter('dataStrone', function (value) {
  if (value) {
    var temp = []
    temp[0] = value.slice(0, 4)
    temp[1] = value.slice(4, 6)
    temp[2] = value.slice(6, 8)
    return temp.join('-')
  }
})
// yyyyMMdd ==> MM-dd
Vue.filter('dataMonth', function (value) {
  if (value) {
    var temp = []
    // temp[0] = value.slice(0, 4)
    temp[0] = value.slice(4, 6)
    temp[1] = value.slice(6, 8)
    return temp.join('-')
  }
})
// yyyyMMdd ==> yyyy/MM/dd
Vue.filter('dataStrtwo', function (value) {
  if (value) {
    var temp = []
    temp[0] = value.slice(0, 4)
    temp[1] = value.slice(4, 6)
    temp[2] = value.slice(6, 8)
    return temp.join('/')
  }
})
// 显示卡类型非储蓄卡信用卡不显示
Vue.filter('cardTypeChoose', function (value) {
  switch (value) {
    case '1':
      value = '储蓄卡'
      break
    case '2':
      value = '信用卡'
      break
    default:
      value = '银行卡'
  }
  return value
})
// 身份证号过滤显示 前4后4 中间*
Vue.filter('FuserId', function (value) {
  if (!value) { return '' }
  value = value.slice(0, 4) + '  **** ****  ' + value.slice(-4)
  return value
})
// 银行名称过长过滤显示
Vue.filter('shortBankName', function (value) {
  if (!value) { return '' }
  if (value.length > 8) {
    value = value.slice(0, 8) + '...'
  }
  return value
})
// 毫秒数转换为YY-MM-DD格式
Vue.filter('datechange', function (data) {
  var date
  if (parseFloat(data) > 10000) {
    data = parseFloat(data)
  }
  date = new Date(data)
  var y = date.getFullYear()
  var m = date.getMonth()
  var d = date.getDate()
  if (m + 1 <= 9) {
    m = '0' + (m + 1).toString()
  } else {
    m = (m + 1).toString()
  }
  if (d <= 9) {
    d = '0' + (d).toString()
  } else {
  }
  return y + '-' + m + '-' + d
})
// 毫秒数转换为YY.MM.DD格式
Vue.filter('msecFormatOne', function (data) {
  var date = new Date(data)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  var d = date.getDate()
  if (m <= 9) {
    m = '0' + (m).toString()
  }
  if (d <= 9) {
    d = '0' + (d).toString()
  }
  return y + '.' + m + '.' + d
})
// 毫秒数转换为YY年MM月DD格式
Vue.filter('msecFormatTwo', function (data) {
  var date = new Date(data)
  var y = date.getFullYear()
  var m = date.getMonth()
  var d = date.getDate()
  if (m + 1 <= 9) {
    m = '0' + (m + 1).toString()
  } else {
    // m = m
  }
  return y + '年' + m + '月' + d
})
// yyyyMMdd ==> yyyy年MM月
Vue.filter('ymFMT', function (value) {
  if (value) {
    var temp = []
    temp[0] = value.slice(0, 4)
    temp[1] = value.slice(4, 6)
    return temp[0] + '年' + temp[1] + '月'
  }
})
// yyyyMMdd ==> MM月dd日
Vue.filter('toMonth', function (value) {
  if (value) {
    var temp = []
    temp[0] = value.slice(0, 4)
    temp[1] = value.slice(4, 6)
    temp[2] = value.slice(6, 8)
    return temp[1] + '月' + temp[2] + '日'
  }
})
// 手机号过滤显示 前3后4 中间*
Vue.filter('PhoneNum', function (value) {
  if (!value) { return '' }
  value = value.slice(0, 3) + '  ****  ' + value.slice(-4)
  return value
})
// 手机号格式化显示3-4-4 eg: 138 0000 0000
Vue.filter('phoneNumFormat', function (value) {
  if (!value) { return '' }
  value = value.slice(0, 3) + ' ' + value.slice(3, 7) + ' ' + value.slice(-4)
  return value
})
// 卡类型
Vue.filter('AcType', function (value) {
  switch (value) {
    case 'PNBB':
      return '普通存折'
    case 'PCRC':
      return '信用卡'
    case 'PSAV':
      return '存折'
    case 'PDBC':
      return '个人一卡通'
    case 'PTIM':
      return '定期账户'
    case 'PMCS':
      return '个人一本通账户'
    case 'QPMC':
      return '活期外币账户'
    case 'PMCT':
      return '定期一本通'
    case 'PSDC':
      return '储蓄卡'
    case 'PSDP':
      return '活期存单'
    case 'PNDA':
      return '通知存单'
    case 'PNDB':
      return '国债存单'
    case 'PPDC':
      return '借记卡'
    case 'PSDL':
      return '复合账户'
    case 'QPSA':
      return '活期人民币账户'
    case 'PTDD':
      return '定活两便存单'
    case 'PTOL':
      return '零整存折'
    case 'PCOM':
      return '个人通用账户类'
    case 'QTIM':
      return '定期账户'
    case '101':
      return '个人活期结算户'
    case '151':
      return '整存整取'
    case '152':
      return '零存整取'
    case '154':
      return '一天个人通知存款'
    case '155':
      return '七天个人通知存款'
    case '156':
      return '智能通知存款'
    case '188':
      return '卡理财-活期转通知1天'
    case 'M3':
      return '整存整取三个月'
    case 'M6':
      return '整存整取半年'
    case 'Y1':
      return '整存整取一年'
    case 'Y2':
      return '整存整取二年'
    case 'Y3':
      return '整存整取三年'
    case 'Y5':
      return '整存整取五年'
    case 'D1':
      return '一天个人通知存款'
    case 'D7':
      return '七天个人通知存款'
    case 'AT00':
      return '单位银行结算账户'
    case 'AT01':
      return '个人借记卡（存折）账户'
    case 'AT02':
      return '个人贷记卡账户'
    // 电子账户字段名待确定 DZZH临时命名先用着
    case 'PELE':
      return '电子账户'
    case 'PDAC':
      return '外币存折'
    case '164':
      return '惠农宝'
    default:
      return
  }
})
// 还款方式
Vue.filter('returnWay', function (value) {
  switch (value) {
    case '1':
      value = '等额本息'
      break
    case '2':
      value = '等额本金'
      break
    case '3':
      value = '按月付息一次还本'
      break
    case '4':
      value = '一次还本付息/前收息'
      break
    case '5':
      value = '按月付息一次还本'
      break
    default:
      value = '等额本息'
  }
  return value
})
// 还款频率
Vue.filter('IntRepayFreq', function (value) {
  switch (value) {
    case 'D1':
      value = '每日，节假日不顺延'
      break
    case 'M1':
      value = '一个月，节假日不顺延'
      break
    case 'M3':
      value = '三个月，节假日不顺延'
      break
    case 'M6':
      value = '六个月，节假日不顺延'
      break
    case 'Y1':
      value = '一年，节假日不顺延'
      break
    case 'MF':
      value = '月初（不顺延）'
      break
    case 'ZD':
      value = '最大频率'
      break
    case '1M':
      value = '一个月，节假日顺延'
      break
    case 'QL':
      value = '季度末(不顺延)'
      break
    case '1D':
      value = '每日，节假日顺延'
      break
    case '1Y':
      value = '一年，节假日顺延'
      break
    case '3M':
      value = '按季结息顺延'
      break
    case '1W':
      value = '单周，节假日顺延'
      break
    case 'W1':
      value = '单周，节假日不顺延'
      break
    case '2W':
      value = '双周，节假日顺延'
      break
    case 'W2':
      value = '双周，节假日不顺延'
      break
    case '2M':
      value = '双月，节假日顺延'
      break
    case 'M2':
      value = '双月，节假日不顺延'
      break
    case 'ML':
      value = '月末（不顺延）'
      break
    case '6M':
      value = '六个月，节假日顺延'
      break
    default:
      return value
  }
  return value
})
// 还款方式
Vue.filter('payWay', function (value) {
  switch (value) {
    case '1':
      value = '等额还款'
      break
    case '5':
      value = '先息后本'
      break
    default:
      value = ''
  }
  return value
})
// 币种转换
Vue.filter('exchangeType', function (value) {
  switch (value) {
    case 'CNY':
      value = '人民币'
      break
    case 'GBP':
      value = '英镑'
      break
    case 'EUR':
      value = '欧元'
      break
    case 'HKD':
      value = '港元'
      break
    case 'USD':
      value = '美元'
      break
    case 'JPY':
      value = '日元'
      break
    case 'CHF':
      value = '瑞郎'
      break
    case 'SGD':
      value = '新加坡元'
      break
    case 'NOK':
      value = '挪威元'
      break
    case 'CAD':
      value = '加元'
      break
    case 'AUD':
      value = '澳元'
      break
    case 'NZD':
      value = '新元'
      break
    case 'MYR':
      value = '马来元'
      break
    case 'MOP':
      value = '澳门元'
      break
    default:
      value = ''
  }
  return value
})
// 渠道类型
Vue.filter('sourceType', function (value) {
  switch (value) {
    case 'MT':
      return '柜面交易'
    case 'TF':
      return '国际结算'
    case 'CB':
      return '网络银行交易'
    case 'PB':
      return '电话银行'
    case 'AC':
      return '卡系统ATM机交易'
    case 'UC':
      return '卡系统银联交易'
    case 'MC':
      return '卡柜面'
    case 'BC':
      return '中间业务'
    case 'AB':
      return '自助终端中间业务'
    case 'MB':
      return '移动银行'
    case 'UT':
      return '银联本带他业务'
    default:
      return
  }
})
// 钞汇类型转换
Vue.filter('banknoteType', function (value) {
  switch (value) {
    case 'CA':
      return '现钞'
    case 'TT':
      return '现汇'
    default:
      return
  }
})
