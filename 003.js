function beforePaginateCallBack() {
  let editor = EMR.editor;
  let context = editor.context;
  let selection = context.selection;
  let title = document.getElementById('eRoU1w7zhR')
  let range = document.createRange();
  let startIndex = title.index;
  let endIndex = startIndex + 4
  let childNodes = title.parentElement.childNodes;
  let nodes = [{ type: 'pagebreak' }];
  for (let i = startIndex; i <= endIndex; i++) {
    nodes.push(childNodes[i].view.model.toJSON(false, true))
    if (i == startIndex) {
      nodes.push(childNodes[i].view.model.toJSON(false, true))
    }
  }
  range.setStartAfter(childNodes[endIndex])
  range.setEndAfter(childNodes[endIndex])
  selection.removeAllRanges()
  selection.addRange(range)
  nodes[1].children[0].data = '介入耗材使用登记表（与病历一同保存）'
  nodes[1].id = 'newTitle'
  nodes[2].children[0].data = '（以下耗材属医疗服务价格除外内容，不包括在手术费内，需要单独收费，特告知。）'
  nodes[4].id = 'newTable1'
  nodes[4].style = nodes[5].style = {
    css: {
      width: '100%'
    }
  }
  nodes[5].id = 'newTable2'
  editor.execute('insertContents', {
    value: nodes
  })
  let tabelElement = document.getElementById('newTable1')
  let newTable1 = tabelElement.view
  let newTable2 = document.getElementById('newTable2').view
  editor.execute('deleteColumn', {
    value: {
      tableView: newTable1,
      target: [newTable1.table.rows[0].cells[2]]
    }
  })
  editor.execute('deleteColumn', {
    value: {
      tableView: newTable2,
      target: [newTable2.table.rows[0].cells[10]]
    }
  })
  editor.fire('updateLayout')

}

function getInformation() {
  if (EMR.getApplicationContext().login.patient) {
    debugger;
    let emrDocument = EMR.getDocument();
    Ext.Ajax.request({
      url: `${
        EMR.getApplicationContext().endpoints.app
      }api/patient/document/invokeHook`,
      method: "GET",
      params: {
        patientId: EMR.getApplicationContext().login.patient.PATIENT_ID,
        typeCode: "d341660f301711ed92510242ac1c0006",
        hookType: "onload",
        hookMethod: "beforeHandler",
        version: "1.0",
      },
      success: (response) => {
        let respText = Ext.decode(response.responseText).data;
        let values = Object.values(respText);
        let ids = [
          "A3zygeaVj",
          "GXqPa2KBN",
          "dAhIwKdZB",
          "ng4lRzTCU",
          "qnsMzgBIn",
          "tRLLD3zZR",
          "AepxNXd1Zu",
          "B-XlObjo-W",
          "B5gffYe6i3",
          "BCyzP8pkZh",
          "BpyRJU5Hsc",
          "BuxtpongaL",
          "CgAyosKMmp",
          "Co1H0NJeST",
          "D7f17GG2Uy",
          "DUgLXG7Igx",
          "DzLBU-UhEl",
          "ESd2imEVZp",
          "F_V-a6ICEq",
          "FfUa_uh_3V",
          "FshwfMp9oc",
          "G6PsQqNpgt",
          "H_i2P7iwWV",
          "HmPWD7f7Zg",
          "Hw_Wd_cOW_",
          "ISHXf-ZuRk",
          "K8vRq6ZCeq",
          "MuLufBBUUy",
          "N4AIh8wvqC",
          "NPGoy4ka_g",
          "O3-3V5YzjR",
          "P6YHoTJxh3",
          "POMT3vSAys",
          "RkH0jlisfD",
          "SNtfTTN6RB",
          "Th1zl6EzIZ",
          "UbHoKDHfNS",
          "VGVm_rvcic",
          "VhAaex3bwL",
          "W-sq9hrrg1",
          "WwBZq4Hc9x",
          "XBvVmMKqc6",
          "XOCNqsGAnZ",
          "XavoPjIm_p",
          "XniUZNZIwJ",
          "XtzKRzq89S",
          "YWnMVrqsOd",
          "Z5yEjUyke3",
          "ZpN8scxxxM",
          "ZuZcEieCG0",
          "_PO0d6c9kP",
          "_TNoYn19Fg",
          "abNVsBs648",
          "b2D1JhLr3m",
          "b_ntdJVjFn",
          "bnGEty6qTo",
          "c_knfU3jTv",
          "coUQuDsOku",
          "cuprXdOwK8",
          "dYGc8OIUg4",
          "e2sF3vMAEX",
          "exF2cz_yUr",
          "fqZDF8FnTM",
          "gQbyfsY692",
          "gWQx6aIsqR",
          "gsq5NLU-IO",
          "h4FwfryLTt",
          "hn77npnRrw",
          "iShdEdJ3IP",
          "ilGJUavdys",
          "lvI5ehiBw7",
          "mOo5Npgp1F",
          "ngcX1arJ-x",
          "npmkuv3Qnk",
          "o2S-seWAVZ",
          "qMwsPQNZhp",
          "qfBWswFv4a",
          "rNauE_0kBp",
          "ranIz-W95o",
          "rnEAx4Px18",
          "sEj5wgy_hL",
          "tCWa9okLOA",
          "tRZH_bvxJ2",
          "tbTacJI7uv",
          "tjR3jgzw5G",
          "ut0n-H9C2c",
          "vZBvGGxYKq",
          "vcG2HsFp2p",
          "vmmvlBdiZl",
          "vqRUYh4DjN",
          "w57feMFxP3",
          "xT3uj2fX8w",
          "yfTOWkF6zS",
          "ylxA4xnXKS",
          "FOFjeS37hPq",
          "SVoIDHgxelD",
          "Wy4p9fboZ15",
          "ZJt0zw2PQTl",
          "aIByN0ZiyGX",
          "cCB71Y64VBw",
          "dsIB5RI96EC",
          "e-fSCmqXpBm",
          "e0qwM_IUkjB",
          "e1_3TygPSgb",
          "e1c4ipOvjts",
          "e21mfO3-pV2",
          "e22JFopTyWE",
          "e48-PrhDvil",
          "e4TovVehSOo",
          "e4TuL_6RgM5",
          "e4VP6hwxdrQ",
          "e5gOy_Lyu2b",
          "e71Um3sGKW9",
          "e74u9xmSDeH",
          "e7D0UIzF6qd",
          "e7WsUU7QcIg",
          "e82WHO1Jcg5",
          "e9CtTBcSF4d",
          "e9oTe7QWDRU",
          "omg8q5A6jlx",
          "q5Uh1UHfJQh",
          "e1ipH1DtuDWA",
          "e1y8Gw-CT6nL",
          "e3FUydamySrN",
          "e56pGLAqSgna",
          "e5tIMLe8VXU2"
        ]
        let tempData = {}
        values.forEach(item => {
          if (item.id) {
            tempData[item.id] = item.value
          }
        })
        let comps = emrDocument.getComponentsByCode(ids);
        comps.forEach(function (comp) {
          let code = comp.target.getAttribute('code');
          let valueInfo = tempData[code] || null;
          comp.target.setValue(valueInfo, false);
        })
      }
    });
  }
}

function afterLoad() {
  let editor = EMR.editor;
  let VNode = editor.VNode;
  if (!VNode) return;
  VNode.$bus.$emit("sync-anes-records", {
    show: true,
    handler: this.getInformation,
    scope: this,
  });
  let patientId = editor.documentData.properties.patientId
  if (!patientId) {
    this.getInformation();
  }
  let emrDocument = EMR.getDocument();
  let table = emrDocument.getTablesByCode('table')[0].target;
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
          let tabelElement = cell.el.parentElement.parentElement;
          tableView.deleteRow($(cell.el));
          let trLine = tabelElement.getElementsByTagName('tr')
          for (let i = 1; i < trLine.length; i++) {
            trLine[i].getElementsByTagName('td')[0].view.model.getChild(0).getChild(0).view.setValue(i, false, true)
          }
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
            let clippedRows = tableView.copyRows(parentView.el.index)
            tableView.insertRows(parentView.el.index, clippedRows);
            let smarts = $(clippedRows[0].view.el).find('.edl-smart')
            let tabelElement = $(cell.el).parentsUntil('.edl-table')[1]
            let trLine = tabelElement.getElementsByTagName('tr')
            smarts.each((i, smart) => {
              smart.view.setValue(null, false, false, false)
              smart.view.updateLineStyle();
            })
            for (let i = 1; i < trLine.length; i++) {
              trLine[i].getElementsByTagName('td')[0].view.model.getChild(0).getChild(0).view.setValue(i, false, true)
            }
          }
          cell.editor.execute('execFn', { value: { fn: insertRow, scope: cell, params: [cell] } })
        },
      }]
  })
  editor.registHook('Paging', 'PAGINATE_BEFORE', { fn: this.beforePaginateCallBack, scope: this })

}
