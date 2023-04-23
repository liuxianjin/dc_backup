const documentTypeApp = reqlib("/portal/app/dictionary/document-type-app");
const surgeryMaterialsApp = reqlib("/operatingroom/app/materials/surgery-materials-app");
const docDomain = reqlib("/patient/domain/patient/patient-document");
const recordRepo = new (reqlib("/anesthesia/infra/repositories/record/record-repo"))();
const axios = require("axios");
const dateformat = require("dateformat");
const container = reqlib("/container");
const { PDFDocument } = require("pdf-lib");

exports.print = async (data, t) => {
  let typeParam = {
    orDeptId: data.orDeptId, //手术室id
    alias: data.alias, //文书别名
    category: "NURSE",
  };
  let result = null;
  let evenPrint = null;
  let evenPrintResult = null;
  let docType = await documentTypeApp.getDocumentInfo(typeParam);
  if (docType.length > 0) docType = docType[0];

  if (docType.extendAttribute && docType.printRelationDocs && docType.printRelationDocs.length > 0){
    typeParam.alias = docType.printRelationDocs[0].name;
    typeParam.category = docType.printRelationDocs[0].category;
    evenPrint = await documentTypeApp.getDocumentInfo(typeParam);
    if (evenPrint.length > 0) evenPrint = evenPrint[0];
  }
  let materialParam = { patientId: data.patientId, surgeryNoticeId: data.surgeryNoticeId };
  let surgeryMaterialList = await surgeryMaterialsApp.getList(materialParam);
  let patSurgery = await docDomain.getPatSurgery(data.patientId);
  patSurgery = patSurgery.length > 0 ? patSurgery[0] : null;
  if (patSurgery) {
    let finalInfo = await recordRepo.getFinalUserInfo(patSurgery.id);
    if (finalInfo && finalInfo.surgeryDoctorName) patSurgery.surgeryDoctorName = finalInfo.surgeryDoctorName;
    let params = getData(surgeryMaterialList, patSurgery, docType);
    const { config } = container.cradle;
    result = await axios({
      method: "post",
      url: `${config.emr.archiveURL}/emr/archive/pdf`,
      headers: {
        contentType: "application/json; charset=utf-8"
      },
      data: params
    });
    if(evenPrint){
      let params = getData(surgeryMaterialList, patSurgery, evenPrint);
      evenPrintResult = await axios({
        method: "post",
        url: `${config.emr.archiveURL}/emr/archive/pdf`,
        headers: {
          contentType: "application/json; charset=utf-8"
        },
        data: params
      });
      let arr = result.data.substring(result.data.lastIndexOf("<br/>buffer:,") + 13).split(",");
      let arr1 = evenPrintResult.data.substring(evenPrintResult.data.lastIndexOf("<br/>buffer:,") + 13).split(",");
      return mergePdf([new Uint8Array(Int8Array.from(arr)), new Uint8Array(Int8Array.from(arr1))]);
    }else {

    }


    return result.data;
  }
  return result
};

/**
 *
 * @param data  手术耗材表格信息 耗材登记表
 * @param patientInfo  患者信息
 * @param doc  文书信息
 * @returns emr 文书模板 {{fileName, patientId, stream: boolean, archive: boolean, taskName, type: string, params: {appContext: {endpoints: {app: string}, data: {}, login: {token: string}}, categoryCode}}}
 */
function getData(data, patientInfo, doc){
  let appContext = {
    endpoints: { app: "" },
    login: { token: "" },
    data: {}
  };
  if(doc.code === "e3123fe0a8e311ed9ad11978c374066e"){
    if (!data) data = [];
    let tableData = [];
    for (let i = 0; i < data.length; i++) {
      tableData.push(
        [
          data[i].name,
          data[i].unitName,
          data[i].quantity,
          data[i].isImplant === 0 ? "否" : data[i].isImplant === 1 ? "是" : ""
        ]
      );
    }
    appContext.data.table2 =  [
      {
        dataIndex: "data",
        value: [
          ...tableData
        ]
      }
    ];
    //以下数据 对应电子病历模板
    appContext.data["e3Xey_wAxX"] = patientInfo.surgeryDate?dateformat(patientInfo.surgeryDate, "yyyy-mm-dd"):dateformat(new Date(), "yyyy-mm-dd")
    appContext.data["CMlttu1-FA"] = patientInfo.orDeptName;
    appContext.data["e1fqOqwLQlI"] = patientInfo.name;
    appContext.data["e6fEnIAwLkK"] = patientInfo.admissionNumber;
    appContext.data["OKckiDPZc"] = patientInfo.surgeryDoctorName;//主刀
  }else if(doc.code === "28090700a8e911ed8980f3a288360eb9"){
    appContext.data["exDzSFPnIi"] = patientInfo.name;
    appContext.data["IcCtbVvwF1"] = patientInfo.gender
    appContext.data["Y0-tefrIFN"] = patientInfo.orDeptName;
    appContext.data["arvgpH6aYw"] = patientInfo.age;
    appContext.data["VP4dJCb4C"] = patientInfo.bedNumber;
    appContext.data["e9-CUMqjw2X"] = patientInfo.admissionNumber;
  }
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
  }
}
/***
 * 合并 n 个 pdf
 * @param bufferArr  new Uint8Array(Int8Array.from(data));
 * @returns {Promise<string>}  二进制 url
 * @constructor 依赖 PDFDocument
 */
const mergePdf = async function(bufferArr){// new Uint8Array(Int8Array.from(data));
  let pdfDocRes = [];
  for (let index = 0; index < bufferArr.length; index++) {
    const o = bufferArr[index];
    pdfDocRes.push(await PDFDocument.load(o))
  }
  const pdfDoc = await PDFDocument.create();
  for (let index = 0; index < pdfDocRes.length; index++) {
    const o = pdfDocRes[index];
    let res = await pdfDoc.copyPages(o, Array.from({length: o.getPageCount()}, (v, i) => i))
    res.forEach(page => {
      pdfDoc.addPage(page);
    })
  }
  const pdfBytes = await pdfDoc.save();
  return URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));
}
