const documentTypeApp = reqlib("/portal/app/dictionary/document-type-app");
const surgeryMaterialsApp = reqlib("/operatingroom/app/materials/surgery-materials-app");
const docDomain = reqlib("/patient/domain/patient/patient-document");
const recordRepo = new (reqlib("/anesthesia/infra/repositories/record/record-repo"))();
const axios = require("axios");
const dateformat = require("dateformat");
const container = reqlib("/container");
const anesFeeApp = reqlib("/anesthesia/app/fee/anes-fee-app");

exports.print = async (data, t) => {
  let typeParam = {
    patientId: data.patientId, //手术室id
    alias: data.alias, //文书别名
    category: "ANESTHESIA",
    orDeptId: data.orDeptId
  };
  let printDrugList = JSON.parse(data.printDrugList),
    printItemList = JSON.parse(data.printItemList);

  let result = null;
  let docType = await documentTypeApp.getDocumentInfo(typeParam);
  if (docType.length > 0) docType = docType[0];

  let patSurgery = await docDomain.getPatSurgery(data.patientId);
  patSurgery = patSurgery.length > 0 ? patSurgery[0] : null;
  if (patSurgery) {
    let params = getData({ printItemList, printDrugList }, patSurgery, docType);
    const { config } = container.cradle;
    result = await axios({
      method: "post",
      url: `${config.emr.archiveURL}/emr/archive/pdf`,
      headers: {
        contentType: "application/json; charset=utf-8"
      },
      data: params
    });
    return result.data;
  }
  return result;
};

function getData(printData, patientInfo, doc) {
  let appContext = {
    endpoints: { app: "" },
    login: { token: "" },
    data: {}
  };
  let { printItemList, printDrugList } = printData;
  // todo 处理模板
  let feeItems = [];
  let durgList = [];
  for (let i = 0; i < printItemList.length; i++) {
    feeItems.push(
      [
        i + 1,
        printItemList[i].typeName,
        printItemList[i].itemName,
        printItemList[i].spec,
        printItemList[i].userCode,
        printItemList[i].quantity,
        printItemList[i].price,
        printItemList[i].totalPrice,
      ]
    );
  }
  for (let i = 0; i < printDrugList.length; i++) {
    durgList.push(
      [
        i + 1,
        printDrugList[i].itemName,
        printDrugList[i].isRestriction == 1 ?"是":"否",
        printDrugList[i].accountType ==1 ?"自费":printDrugList[i].accountType ==2 ?"医保":"",
        printDrugList[i].quantity,
        printDrugList[i].priceUnit,
        printDrugList[i].price,
        printDrugList[i].totalPrice,
      ]
    );
  }
  appContext.data.table =  [
    {
      dataIndex: "data",
      value: [
        ...feeItems
      ]
    }
  ];
  appContext.data.table1 =  [
    {
      dataIndex: "data",
      value: [
        ...durgList
      ]
    }
  ];
  appContext.data["hTuk6vO7G"] = patientInfo.name;
  appContext.data["e6sIOtb8Q6"] = patientInfo.admissionNumber;
  appContext.data["hmAqxJPl7"] = patientInfo.orDeptName;
  appContext.data["e4JVe_oRC4"] = patientInfo.bedNumber;
  appContext.data["VQU4qTQxa"] = patientInfo.roomName;
  appContext.data["e0Rx4-OJRg"] = patientInfo.surgeryDate?dateformat(patientInfo.surgeryDate, "yyyy-mm-dd"):null

  appContext.data["oFBLAiMcp"] = 0;
  appContext.data["IRrE_Xa35_"] = 0;
  appContext.data["LPdaCYikkP"] = 0;
  // 收费项目合计 oFBLAiMcp
  // 收费药品合计 IRrE_Xa35_
  // 总合计 LPdaCYikkP


  return {
    archive: false,
    fileName: doc.name,// 可以随便传
    patientId: patientInfo.patientId,
    stream: true,
    taskName: doc.name,// 可以随便传
    type: "template",
    params: {
      categoryCode: doc.code,
      appContext: appContext
    }
  };
}
