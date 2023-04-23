Ext.define("OpeArrangement.view.OpeListByDept", {
  extend: "Ext.grid.Panel",
  alias: "widget.opelistbydept",
  width: "100%",
  columnLines: true,
  rowLines: true,
  autoScroll: true,
  bufferedRenderer: false,
  style: "border-bottom-width: 0px !important;border-top:1px solid #d0d0d0 !important;",
  initComponent: function() {
    let me = this;
    Ext.apply(me, {
      store: Ext.create("Ext.data.ArrayStore", {
        autoLoad: true,
        model: "OpeArrangement.model.OpeArrangementModel",
        groupField: "applyDeptId",
        proxy: {
          type: "ajax",
          url: "",
          reader: {
            type: "json",
          },
        },
        data: [],
      }),
      features: Ext.create("Ext.grid.feature.Grouping", {
        groupHeaderTpl: [
          "{children:this.formatName}",
          {
            formatName: function(data) {
              return data[0].data.applyDeptName + `（${data.length}）`;
            },
          },
        ],
      }),
      columnLines: true,
      columns: me.createColumns(),
    });
    me.callParent();
  },
  //刷新列表数据
  refreshGrid: function(deptId) {
    let me = this;
    me.getStore().removeAll();
    let surgeryData = [],
      addData = [];
    me.app
      .getOpearrangementlist()
      .getStore()
      .each(o => {
        if (o.data.applyDeptId && o.data.arrId) {
          if (deptId) {
            if (o.data.applyDeptId === deptId) {
              surgeryData.push(o.data);
            }
          } else {
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
        text: "申请科室",
        align: "left",
        style: "text-align:center",
        dataIndex: "applyDeptName",
        width: 115,
        renderer: me.rendererComm,
      },
      {
        text: "住院号",
        align: "left",
        style: "text-align:center",
        dataIndex: "admissionNumber",
        width: 90
      },
      {
        text: "床位号",
        align: "left",
        dataIndex: "bedNumber",
        width: 70
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
        text: "性别",
        align: "center",
        dataIndex: "gender",
        width: 50
      },
      {
        text: "年龄",
        align: "left",
        dataIndex: "ageYear",
        width: 50
      },
      {
        text: "申请时间",
        align: "center",
        style: "text-align:center;",
        dataIndex: "surgeryDate",
        width: 135
      },
      {
        text: "手术间",
        align: "left",
        style: "text-align:center",
        dataIndex: "name",
        width: 90,
      },
      {
        text: "台号",
        width: 50,
        style: "text-align:center;",
        dataIndex: "roomSerial",
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
        text: "主麻",
        width: 80,
        style: "text-align:center;",
        dataIndex: "anesDoctor1Name",
      },
      {
        text: "器械",
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
        text: "感染",
        align: "left",
        style: "text-align:center",
        dataIndex: "infectionHistory",
        width: 80,
      },
      {
        text: "传染风险",
        align: "left",
        style: "text-align:center",
        dataIndex: "infectionCount",
        width: 80,
      },
      {
        text: "异常",
        align: "left",
        style: "text-align:center",
        dataIndex: "abnormalCount",
        width: 60,
      },
      {
        text: "发布人",
        align: "left",
        style: "text-align:center",
        dataIndex: "nurseReleaseUsername",
        width: 80,
      },
      {
        text: "发布时间",
        align: "left",
        style: "text-align:center",
        dataIndex: "nurseReleaseTime",
        width: 135,
      },
      /*      {
        text: "术前检查结果",
        width: 250,
        style: "text-align:center;",
        sortable: false,
        groupable: false,
        columns: [
          {
            style: "text-align:center;",
            sortable: false,
            groupable: false,
            text: "Hbv",
            width:50,
            dataIndex: ""
          },
          {
            style: "text-align:center;",
            sortable: true,
            groupable: false,
            text: "Hcv",
            width:50,
            dataIndex: ""
          },
          {
            style: "text-align:center;",
            sortable: true,
            groupable: false,
            text: "Hiv",
            dataIndex: "",
            width:50,
            renderer: me.rendererTip
          },
          {
            style: "text-align:center;",
            sortable: true,
            groupable: false,
            text: "传染",
            dataIndex: "",
            width:50,
            renderer: me.rendererTip
          },
          {
            style: "text-align:center;",
            sortable: true,
            groupable: false,
            text: "TP",
            dataIndex: "",
            width:50,
            renderer: me.rendererTip
          }
        ]
      },*/
      {
        text: "备注",
        align: "left",
        style: "text-align:center",
        dataIndex: "remark",
        width: 120,
        renderer: me.rendererComm,
      },
    ];
    return columns;
  },
  createToolbar: function() {
    let me = this;
    return [
      {
        xtype: "toolbar",
        dock: "top",
        items: [
          "分科室汇总",
          "->",
          {
            xtype: "comboboxgridtree",
            valueField: "DEPT_ID",
            displayField: "DEPT_NAME",
            emptyText: "申请科室",
            queryDelay: 500,
            width: 200,
            //hideTrigger: true,
            selectOnFocus: true,
            pickerConfig: {
              //height: 100,
              minWidth: 380,
              width: 250,
            },
            triggers: {
              clear: {
                cls: Ext.baseCSSPrefix + "form-clear-trigger",
                weight: -1,
                handler: function(_this) {},
              },
            },
            leftCompConfig: {
              columns: {
                defaults: {
                  style: "text-align:center;",
                  textAlign: "start",
                  sortable: false,
                  groupable: false,
                },
                items: [
                  {
                    text: "名称",
                    minWidth: 100,
                    flex: 1,
                    dataIndex: "DEPT_NAME",
                  },
                  {
                    text: "例数",
                    minWidth: 80,
                    dataIndex: "DEPT_COUNT",
                  },
                ],
              },
              store: Ext.create("Ext.data.Store", {
                fields: ["DEPT_ID", "DEPT_NAME", "DEPT_COUNT"],
                pageSize: 7,
                autoLoad: false,
                proxy: {
                  url: SERVICE_URL + "operatingroom/arrangement/await/arrapplydeptlist",
                  type: "ajax",
                  reader: {
                    type: "json",
                    rootProperty: "data.data",
                    totalProperty: "data.totalCount",
                  },
                  extraParams: {
                    orDeptId: null,
                    surgeryDate: null,
                  },
                },
                listeners: {
                  beforeLoad: function(store, options) {},
                },
              }),
            },
            matchFieldWidth: false,
            pageSize: 7,
            focusOnExpand: false,
            listeners: {
              render: function(_this, eOpts) {},
            },
            itemClickCb(rec) {},
          },
        ],
      },
    ];
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
          height: 300,
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
              dataIndex: "userName",
            },
            {
              text: "性别",
              style: "text-align: center;",
              textAlign: "start",
              width: 60,
              dataIndex: "genderName",
            },
            {
              text: "类型",
              style: "text-align: center;",
              textAlign: "start",
              width: 60,
              dataIndex: "typeName",
            },
            {
              text: "职称",
              style: "text-align: center;",
              textAlign: "start",
              width: 110,
              dataIndex: "jobTitle",
            },
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
                totalProperty: "data.totalCount",
              },
            },
          }),
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
              isSyncFinal: true, //同步最终表
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
          },
        },
      },
    };
  },
});
