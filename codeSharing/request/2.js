// 麻醉小结文书
import "../../../../../../../static/lib/common/Content";

class ContentInfo {
  constructor(args) {
    Object.assign(this, args);
  }

  init() {
    let me = this;
    // 绑定多值组件
    if (!me.commonContent) {
      me.commonContent = Ext.create("Document.common.Content", {
        vueNode: me.vueNode,
        saveData: me.saveData,
      });
    }
    // 初始化要绑定多值组件的元素
    me.vueNode.initMultivalueConfig(me.getMultivalueConfig());
    return me;
  }

  initData(data = {}) {
    let me = this;
    let anDeptId = null;
    if (me.vueNode.params && me.vueNode.params.EC_DEPT_ID) {
      anDeptId = me.vueNode.params.EC_DEPT_ID;
    } else {
      anDeptId = "eee";
    }
    // //每次切换患者 需要 对 anDeptId 重新赋值 保持bindDeptInfo 引用不变 不能直接写 me.bindDeptInfo = {xxx}

    if (me.bindDeptInfo) {
      me.bindDeptInfo.anDeptId = anDeptId;
    }
    me.commonContent.destroyMultivalue(me.vueNode.idPrefix);

    me.commonContent.initData(data, me.vueNode.disabled);
    let artificialStore = me.commonContent[me.vueNode.idPrefix + "-multivaluecomp"].multivalueCompObj["artificial"].leftComp.getStore();
    artificialStore.autoLoad = true;
    artificialStore.getProxy().extraParams.anDeptId = anDeptId;

    for (let i = 0; i < 18; i++) {
      let drugStore = me.commonContent[me.vueNode.idPrefix + "-multivaluecomp"].multivalueCompObj["drugtype" + i].leftComp.getStore();
      drugStore.getProxy().extraParams.anDeptId = anDeptId;
    }
  }

  // 获取要绑定多值组件的数据
  getMultivalueConfig() {
    let me = this,
      anDeptId = null,
      drugItem = null,
      eventTypeItem = null,
      renderDrugArr = [],
      eventTypeArr = [];

    if (me.vueNode.params && me.vueNode.params.EC_DEPT_ID) {
      anDeptId = me.vueNode.params.EC_DEPT_ID;
    } else {
      anDeptId = "eee";
    }
    //传递对象 引用方式  切换患者的时候 该方法不会再次加载  会导致获取的  anDeptId 错误
    me.bindDeptInfo = {
      anDeptId: anDeptId,
    };

    drugItem = me.commonContent.getMedicineConfig(
      {
        renderTo: me.vueNode.idPrefix + "-drugtype",
        drugCategory: "体外循环药品",
        cpbRecordIsType: 1,
        bindDeptInfo: me.bindDeptInfo,
        isMultivalueComp: false,
        valueField: "name",
        displayField: "name",
        pageSize: 10,
        pickerConfig: {
          minWidth: 576
        },
        rightCompConfig: null
      },
      {
        leftColumnName: "药品名称",

      }
    );
    eventTypeItem =  me.commonContent.getCirculationEventTypeConfig({
      renderTo: me.vueNode.idPrefix + "-cirevent",
      drugCategory: "体外循环事件",
      cpbRecordIsType: 1,
    });
    for (let i = 0; i < 18; i++) {
      renderDrugArr[i] = _.cloneDeep(drugItem);
      renderDrugArr[i].renderTo += i;
    }
    for (let i = 0; i < 81; i++) {
      eventTypeArr[i] = _.cloneDeep(eventTypeItem);
      eventTypeArr[i].renderTo += i;
    }

    return [
      me.commonContent.getCirculationConfig({
        renderTo: me.vueNode.idPrefix + "-flooding",
        cpbRecordIsType: 1
      }),
      me.commonContent.getCirculationConsumables({
        renderTo: me.vueNode.idPrefix + "-artificial",
        bindDeptInfo: me.bindDeptInfo,
        beforeAddRightStore: (_self, data) => {
          data.num = 1;
        }
      }),
      ...renderDrugArr,
      ...eventTypeArr,
    ];
  }
  saveData(data, key, cbFn) {
    let me = this;
    let keyl = key.substring(8);
    let key2 = key.substring(0, 8);
    if (key == "flooding") {
      if (data) {
        me.vueNode.data.data.content.beseInfo.flooding = data.flooding;
      } else {
        me.vueNode.data.data.content.beseInfo.flooding = "";
      }
    }
    if (key2 == "drugtype") {
      if (data) {
        me.vueNode.data.data.content.beseInfo.drug[keyl].name = data.name;
        $("." + me.vueNode.idPrefix + keyl).focus();
      } else {
        me.vueNode.data.data.content.beseInfo.drug[keyl].name = "";
        me.vueNode.data.data.content.beseInfo.drug[keyl].deposit = "";
        me.vueNode.data.data.content.beseInfo.drug[keyl].loop = "";
        me.vueNode.data.data.content.beseInfo.drug[keyl].amount = "";
      }
    }
    if (key2 == "cirevent") {
      if (data) {
        me.vueNode.data.data.content.beseInfo.operate[keyl].dispose = data.name;
        me.vueNode.data.data.content.beseInfo.operate[keyl].code = data.code;
      } else {
        me.vueNode.data.data.content.beseInfo.operate[keyl].dispose = "";
        me.vueNode.data.data.content.beseInfo.operate[keyl].code = "";
      }
      let operList = me.vueNode.data.data.content.beseInfo.operate;
      let startTime = null;
      let endTime = null;
      let openTime = null;
      let stopTime = null;
      let startList = [];
      let endList = [];
      let openList = [];
      let stopList = [];
      for (let i = 0; i < operList.length; i++) {
        if (operList[i].dispose == "体外循环开始" && operList[i].time != "") {
          startTime = operList[i].time;
          startList.push(operList[i]);
        }
        if (operList[i].dispose == "体外循环结束" && operList[i].time != "") {
          endTime = operList[i].time;
          endList.push(operList[i]);
        }
        if (operList[i].dispose == "主动脉开放" && operList[i].time != "") {
          openTime = operList[i].time;
          openList.push(operList[i]);
        }
        if (operList[i].dispose == "阻断主动脉" && operList[i].time != "") {
          stopTime = operList[i].time;
          stopList.push(operList[i]);
        }
      }
      // startList = me.vueNode.dealList(startList);
      // endList = me.vueNode.dealList(endList);
      // openList = me.vueNode.dealList(openList);
      // stopList = me.vueNode.dealList(stopList);
      me.vueNode.data.data.content.beseInfo.cpbTime = me.vueNode.calculateTime(startList, endList);
      me.vueNode.data.data.content.beseInfo.blocking = me.vueNode.calculateTime(stopList, openList);
    }
    if (key == "artificial") {
      if (data) {
        me.vueNode.data.data.content.beseInfo.artificial = data.artificial;
      } else {
        me.vueNode.data.data.content.beseInfo.artificial = "";
      }
    }
    try {
      if (cbFn) cbFn();
    } catch (error) {
      console.error(error);
    }
  }
}

export default ContentInfo;
