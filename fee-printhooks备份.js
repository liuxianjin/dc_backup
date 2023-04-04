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

  let result = null;
  let docType = await documentTypeApp.getDocumentInfo(typeParam);
  if (docType.length > 0) docType = docType[0];
  let feeList = await anesFeeApp.getAnesFeeList({ patientId: data.patientId });
  let feeItems = feeList.items;
  let drugItems = feeItems.filter(item => item.isFee && (item.feeType == 6 || item.feeType == 15));
  let drugList = [];
  for (let i = 0; i < drugItems.length; i++) {
    let item = drugItems[i];
    drugList.push({
      type: "",
      id: item.id,
      parentCode: null,
      leaf: true,
      name: item.itemName,
      isRestriction: item.isRestriction,
      accountType: item.accountType,
      count: item.quantity,
      unit: item.priceUnit,
      unitPrice: item.price,
      totalPrice: item.totalPrice
    });
  }
  feeItems = feeItems.filter(item => item.isFee && item.feeType != 6 && item.feeType != 15);
  feeItems.sort((a, b) => a.feeType - b.feeType);
  let params = getData({ feeItems, drugList }, patientInfo, doc);
  const { config } = container.cradle;
  result = await axios({
    method: "post",
    url: `${config.emr.archiveURL}/emr/archive/pdf`,
    headers: {
      contentType: "application/json; charset=utf-8"
    },
    data: params
  });

  return result;
};

function getData(printData, patientInfo, doc) {
  let appContext = {
    endpoints: { app: "" },
    login: { token: "" },
    data: {}
  };
  // todo 处理模板
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
