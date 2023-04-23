Ext.define("OpeArrangement.view.OpeListByRoom", {
  extend: "Ext.grid.Panel",
  alias: "widget.opelistbyroom",
  width: "100%",
  columnLines: true,
  rowLines: true,
  autoScroll: true,
  rootVisible: false,
  simpleSelect: false,
  multiSelect: true,
  bufferedRenderer: false,
  style: "border-bottom-width: 0px !important;border-top:1px solid #d0d0d0 !important;",
  timeout: null, // datachanged 防抖
  initComponent: function() {
    let me = this;
    Ext.apply(me, {
      store: Ext.create("Ext.data.ArrayStore", {
        autoLoad: true,
        model: "OpeArrangement.model.OpeArrangementAllModel",
        groupField: "arrRoomId",
        proxy: {
          type: "ajax",
          url: "",
          reader: {
            type: "json"
          }
        },
        data: []
      }),
      features: Ext.create("Ext.grid.feature.Grouping", {
        groupHeaderTpl: [
          "{children:this.formatName}",
          {
            formatName: function(data) {
              return data[0].data.roomSerialArrangement + `（${data.length}）`;
            }
          }
        ]
      }),
      columnLines: true,
      columns: me.createColumns(),
      listeners: {}
    });
    me.callParent();
  },
  //刷新列表数据
  refreshGrid: function(roomId) {
    let me = this;
    me.getStore().removeAll();
    let surgeryData = [],
      addData = [];
    me.app
      .getOpearrangementlist()
      .getStore()
      .each(o => {
        if(roomId){
          if(o.data.arrRoomId === roomId && o.data.arrId){
            surgeryData.push(o.data);
          }
        }else {
          if (o.data.arrRoomId && o.data.arrId) {
            surgeryData.push(o.data);
          }
        }
      });
    surgeryData.forEach(o => {
      addData.push(Ext.create("OpeArrangement.model.OpeArrangementAllModel", o));
    });
    if (addData.length > 0) {
      me.getStore().add(addData);
    }
  },
  createColumns: function() {
    let me = this;
    let hospitalConfig = me.app.getHospitalConfig();
    let columns = [
      {
        text: "手术间",
        align: "left",
        style: "text-align:center",
        dataIndex: "roomSerialArrangement",
        width: 90
      },
      {
        text: "申请时间",
        width: 135,
        align: "center",
        style: "text-align:center;",
        dataIndex: "surgeryDate"
      },
      {
        text: "申请名称",
        align: "left",
        style: "text-align:center",
        dataIndex: "applyDeptName",
        width: 115,
        renderer: me.rendererComm
      },
      {
        text: "姓名",
        align: "left",
        style: "text-align:center",
        dataIndex: "name",
        width: 80,
        renderer: me.rendererComm
      },
      {
        text: "住院号",
        align: "left",
        style: "text-align:center",
        dataIndex: "admissionNumber",
        width: 90
      },
      {
        text: "性别",
        align: "center",
        dataIndex: "gender",
        width: 50
      },
      {
        text: "床位号",
        align: "left",
        dataIndex: "bedNumber",
        width: 70
      },
      {
        text: "术前诊断",
        width: 110,
        style: "text-align:center;",
        dataIndex: "diagnose",
        sortable: false,
        renderer: me.rendererComm
      },
      {
        text: "手术名称",
        align: "left",
        style: "text-align:center",
        dataIndex: "surgeryName",
        width: 150,
        renderer: me.rendererComm
      },
      {
        text: "主刀",
        align: "left",
        style: "text-align:center",
        dataIndex: "surgeryDoctorName",
        width: 80,
        renderer: me.rendererComm
      },
      {
        text: "一助",
        align: "left",
        style: "text-align:center",
        dataIndex: "assistant1Name",
        width: 80,
        renderer: me.rendererComm
      },
      {
        text: "器护",
        align: "left",
        style: "text-align:center",
        dataIndex: "equipmentNurse1Name",
        width: 80,
      },
      {
        text: "巡护",
        align: "left",
        style: "text-align:center",
        dataIndex: "circuitNurse1Name",
        width: 80,
      },
      {
        text: "麻醉方式",
        align: "left",
        style: "text-align:center",
        dataIndex: "anesTypeName",
        width: 130,
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
          if (value) {
            if (value == "其他" && !Ext.isEmpty(record.get("anesTypeNameApply"))) {
              let valStr = "其他（" + record.get("anesTypeNameApply") + "）";
              metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(valStr) + '"';
              return valStr;
            } else {
              metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
              return value;
            }
          } else {
            if (!Ext.isEmpty(record.get("anesTypeName"))) {
              if (record.get("anesTypeName") == "其他" && !Ext.isEmpty(record.get("anesTypeNameApply"))) {
                let valStr = "其他（" + record.get("anesTypeNameApply") + "）";
                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(record.get("anesTypeNameApply")) + '"';
                return valStr;
              } else {
                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(record.get("anesTypeName")) + '"';
                return record.get("anesTypeName");
              }
            } else return "";
          }
        }
      },
      {
        text: "感染",
        align: "left",
        style: "text-align:center",
        dataIndex: "infectionHistory",
        width: 80
      },
      {
        text: "传染风险",
        align: "left",
        style: "text-align:center",
        dataIndex: "infectionCount",
        width: 80
      },
      {
        text: "异常",
        align: "left",
        style: "text-align:center",
        dataIndex: "abnormalCount",
        width: 60
      },
      {
        text: "发布人",
        align: "left",
        style: "text-align:center",
        dataIndex: "nurseReleaseUsername",
        width: 80
      },{
        text: "发布时间",
        align: "left",
        style: "text-align:center",
        dataIndex: "nurseReleaseTime",
        width: 135
      },
      {
        text: "备注",
        align: "left",
        style: "text-align:center",
        dataIndex: "remark",
        width: 120,
        renderer: me.rendererComm
      }
    ];
    return columns;
  },
  rendererComm(value, metaData, record, rowIndex, colIndex, store, view) {
    if (value) {
      metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
      return value;
    } else {
      return "";
    }
  },
  getNameEditor: function(type, dataIndex) {
    let me = this;
    let url = `portal/department/dept/user/${type}/${me.app.getUserInfo().hospitalId}/null`;
    return {
      completeOnEnter: false, // 不触发Ext.Editor 的 onSpecialKey
      field: {
        xtype: "comboboxgridtree",
        pickerConfig: {
          width: 380,
          height: 300
        },
        valueField: "userName",
        displayField: "userName",
        rightColumnDataIndex: "userName",
        queryDelay: 100,
        leftCompConfig: {
          columns: [
            {
              text: "姓名",
              style: "text-align: center;",
              textAlign: "start",
              minWidth: 70,
              flex: 1,
              dataIndex: "userName"
            },
            {
              text: "性别",
              style: "text-align: center;",
              textAlign: "start",
              width: 60,
              dataIndex: "genderName"
            },
            {
              text: "类型",
              style: "text-align: center;",
              textAlign: "start",
              width: 60,
              dataIndex: "typeName"
            },
            {
              text: "职称",
              style: "text-align: center;",
              textAlign: "start",
              width: 110,
              dataIndex: "jobTitle"
            }
          ],
          store: Ext.create("Ext.data.Store", {
            fields: ["userId", "userName", "shiftsId", "genderName", "typeName", "jobTitle"],
            pageSize: 10,
            autoLoad: false,
            proxy: {
              type: "ajax",
              url: SERVICE_URL + url,
              reader: {
                type: "json",
                rootProperty: "data.data",
                totalProperty: "data.totalCount"
              }
            }
          })
        },
        matchFieldWidth: false,
        pageSize: 10,
        focusOnExpand: true,
        itemClickCb(rec) {
          let selRec = me.getSelection();
          let dataIndexName = "";
          if (selRec.length > 0) {
            if (dataIndex == "circuitNurse1Id") {
              selRec[0].set("circuitNurse1Id", rec.get("userId"));
              selRec[0].set("circuitNurse1Name", rec.get("userName"));
              dataIndexName = "circuitNurse1Name";
            } else if (dataIndex == "circuitNurse2Id") {
              selRec[0].set("circuitNurse2Id", rec.get("userId"));
              selRec[0].set("circuitNurse2Name", rec.get("userName"));
              dataIndexName = "circuitNurse2Name";
            } else if (dataIndex == "equipmentNurse1Id") {
              selRec[0].set("equipmentNurse1Id", rec.get("userId"));
              selRec[0].set("equipmentNurse1Name", rec.get("userName"));
              dataIndexName = "equipmentNurse1Name";
            } else if (dataIndex == "equipmentNurse2Id") {
              selRec[0].set("equipmentNurse2Id", rec.get("userId"));
              selRec[0].set("equipmentNurse2Name", rec.get("userName"));
              dataIndexName = "equipmentNurse2Name";
            } else if (dataIndex == "anesDoctor1Id") {
              selRec[0].set("anesDoctor1Id", rec.get("userId"));
              selRec[0].set("anesDoctor1Name", rec.get("userName"));
              dataIndexName = "anesDoctor1Name";
            } else if (dataIndex == "anesDoctor2Id") {
              selRec[0].set("anesDoctor2Id", rec.get("userId"));
              selRec[0].set("anesDoctor2Name", rec.get("userName"));
              dataIndexName = "anesDoctor2Name";
            } else if (dataIndex == "perfusionDoctorId") {
              selRec[0].set("perfusionDoctorId", rec.get("userId"));
              selRec[0].set("perfusionDoctorName", rec.get("userName"));
              dataIndexName = "perfusionDoctorName";
            } else if (dataIndex == "perfusionNurseId") {
              selRec[0].set("perfusionNurseId", rec.get("userId"));
              selRec[0].set("perfusionNurseName", rec.get("userName"));
              dataIndexName = "perfusionNurseName";
            }
            let saveData = {
              id: selRec[0].get("id"), //安排id
              dataIndex: dataIndex,
              dataIndexName: dataIndexName,
              dataIndexNameValue: rec.get("userName"),
              surgerySerial: selRec[0].get("surgerySerial"), //台次
              parentId: selRec[0].get("parentId"), //父节点ID
              isSyncFinal: true //同步最终表
            };
            saveData[dataIndex] = rec.get("userId");
            if (saveData) {
              me.organizeSaveData(saveData);
            }
          }
        },
        listeners: {
          focus: function(combo) {
            if (type == "doctor") me.surgeryAssistantPersonFocus(combo);
          }
        }
      }
    };
  }
});
