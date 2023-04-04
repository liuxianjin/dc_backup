// 通用EMR 归档文书 无菜单未保存时 单打 连打 展示打印次数

/***
 *
 * @param docInfo { orDeptId, alias, category }
 * @param patientInfo { patientId, orDeptId,  }
 * @param userInfo { userId  }
 * @returns {Promise<void>}
 */
AimsUtils.printEmrDocument = async (docInfo, patientInfo, userInfo, afterCb) => {
  if (!patientInfo.patientId) return;
  let docList = []; // 需要打印的文书
  let printRelationDocs = []; // 需要连打的文书
  let printStore = []; // 连打组件 初始化 store
  try {
    let doc = await axios.get("/portal/dictionary/document/info/list", {
      params: {
        orDeptId: patientInfo.orDeptId,
        alias: docInfo.name,
        category: docInfo.category
      }
    });
    let docData = doc.data.data[0];
    docList.push(docData);
    if (docData.extendAttribute && docData.extendAttribute.printRelationDocs && docData.extendAttribute.printRelationDocs.length > 0) {
      printRelationDocs = docData.extendAttribute.printRelationDocs;
      for (let i = 0; i < printRelationDocs.length; i++) {
        let temp = await axios.get("/portal/dictionary/document/info/list", {
          params: {
            orDeptId: patientInfo.orDeptId,
            alias: printRelationDocs[i].name,
            category: printRelationDocs[i].category
          }
        });
        if (temp && temp.data && temp.data.data && temp.data.data.length) {
          docList.push(temp.data.data[0]);
        }
      }
    }
  } catch (e) {
    AimsUtils.alert("打印失败，未查询到相关的文书信息", 3, true);
  }
  if (docList.length) {
    /*
      查询或者保存打印次数
      printStore alias   category  code orDeptId version extendAttribute
      printObj "id", "name", "orDeptId", "patientId", "printCount", "submitStatus", "typeCode", "writeStatus"
     */
    for (const item of docList) {
      try {
        let printObj = await axios.get("/patient/comm/document", {
          params: {
            id: "",
            patientId: patientInfo.patientId,
            typeCode: item.code
          }
        });
        if (printObj.data.data.data.id) {
          printStore.push(Object.assign(printObj.data.data.data, { name: item.name }));
        } else {
          let axiosData = {
            content: {},
            id: "",
            orDeptId: patientInfo.OR_DEPT_ID,
            patientId: patientInfo.patientId,
            typeCode: item.code,
            writeStatus: 0,
            submitStatus: 0,
            submitTime: null,
            submitterId: null,
            creatorId: userInfo.userId,
            createTime: "",
            modifierId: userInfo.userId,
            modifyTime: "",
            printCount: 0,
            signatureList: [],
            surgeryInfo: [],
            version: item.version
          };
          // 保存患者文书
          await axios.post("/patient/comm/document", { params: axiosData });
          // 更新
          let printObj = await axios.get("/patient/comm/document", {
            params: {
              id: "",
              patientId: patientInfo.patientId,
              typeCode: item.code
            }
          });
          if (printObj.data.data.data.id) {
            printStore.push(Object.assign(printObj.data.data.data, { name: item.name }));
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  if (docList.length > 1) {
    // 文书连打
    Ext.create("document.common.PrintWin", {
      title: "文书打印",
      patientId: patientInfo.patientId,
      storeLoad: printStore,
      isEmrArchivePrint: true,
      printRelationDocs: printRelationDocs,
      onPrint: res => {
        let printArr = [];
        res.forEach(item => {
          printArr.push({
            code: item.get("typeCode"),
            version: item.get("version")
          });
        });
        afterCb && afterCb()
        me.toEmrPrint(grid, patientInfo, printArr);
      },
      onCancel: () => {}
    }).show();
  } else {
    // 文书单打
    if (printStore[0].printCount > 0) {
      CommonComp.showConfirmWindow(me.vueNode, {
        remark: `此文书已经被打印 ${printStore[0].printCount} 次，确定打印吗?`,
        confirmAfter: async () => {
          await axios.post("/patient/comm/document/print/num", { id: printStore[0].id });
          me.toEmrPrint(grid, patientInfo, docList);
        }
      });
    }
  }
};
