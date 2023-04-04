VNode.$bus.$emit("add-copy-doc", {
  show: true,
  handler: this.adDoc,
  scope: this
});
VNode.$bus.$emit("delete-copy-doc", {
  show: true,
  handler: this.delDoc,
  scope: this
});
}
// 点击执行的代码
function delDoc() {
  let emrDocument = EMR.getDocument();
  EMR.editor.execute("execFn", {
    value: {
      fn: function () {
        let tableArrStr = ['table1', 'table2', 'table3', 'table4'];
        for (let i = 3; i >= 0; i--) {
          if (emrDocument.getTablesByCode(tableArrStr[i])[0]) {
            emrDocument.getTablesByCode(tableArrStr[i])[0].target.el.remove()
            emrDocument.getNodesByCode('pagebreak' + (i + 1))[0].target.el.remove();
            break;
          }
        }
      },
      params: []
    }
  });
}

// 点击执行的代码
function adDoc(me) {
  let emrDocument = EMR.getDocument();
  let tableArrStr = ['table1', 'table2', 'table3', 'table4'];
  let table = emrDocument.getTablesByCode('table')[0].target;
  for (let i = 0; i < tableArrStr.length; i++) {
    if (!emrDocument.getTablesByCode(tableArrStr[i])[0]) {
      let docObj = table.model.toJSON(true, true)
      this.removeDate(docObj.children[1].children)
      let pagebreak = {
        type: "pagebreak",
        code: "pagebreak" + (i + 1)
      }
      debugger;
      docObj.code = tableArrStr[i]
      docObj.children[1].children[1].children[7].code = ""
      EMR.editor.setCursor('DOCUMENT_END')
      EMR.editor.setEditorMode('free');
      EMR.editor.execute("insertContents", { value: [pagebreak, docObj, { type: 'paragraph', children: [{ type: 'text', data: '' }] }] });
      EMR.editor.setEditorMode('form');
      break;
    }
  }
}
function removeDate(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].type == "checkfield" && arr[i].value) {
      arr[i].value = false
    } else if (arr[i].type == "smarttext" && arr[i].value) {
      arr[i].value = ""
      arr[i].children = []
    }
    if (arr[i].children && arr[i].children.length) {
      this.removeDate(arr[i].children)
    }
  }
}
