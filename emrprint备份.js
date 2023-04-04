const container = reqlib("/container");
const domain = reqlib("/patient/domain/patient/archive");
const EmrDomain = reqlib("/patient/domain/patient/emr-archive");
const accountTokenDomain = reqlib("/portal/domain/login/account-token");
const tools = reqlib("/portal/interfaces/http/utils/tools");
const dateFormat = require("dateformat");
const _ = require("underscore");
const options = reqlib("/portal/domain/options/sys-options");
const ct = reqlib("/utils/constant")();
const docTypeDomain = reqlib("/portal/domain/dictionary/document-type");

const documentTypeApp = reqlib("/portal/app/dictionary/document-type-app");
const axios = require("axios");
const { PDFDocument } = require("pdf-lib");

/**
 * 归档信息回传入库操作
 */
exports.saveArchiveInfo = (data) => {
  const { config, logger, dataCache, database } = container.cradle;
  if (data.data && data.data.content) {
    data = new EmrDomain(logger, config).getCallbackParams(data);
  }
  let recordId = data.recordId ? data.recordId : null;
  return database.sequelize
    .transaction(async (t) => {
      //1.归档入库
      let archiveResult = await domain.archive(data.patientId, data.documentCode, data.userId, data.fileName, data.documentId, recordId, t);
      if (!archiveResult) return `归档失败！`;

      //2.判断是否需要CDR上传
      let submitHandler = null;
      try {
        let version = "";
        if (!_.isEmpty(data.version)) version = `/v${data.version}`;
        submitHandler = reqlib(`/@hospital/document/hooks/doc_${data.documentCode}${version}/onsubmit`);
      } catch (err) {}

      if (submitHandler && submitHandler.reportedData) {
        //logger.debug("患者文书准备上报|%j", data);
        await submitHandler.reportedData(data, t);
      }
      return `归档成功！`;
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * 文书归档PDF
 * @param  {JSON}     data {
 *  documentId:'文书ID',
 *  documentCode:'文书编码',
 *  patientId:'患者id',
 *  userId:'操作者',
 *  'url':'归档的文书URL',
 *  'token':'token',
 *  recordId: '记录ID(文书归档时recordId必须为空；有些操作记录需要生成PDF时，recordId必填；recordId不为空时，不触发文书上报逻辑)'
 * }
 * @return {Promise}           [description]
 */
exports.archivePDF = async (data, t) => {
  const { config, logger, dataCache, mq } = container.cradle;
  let result = { code: 1, name: null },
    recordId = data.recordId ? data.recordId : null;
  data.margin = { top: 50, left: 50, bottom: 50, right: 50 }; //患者文书通用设置
  data.isAsync = "no"; //yes/no(异步/同步)（需要排除，目前可以废弃掉）
  data.format = "A4";
  data.sourceType = 1;
  data.token = await accountTokenDomain.getDaemonToken();

  if (config.emr.archiveURL && !_.isEmpty(data.documentSyncId)) {
    //编辑器文书归档
    await new EmrDomain(logger, config).archive(data);
    return { code: 1, name: "正在归档！" };
  }

  if (_.isEmpty(data.url)) {
    let { url, sourceType } = await getArchiveURL(data);
    data.url = url;
    data.sourceType = sourceType;
    if (sourceType === 2) data.margin = { top: 0, left: 0, bottom: 0, right: 0 }; //边距为0
  }
  //2.查询文书归档队列是否启用
  if (typeof data.isAsyncArchive == "undefined") {
    let isUsed = await options.getConfigByCode("000030000000"); //查询是否启用文书归档服务
    if (isUsed != null && isUsed == 1) data.isAsyncArchive = 1;
  }
  //3. 设置打印方向 landscape // 是否横向打印,1:横向，0:纵向
  let dictDocList = await docTypeDomain.getDocumentInfoByCode({ typeCode: data.documentCode });
  data.landscape = dictDocList && dictDocList.extendAttribute && (dictDocList.extendAttribute.isLandscape || dictDocList.extendAttribute.islandscape) ? 1 : 0;

  //4.设置归档文书URL
  let url = `http://${config.archive.host}:${config.archive.port}/pdf`;
  //5.调用归档接口
  if (data.isAsyncArchive == 1) {
    //异步归档
    await mq.publish("patient.doc-archive-task", data, {});
    result.code = 1;
    result.name = "正在归档！";
  } else {
    //同步归档
    let docArchive = await tools.postByJSONPromise(url, JSON.stringify(data));
    let fileName = docArchive.filename;
    await domain.archive(data.patientId, data.documentCode, data.userId, fileName, data.documentId, recordId, t);

    result.code = 2;
    result.name = "归档成功！";
  }
  return result;
};

async function getArchiveURL(data) {
  let url = null,
    sourceType = 1; //来源：1-手麻；2-文书编辑器
  if (data.documentCode === "78907107528511e89d0960a44cce202b" || data.documentCode === "f52e30b6919811e8b3eb60a44cce202b") sourceType = 1;
  else if (!_.isEmpty(data.documentSyncId)) sourceType = 2;

  if (sourceType === 1) {
    let hospitalId = await domain.getHospitalId(data.patientId);
    url = `/#/portal/document/archive?typeCode=${data.documentCode}&patientId=${data.patientId}&hospitalId=${hospitalId}&version=${data.version}`;
  } else if (sourceType === 2) {
    url = `/emr/runtime/print.html?preview=false&docs=${data.documentSyncId}&archive=true`; //生产环境ng代理，URL中必须加/emr/runtime，本地调试无需加/emr/runtime
    //url = `http://192.168.2.25:8088/print.html?preview=false&docs=${data.documentSyncId}&archive=true`;
  }
  return { url, sourceType };
}

/**
 * redis存储文书PDF归档信息
 * @param  {JSON}     data {
 *  documentCode:'文书编码',
 *  patientId:'患者id',
 *  url:'归档的文书URL',
 *  isSave:false
 * }
 * @return {Promise}           [description]
 */
exports.archivePDFStream = async (data) => {
  const { config, logger, dataCache } = container.cradle;
  let pdfBase64 = null;

  data.margin = { top: 50, left: 50, bottom: 50, right: 50 }; //患者文书通用设置
  data.isAsync = "no"; //yes/no(异步/同步)
  data.format = "A4";
  data.isSaveDisk = "no"; //是否存储
  //设置打印方向 landscape // 是否横向打印,1:横向，0:纵向
  let dictDocList = await docTypeDomain.getDocumentInfoByCode({ typeCode: data.documentCode });
  data.landscape = dictDocList && dictDocList.extendAttribute && (dictDocList.extendAttribute.isLandscape || dictDocList.extendAttribute.islandscape) ? 1 : 0;
  let hospitalId = await domain.getHospitalId(data.patientId);

  if (data.documentSyncId && config.emr.archiveURL) {
    pdfBase64 = await new EmrDomain(logger, config).getPDFBase64(data);
  } else {
    if (data.sourceType === 1) data.url = `/#/portal/document/archive?typeCode=${data.documentCode}&patientId=${data.patientId}&hospitalId=${hospitalId}&version=${data.version}`;
    else if (data.sourceType === 2) data.url = `/emr/runtime/print.html?preview=false&docs=${data.documentSyncId}&archive=true`; //生产环境ng代理，URL中必须加/emr/runtime，本地调试无需加/emr/runtime
    let docArchive = await tools.postByJSONPromise(`http://${config.archive.host}:${config.archive.port}/pdf`, JSON.stringify(data));
    pdfBase64 = Buffer.from(docArchive.buffer).toString("base64");
  }
  return pdfBase64;
};

/**
 * 文书归档PDF
 * @param  {JSON}     data
 * @return {Promise}           [description]
 */
exports.archiveImage = async (data) => {
  const { config, logger } = container.cradle;
  let isAsync = "no"; //yes/no(异步/同步)
  //1.POST方式
  let url = `http://${config.archive.host}:${config.archive.port}/screenshot`;
  //if (!data.url)
  data.url = "/#/portal/document/archive?typeCode=dd2d8725a90e45298cf62b7674b324d0&patientId=fe6c5ad081f711e99d255d047a5482c2&version=1.0";
  data.format = "A4";
  //data.width = 1120;
  //data.height = 1525;
  data.isAsync = isAsync;
  let docArchive = await tools.postByJSONPromise(url, JSON.stringify(data));

  let fileName = docArchive.filename;
  await domain.archive(data.patientId, data.documentCode, data.userId, fileName);
  return `${fileName},归档成功！`;
};

/**
 * 获取文书归档PDF（目前只有术前评估单）
 * 1.优先从redis中读取
 * 2.若redis中读取不到，则异步产生流，向前台提示“正在生成PDF，请稍等！”
 * @param  {JSON}     data {
 *  documentCode:'文书编码',
 *  patientId:'患者id',
 *  }
 * @return {Promise}           [description]
 */
exports.getPDFStream = (data) => {
  let me = exports;
  const { config, logger, dataCache } = container.cradle;
  return Promise.resolve()
    .then(async () => {
      let docBase64 = null; //await dataCache.get(`pdf_${data.patientId}_${data.documentCode}`);
      if (!docBase64) {
        me.archivePDFStream(data);
      }
      return docBase64;
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * 根据文书名字返回PDF文书的Base64
 * @param fileName 文书名字
 */
exports.getPDFStreamComm = async (fileName) => {
  const { config, logger, dataCache } = container.cradle;
  let docBase64 = null;
  if (fileName && fileName.indexof("/") > 1) {
    docBase64 = await new EmrDomain(logger, config).getPDFBase64ByFileName(fileName);
  } else {
    let url = `http://${config.archive.host}:${config.archive.port}/pdf/base64?url=${fileName}`;
    let result = await tools.postByJSONPromise(url, JSON.stringify(data));
    if (result.data) docBase64 = result.data;
  }
  return docBase64;
};

/**
 * 文书归档PDF
 * @param  {JSON}     data
 * @return {Promise}           [description]
 */
exports.download = (data) => {
  const { config, logger, dataCache } = container.cradle;
  let me = exports;
  return Promise.resolve()
    .then(async () => {
      let fileInfo = {
        filePath: null,
        archiveTime: null,
        archiverName: null,
        fileName: null,
        content: null,
        patientId: null,
        patientName: null,
        admissionNumber: null,
      };
      let docInfo = await domain.getDocArchiveFile(data);
      if (docInfo.length > 0) {
        let fileName = docInfo[0].FILE_NAME;
        //fileInfo.filePath = `/download/res_d8ca8d6019c244d49ef3f82bea954292/pdf/${fileName}`;
        (fileInfo.filePath = `/pdf/${fileName}`), (fileInfo.archiveTime = dateFormat(docInfo[0].ARCHIVE_TIME, "yyyy-mm-dd HH:MM"));
        fileInfo.archiverName = docInfo[0].ARCHIVE_NAME;
        fileInfo.content = docInfo[0].CONTENT;
        fileInfo.fileName = docInfo[0].FILE_NAME;
        fileInfo.patientId = docInfo[0].PATIENT_ID;
        fileInfo.patientName = docInfo[0].PATIENT_NAME;
        fileInfo.admissionNumber = docInfo[0].ADMISSION_NUMBER;
        fileInfo.host = `http://${config.archive.host}:${config.archive.port}`;
        //EMR归档地址；
        if (docInfo[0].FILE_NAME.indexof("/") > 1) fileInfo.host = `${config.emr.archiveURL}`;
      }

      if (fileInfo.filePath === null) {
        docInfo = await domain.getPatDocumentInfo(data);
        fileInfo.patientId = docInfo[0].PATIENT_ID;
        fileInfo.patientName = docInfo[0].PATIENT_NAME;
        fileInfo.admissionNumber = docInfo[0].ADMISSION_NUMBER;
        fileInfo.content = docInfo[0].CONTENT;

        let docBase64 = null; //await dataCache.get(`pdf_${data.patientId}_${data.documentCode}`);
        if (!data.isReload && docBase64) {
          fileInfo.filePath = `patient/archive/stream?patientId=${data.patientId}&documentCode=${data.documentCode}`;
        } else {
          await me.archivePDFStream(data);
          fileInfo.filePath = `patient/archive/stream?patientId=${data.patientId}&documentCode=${data.documentCode}`;
        }
      }
      return fileInfo;
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * 获取归档信息
 * @param  {JSON}     data {patientId:'',documentId:''}
 * @return {Promise}           [description]
 */
exports.getArchiveInfo = (data, t) => {
  return domain.getArchiveHistory(data, t);
};

/**
 * 查询文书归档历史
 */
exports.getArchiveHistory = async (data) => {
  const { config, logger, dataCache } = container.cradle;
  let result = [];
  let documentId = data.documentId;
  if (!documentId) {
    let docList = await domain.getPatDocumentId({ documentCode: data.typeCode, patientId: data.patientId });
    if (docList.length > 0) documentId = docList[0].id;
  }
  if (documentId) {
    result = await domain.getArchiveHistory({ documentId: documentId, patientId: data.patientId });
    result.forEach((item) => {
      item.archiveTime = dateFormat(item.archiveTime, "yyyy-mm-dd HH:MM:ss");
      if (item.content && item.content.indexOf("/") > 1) item.url = `${config.emr.archiveURL}/emr/archive/files/${item.content}`;
      else item.url = `http://${config.archive.host}:${config.archive.port}/pdf/${item.content}`;
    });
  }
  return result;
};

/**
 * 查询文书最新归档pdf
 */
exports.getLatestArchivePdf = async (data) => {
  const { config } = container.cradle;
  let result = null;
  let rchiveHistory = await domain.getArchiveHistory({ documentId: data.documentId, patientId: data.patientId });
  if (rchiveHistory.length > 0) {
    result = rchiveHistory[rchiveHistory.length - 1].content;
  }
  return result;
};

/**
 * 删除快照
 * @param  {JSON}     data {patientId:'',documentId:''}
 * @return {Promise}           [description]
 */
exports.deleteArchive = (data, t) => {
  return domain.deleteArchive(data, t);
};

exports.archivePDFBatchPrint = async (data, t) => {
  let archiveArr = [];
  const { config, mq } = container.cradle;
  for (let i = 0; i < data.data.length; i++) {
    let archiveData = {
      margin: { top: 50, left: 50, bottom: 50, right: 50 }, //患者文书通用设置
      isAsync: "no", //yes/no(异步/同步)（需要排除，目前可以废弃掉）
      format: "A4",
      sourceType: 1,
      token: data.token,
      userId: data.userId,
      documentCode: data.data[i].documentCode,
      documentId: data.data[i].documentId,
      patientId: data.data[i].patientId,
      documentSyncId: data.data[i].documentSyncId,
    };
    if (_.isEmpty(data.data[i].url)) {
      let { url, sourceType } = await getArchiveURL(data.data[i]);
      archiveData.url = url;
      archiveData.sourceType = sourceType;
      if (sourceType === 2) archiveData.margin = { top: 0, left: 0, bottom: 0, right: 0 }; //边距为0
    }
    archiveArr.push(archiveData);
  }
  let results = await tools.postByJSONPromise(`http://${config.archive.host}:${config.archive.port}/pdf/batch/print`, JSON.stringify(archiveArr));
  return results.printFileName;
};

exports.mergePdf = async (mergeData) => {
  const { config, mq, logger } = container.cradle;
  return tools.postByJSONPromise(`http://${config.archive.host}:${config.archive.port}/pdf/merge`, JSON.stringify(mergeData));
};
// emr 文书自动填充数据并打印  支持连打
/***
 * @param data 打印所需数据 printDocList : [{ code, version }] 必传  其余的按需
 * @param t
 * @returns {Promise<string>}
 */
exports.printEmrDoc = async (data, t) => {
  let result = null,
    paramsArr = [],
    mergePdfArr = [];
  let { printDocList } = data;
  if (printDocList && printDocList.length) {
    for (const docInfo of printDocList) {
      let params = await loadEmrParams(data, docInfo);
      if (params) paramsArr.push(params);
    }
  }



  // let docInfo = await documentTypeApp.getDocumentInfo(typeParam);
  // if (docInfo.length > 0) docInfo = docInfo[0];
  // // 加载文书数据
  // let params = await loadEmrParams(data, docInfo);
  // if (params) paramsArr.push(params);
  if (Array.isArray(data.alias) && data.alias.length) {
    for (const item of data.alias) {
      const index = data.alias.indexOf(item);
      let typeParam = {
        orDeptId: data.orDeptId,
        alias: item,
        category: data.category[index]
      };
      let docInfo = await documentTypeApp.getDocumentInfo(typeParam);
      if (docInfo.length > 0) docInfo = docInfo[0];
      let params = await loadEmrParams(data, docInfo);
      if (params) paramsArr.push(params);
    }
  } else {
    let docInfo = await documentTypeApp.getDocumentInfo(typeParam);
    if (docInfo.length > 0) docInfo = docInfo[0];
    let params = await loadEmrParams(data, docInfo);
    if (params) paramsArr.push(params);
  }
  // emr 文书自动连打
  /*  if (docInfo.extendAttribute && docInfo.extendAttribute.printRelationDocs && docInfo.extendAttribute.printRelationDocs.length > 0) {
      let source = docInfo.extendAttribute.printRelationDocs;
      for (let i = 0; i < source.length; i++) {
        let item = source[i];
        let itemInfo = await documentTypeApp.getDocumentInfo({
          orDeptId: data.orDeptId,
          alias: item.name,
          category: item.category
        });
        if (itemInfo.length > 0) itemInfo = itemInfo[0];
        let itemParams = await loadEmrParams(data, itemInfo);
        if (itemParams) paramsArr.push(itemParams);
      }
    }*/
  const { config } = container.cradle;
  let request = [];
  for (const item of paramsArr) {
    request.push(
      axios({
        method: "post",
        url: `${config.emr.archiveURL}/emr/archive/pdf`,
        headers: {
          contentType: "application/json; charset=utf-8"
        },
        data: item
      })
    );
  }
  result = await Promise.all(request).then(async result => {
    result.forEach(item => {
      let arr = item.data.substring(item.data.lastIndexOf("<br/>buffer:,") + 13).split(",");
      mergePdfArr.push(new Uint8Array(Int8Array.from(arr)));
    });
    let uint8Array = await mergePdfByUint8(mergePdfArr);
    return uint8Array.toString();
  });
  return result;
};

/***
 * 通过 Uint8Array 合并 n 个 pdf EMR 打印
 * @param bufferArr  [Uint8Array, Uint8Array] 二维数组
 * @returns {Promise<Uint8Array>}
 * @constructor 依赖 PDFDocument
 */
const mergePdfByUint8 = async bufferArr => {
  if (bufferArr.length === 1) return bufferArr[0];
  let pdfDocRes = [];
  for (let index = 0; index < bufferArr.length; index++) {
    const o = bufferArr[index];
    pdfDocRes.push(await PDFDocument.load(o));
  }
  const pdfDoc = await PDFDocument.create();
  for (let index = 0; index < pdfDocRes.length; index++) {
    const o = pdfDocRes[index];
    let res = await pdfDoc.copyPages(
      o,
      Array.from({ length: o.getPageCount() }, (v, i) => i)
    );
    res.forEach(page => {
      pdfDoc.addPage(page);
    });
  }
  return await pdfDoc.save();
};

const loadEmrParams = async (data, docInfo) => {
  const { getEmrPrintData } = reqlib(`/@hospital/document/hooks/doc_${docInfo.code}/v${docInfo.version}/onload.js`);
  if (getEmrPrintData) {
    return await getEmrPrintData(data);
  }
  return null;
};
