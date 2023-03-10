
// 点击执行的代码
function onClick() {

}

// 双击执行的代码
function onDblclick() {

}

// 更改值执行的代码
function onChange(me, value, oldValue) {
  me.setValue(value);// 立刻更新值 解决清空后获取的是老数据的bug
  let items = EMR.getDocument().getNodesByCode(["eVHTn4gu3", "dSh8wXMk-c", "dlAcBzjY1R", "e99rAQn0u9S", "NKWfELrijD", "l7PXcUTTmZ"])
  let score = items.reduce((prev, current) => {
    let value = current.getValue();
    if (Number.isNaN(Number(value))) value = 0;
    return Number(value) + prev;
  }, 0)
  EMR.getDocument().getNodesByCode("g1IK5owEx4")[0].setValue(score);
  EMR.getDocument().getNodesByCode("r8qvauurPe")[0].setValue(score);
}
JSON.stringify()
