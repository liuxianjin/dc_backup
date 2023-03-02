

function afterLoad() {
  let editor = EMR.editor;
  let VNode = editor.VNode;
  if (!VNode) return;
  VNode.$bus.$emit("sync-anes-records", {
    show: true,
    handler: this.getAnesRecords,
    scope: this,
  });
  let patientId = editor.documentData.properties.patientId
  if (!patientId) {
    this.getAnesRecords();
  }
  VNode.$bus.$emit("showQc", false);
  VNode.$bus.$emit("show-drugs", true);
  VNode.$bus.$on("update-drugs", res => {
    //保存自带药品时触发更新
    this.resolveDrugs(res);
  });
  let emrDocument = EMR.getDocument();
  let table = emrDocument.getTablesByCode('table')[0]
  this.addRowDelRowToTable(table);
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
function delDoc() {
  let emrDocument = EMR.getDocument();
  EMR.editor.execute("execFn", {
    value: {
      fn: function () {
        let tableArrStr = ['table1', 'table2', 'table3', 'table4'];
        for (let i = 3; i >= 0; i--) {
          if (emrDocument.getTablesByCode(tableArrStr[i])[0]) {
            emrDocument.getTablesByCode(tableArrStr[i])[0].target.el.remove()
            emrDocument.getTablesByCode(tableArrStr[i] + '_1')[0].target.el.remove()
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
  debugger;
  let table_0 = emrDocument.getTablesByCode('e50o6VEjiQE')[0].target;

  let table_7 = emrDocument.getTablesByCode('Ujcqb_Pmtw')[0].target;

  let table_8 = emrDocument.getComponentsByCode('bMsVf5Cyyl')[0].target;

  let tbarr = [table_0, table_7, table, table_8];
  let openObj = {
    value: []
  }
  for (let i = 0; i < tableArrStr.length; i++) {
    if (!emrDocument.getTablesByCode(tableArrStr[i])[0]) {
      for (let w = 0; w < tbarr.length; w++) {
        let docObj = tbarr[w].model.toJSON(true, true);
        // this.removeDate(docObj.children[1].children)
        if (w == 0) {
          let pagebreak = {
            type: "pagebreak",
            code: "pagebreak" + (i + 1)
          }
          openObj.value.push(pagebreak);
          docObj.code = tableArrStr[i]
        } else {
          docObj.code = tableArrStr[i] + '_' + w
        }
        openObj.value.push(docObj);
      }
      openObj.value.push({ type: 'paragraph', children: [{ type: 'text', data: '' }] })
      EMR.editor.setCursor('DOCUMENT_END')
      EMR.editor.setEditorMode('free');
      EMR.editor.execute("insertContents", openObj);
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
function getAnesRecords(me) {
  let editor = EMR.editor;
  if (EMR.getApplicationContext().login.patient) {
    let emrDocument = EMR.getDocument();
    Ext.Ajax.request({
      url: `${
        EMR.getApplicationContext().endpoints.app
      }api/patient/document/invokeHook`,
      method: "GET",
      params: {
        patientId: editor.VNode.paramsBody.patientId,
        typeCode: "8c2be9e007fa11ed8461f9c144e7fb73",
        hookType: "common-data",
        hookMethod: "getSurgeryAssistant",
        version: "2.0",
      },
      success: (response) => {
        let respText = Ext.decode(response.responseText).data;
        console.log("respText", respText);
        let surgeryAssistant = respText.surgeryAssistant;
        let anesDoctor = respText.anesDoctor;
        if (surgeryAssistant.length > 0) {
          emrDocument.getComponentsByCode("e4fN_JtVLwf")[0].target.setValue(surgeryAssistant[0], false);
          if (surgeryAssistant.length > 1) {
            emrDocument.getComponentsByCode("WapX50pEbf")[0].target.setValue(surgeryAssistant[1], false);
          }
        }
        if (anesDoctor.length > 0) {
          emrDocument.getComponentsByCode("anesDoctor")[0].target.setValue(anesDoctor, false);
        }

      },
    });
  }
}
function detailDrugs(data) {
  // 解析药品数据
  let me = this;
  let strObj = {};
  let drugsStr = "";
  let result = [];
  // console.log(data);
  for (let i = 0; i < data.length; i++) {
    if (!strObj[data[i].groupNumber]) {
      strObj[data[i].groupNumber] = {
        remark: data[i].remark,
        drugName: `${data[i].drugName}`,
        main: ` ${data[i].medicationRouteDescription || data[i].medicationRouteName}`,
        drugs: `${data[i].drugName} ${data[i].dosage}${data[i].dosageUnitName}`
      };
    } else {
      strObj[data[i].groupNumber].drugs += ` + ${data[i].drugName} ${data[i].dosage}${data[i].dosageUnitName}`;
    }
  }
  for (let i in strObj) {
    drugsStr = strObj[i].drugs + strObj[i].main;
    result.push({
      drugName: strObj[i].drugName,
      remark: strObj[i].remark,
      drugsStr: drugsStr
    });
  }
  return result;
  // console.log(drugsStr);
}
function resolveDrugs(data) {
  let me = this;
  let emrDocument = EMR.getDocument();
  data = me.detailDrugs(data);
  if (data && data.length > 0) {
    data = me.unique(data.reverse());
    data.reverse();
  }
  let tableBody = $(emrDocument.getTablesByCode("table")[0].target.table).last()
  // let tableBody = $(component.target.el).parentsUntil('table').last()
  let rows = tableBody[0].rows;
  let blankData = [];
  let blankIndexList = [];
  let blankLine = [];
  let topDate = null;
  for (let rcount = 1; rcount < rows.length; rcount++) {
    cells = rows[rcount].children;
    let equipment1 = { date: cells[1].find('.edl-smart')[0].view, time: cells[2].find('.edl-smart')[0].view, hr: cells[3].find('.edl-smart')[0].view, r: cells[4].find('.edl-smart')[0].view, bp: cells[5].find('.edl-smart')[0].view, spo2: cells[6].find('.edl-smart')[0].view, recordValue: cells[7].find('.edl-smart')[0].view }
    let time1 = equipment1.date.getValue();
    if (time1) {
      topDate = time1;
    }
    let time2 = equipment1.time.getValue();
    let hr = equipment1.date.getValue();
    let r = equipment1.time.getValue();
    let bp = equipment1.date.getValue();
    let spo2 = equipment1.time.getValue();
    let dataTime = '';
    let recordValue = equipment1.recordValue.getValue();
    if (time1 || time2 || hr || r || bp || spo2 || recordValue) {
    } else {
      blankLine.push(rcount);
    }
    if (time1 && time2) {
      dataTime = me.dateFormat(new Date(time1), "yyyy-MM-dd") + " " + me.dateFormat(new Date(time2), "hh:mm");
    } else if (topDate && time2) {
      dataTime = me.dateFormat(new Date(topDate), "yyyy-MM-dd") + " " + me.dateFormat(new Date(time2), "hh:mm");
    }
    for (let i = 0; i < data.length; i++) {
      if (dataTime == data[i].remark) {
        if (recordValue) {
          if (recordValue.indexOf(data[i].drugName) < 0) {
            equipment1.recordValue.setValue(recordValue + " " + data[i].drugsStr + '；');
          }
        } else {
          equipment1.recordValue.setValue(data[i].drugsStr + '；');
        }
        blankIndexList.push(i);
      }
    }

  }
  if (blankIndexList.length > 0) {
    for (let m = 0; m < blankIndexList.length; m++) {
      delete data[blankIndexList[m]];
    }
  }
  blankData = data.sort();

  if (blankLine.length > 0 && blankData.length > 0) {
    for (let i = 0; i < blankLine.length; i++) {
      cells = rows[blankLine[i]].children;
      let equipment1 = { date: cells[1].find('.edl-smart')[0].view, time: cells[2].find('.edl-smart')[0].view, hr: cells[3].find('.edl-smart')[0].view, r: cells[4].find('.edl-smart')[0].view, bp: cells[5].find('.edl-smart')[0].view, spo2: cells[6].find('.edl-smart')[0].view, recordValue: cells[7].find('.edl-smart')[0].view };
      if (blankData[i]) {
        equipment1.recordValue.setValue(data[i].drugsStr + '；');
        equipment1.date.setValue(blankData[i].remark);
        equipment1.time.setValue(blankData[i].remark);
      }

    }
  }
}

function sortDataHandler(component, newData, oldData) {
  if (newData === "null") return;
  let emrDocument = EMR.getDocument();
  let tableBody = $(component.target.el).parentsUntil('table').last()
  let rows = tableBody[0].rows;
  let topDate = null;
  let topSign = null;
  for (let rcount = 1; rcount < rows.length; rcount++) {
    cells = rows[rcount].children;
    let equipment1 = { date: cells[1].find('.edl-smart')[0].view, time: cells[2].find('.edl-smart')[0].view, hr: cells[3].find('.edl-smart')[0].view, r: cells[4].find('.edl-smart')[0].view, bp: cells[5].find('.edl-smart')[0].view, spo2: cells[6].find('.edl-smart')[0].view, sign: cells[8].find('.edl-smart')[0].view }
    if (equipment1.date.getValue()) {
      topDate = equipment1.date.getValue();
    }
    if (equipment1.sign.getValue()) {
      topSign = equipment1.sign.getValue();
    }
    let cirNurse = emrDocument.getComponentsByCode("gC2iULHn7")[0].target.value;
    if (cells[1].find('.edl-smart')[0].view.id == component.target.id || cells[2].find('.edl-smart')[0].view.id == component.target.id) {
      let time1 = equipment1.date.getValue();
      let time2 = equipment1.time.getValue();
      if (topSign) {
        equipment1.sign.setValue(topSign);
      }
      if (time1 && time2 && newData) {
        if (cirNurse && cirNurse.length > 0 && rcount == 1) {
          equipment1.sign.setValue(cirNurse);
        }
        this.getVitalsigns(time1, time2, equipment1);
      } else if (time2 && newData && topDate) {
        this.getVitalsigns(topDate, time2, equipment1);
        if (cirNurse && cirNurse.length > 0 && rcount == 1) {
          equipment1.sign.setValue(cirNurse);
        }

      }
    }

  }
}



function getVitalsigns(time1, time2, component) {
  let editor = EMR.editor;
  let emrDocument = EMR.getDocument();
  Ext.Ajax.request({
    url: `${
      EMR.getApplicationContext().endpoints.app
    }api/patient/document/invokeHook`,
    method: "GET",
    async: false,
    params: {
      patientId: editor.VNode.paramsBody.patientId,
      time1: time1,
      time2: time2,
      typeCode: "8c2be9e007fa11ed8461f9c144e7fb73",
      hookType: "common-data",
      hookMethod: "getMonitorVal",
      version: "2.0",
    },
    success: (response) => {
      let respText = Ext.decode(response.responseText).data;
      if (respText.length > 0) {
        let entryVitalSigns = respText
        let bp1 = '';
        let bp2 = "";
        for (var i = 0; i < entryVitalSigns.length; i++) {
          if (entryVitalSigns[i].code == '3b3204f0228711e39af63734e7c644cb') {
            bp1 = entryVitalSigns[i].value ? parseInt(entryVitalSigns[i].value) : '';
          } else if (entryVitalSigns[i].code == '3b56a3f0228711e39451919cea0878ad') {
            bp2 = entryVitalSigns[i].value ? parseInt(entryVitalSigns[i].value) : '';
          } else if (entryVitalSigns[i].code == '3b0d8d00228711e39658c92478bc3c10') {
            component.hr.setValue(entryVitalSigns[i].value ? parseInt(entryVitalSigns[i].value) : '')
          } else if (entryVitalSigns[i].code == '395f40c0228711e3b9490ffd380ea44a') {
            component.r.setValue(entryVitalSigns[i].value ? parseInt(entryVitalSigns[i].value) : '')
          } else if (entryVitalSigns[i].code == '3982f560228711e3885dcb6493b2837f') {
            component.spo2.setValue(entryVitalSigns[i].value ? parseInt(entryVitalSigns[i].value) : '')
          }
        }
        if (bp1 && bp2) {
          component.bp.setValue(bp1 + "/" + bp2);
        }
      }

    },
  });
}

function dateFormat(date, format) {
  if (date) {
    let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  } else {
    return "";
  }

}

function unique(arr1) {
  let me = this;
  const res = new Map()
  return arr1.filter((item) => !res.has(me.dateFormat(new Date(item.remark), "yyyy-MM-dd hh:mm")) && res.set(me.dateFormat(new Date(item.remark), "yyyy-MM-dd hh:mm"), 1));
}

function addRowDelRowToTable(table) {
  if (table && table.target) {
    table = table.target;
    table.setContextMenu((cell) => {
      let currentCell = cell;
      if (currentCell.model.parent.index > 0) {
        return true
      }
      return false;
    }, (cell) => {
      let me = cell;
      return [
        {
          text:
            "<div class='cell-menu' style='display: flex;justify-content: space-between;'><span class='icon aui-icon aui-icon-small aui-iconfont-remove-row'></span><span>删除行</span></div>",
          scope: cell,
          handler: () => {
            let tableView = $(cell.el).parentsUntil(".edl-table").last()[0].view;
            tableView.deleteRow($(cell.el));
          }
        },
        {
          text:
            "<div class='cell-menu' style='display: flex;justify-content: space-between;'><span class='fas fa-columns cell-menu-item'></span><span>新增行</span></div>",
          scope: cell,
          handler() {
            let insertRow = (editor, cell) => {
              let tableView = $(cell.el).parentsUntil('.edl-table').last()[0].view;
              let parentView = me.model.parent.view
              let clippedRows = [parentView.model._clone(true)];
              tableView.insertRows(parentView.el.index, clippedRows);
              let smarts = $(clippedRows[0].view.el).find('.edl-smart')

              smarts.each((i, smart) => {sqwlsq
                if (i === 6) {
                  smart.view.setAttribute('code', 'QVQhhRU6Chp')
                }
                smart.view.setValue(null, false, false, false)
                smart.view.updateLineStyle();
              });
              let mergeTdView = $(tableView.bodyView.el).children().eq(0).children()[0].view;
              let rowspan = parseInt(mergeTdView.rowspan || '1');
              $(mergeTdView.el).attr('rowspan', rowspan + 1);
              // let rowspan1 = $(tableView.bodyView.el).children().eq(0).prevObject.length;
              // $(mergeTdView.el).attr('rowspan', Math.max(rowspan + 1 ,rowspan1));
            }
            cell.editor.execute('execFn', { value: { fn: insertRow, scope: cell, params: [cell] } })
          },
        }]
    })
  }
}
