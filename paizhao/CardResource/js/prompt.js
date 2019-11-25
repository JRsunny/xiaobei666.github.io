// 弹出提示框
window.alert = function (message, done) {
  weui.alert(message, {
    title: '中原银行温馨提示',
    buttons: [{
      label: '确定',
      type: 'default',
      onClick: done || function() {}
    }]
  });
};
/**
 * 弹出提示框
 * @param message 提示语
 * @param {*} arr 数组 按钮重命名
 * @param {*} cancelCallback 第一个按钮执行函数（点击取消）
 * @param {*} doneCallback 第二个按钮执行函数（点击确定）
 */
window.confirm = function(message, arr=['取消','确定'], cancelCallback, doneCallback){
  return weui.confirm(message, {
    title: '中原银行温馨提示',
    buttons: [{
      label: arr[0],
      type: 'cldAcct',
      onClick: cancelCallback
    },{
      label: arr[1],
      type: 'default',
      onClick: doneCallback
    }]
  });
};