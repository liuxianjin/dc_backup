/*知情同意书关键字说明
关键字基本上是按模板上的展示顺序展示的*/
//分娩镇痛麻醉知情同意书; v6.0
let o1 = {
  deptName: "科室",
  bedNumber: "床号",
  name: "患者姓名",
  gender: "性别",
  age: "年龄",
  admissionNumber: "住院号",
  diagnosis: "诊断",
  // 医生告知 一
  doctor1_0: "true/false",
  doctor1_1: "true/false",
  doctor1_2: "true/false",
  doctor1_3: "true/false",
  doctor1_4: "true/false",
  doctor1_5: "true/false",
  doctor1_6: "true/false",
  doctor1_7: "true/false",
  doctor1_8: "true/false",
  doctor1_other: "其他", //文案
  // 医生告知 二
  doctor2_0: "true/false",
  doctor2_1: "true/false",
  doctor2_2: "true/false",
  doctor2_3: "true/false",
  doctor2_4: "true/false",
  doctor2_5: "true/false",
  doctor2_6: "true/false",
  doctor2_7: "true/false",
  doctor2_8: "true/false",
  doctor2_9: "true/false",
  doctor2_10: "true/false",
  doctor2_11: "true/false",
  // 医生告知 三
  doctor3_0: "true/false",
  //医生告知 四
  doctor4_0: "true/false",
  // 接收分娩镇痛服务和使用.....
  toAnesthesia: "true/false",
  toAnesthesia_dis: "true/false",
  // 蛛网膜下使用药品
  toAnesthesia1: "true/false",
  toAnesthesia1_dis: "true/false",
  // 耗材
  useDrugs: "true/false",
  useDrugs_dis: "true/false",
  doctorSignatureTime: "医师签字时间"
};

//麻醉知情同意书 v6.0
let o2 = {
  deptName: "科室",
  bedNumber: "床号",
  name: "患者姓名",
  gender: "性别",
  age: "年龄",
  admissionNumber: "住院号",
  diagnosis: "诊断",
  surgeryName: "手术名称",
  anesTypeName: "拟定麻醉方式", //新版未使用
  replaceanesTypeName: "替代麻醉方式", //新版未使用
  //拟定麻醉方式 多选框
  proposedAnesthesia1: "true/false",
  proposedAnesthesia2: "true/false",
  proposedAnesthesia3: "true/false",
  proposedAnesthesia4: "true/false",
  alternativeAnesthesia1: "true/false",
  alternativeAnesthesia2: "true/false",
  alternativeAnesthesia3: "true/false",
  alternativeAnesthesia4: "true/false",
  // 医生告知 一
  doctor1_0: "true/false",
  doctor1_1: "true/false",
  doctor1_2: "true/false",
  doctor1_3: "true/false",
  doctor1_4: "true/false",
  doctor1_5: "true/false",
  doctor1_6: "true/false",
  doctor1_7: "true/false",
  doctor1_8: "true/false",
  doctor1_9: "true/false",
  doctor1_10: "true/false",
  doctor1_other: "其他",
  // 医生告知 二
  doctor2_0: "true/false",
  doctor2_1: "true/false",
  doctor2_2: "true/false",
  doctor2_3: "true/false",
  doctor2_4: "true/false",
  doctor2_5: "true/false",
  doctor2_6: "true/false",
  doctor2_7: "true/false",
  doctor2_8: "true/false",
  doctor2_9: "true/false",
  doctor2_10: "true/false",
  doctor2_11: "true/false",
  // 医生告知 三
  doctor3_0: "true/false",
  doctor4_0: "true/false",
  doctor4_1: "true/false", // 三种药品 依顺序
  doctor4_2: "true/false",
  doctor4_3: "true/false",
  //明确同意
  toAnesthesia: "true/false", //三.1
  toAnesthesia_dis: "true/false",
  medicine1: "true/false", // 三种药品 依顺序
  medicine2: "true/false",
  medicine3: "true/false",
  toAnesthesia1: "true/false", // 三 .2
  toAnesthesia1_dis: "true/false",
  toAnesthesiaTwo: "true/false", // 三 .3
  toAnesthesiaTwo_dis: "true/false",
  //术后镇痛 是  否
  anaeHelp: "true/false",
  anaeHelp_dis: "true/false",
  //术后镇痛方式  静脉镇痛 连续硬膜外阻滞镇痛  连续外周神经阻滞镇痛
  painrelief_0: "true/false",
  painrelief_1: "true/false",
  painrelief_2: "true/false",
  doctorSignatureTime: "医师签字时间"
};
//无痛治疗知情同意书 v7.0
let o3 = {
  deptName: "科室",
  bedNumber: "床号",
  name: "患者姓名",
  gender: "性别",
  age: "年龄",
  admissionNumber: "住院号",
  diagnosis: "诊断",
  anesTypeName: "麻醉方法",
  // 医生告知 一
  doctor1_0: "true/false",
  doctor1_1: "true/false",
  doctor1_2: "true/false",
  doctor1_3: "true/false",
  doctor1_4: "true/false",
  doctor1_5: "true/false",
  doctor1_6: "true/false",
  doctor1_7: "true/false",
  doctor1_8: "true/false",
  doctor1_other: "其他",
  // 医生告知 二
  doctor2_0: "true/false",
  doctor2_1: "true/false",
  doctor2_2: "true/false",
  doctor2_3: "true/false",
  doctor2_4: "true/false",
  doctor2_5: "true/false",
  doctor2_6: "true/false",
  doctor2_7: "true/false",
  doctor2_8: "true/false",
  doctor2_9: "true/false",
  doctor2_10: "true/false",
  doctor2_11: "true/false",
  // 医生告知 三
  doctor3_0: "true/false",
  // 医生告知 四
  doctor4_0: "true/false",
  //本人已详细阅读以上告知内容 同意
  toAnesthesia: "true/false",
  toAnesthesia_dis: "true/false",
  // 药品
  useDrugs: "true/false",
  useDrugs_dis: "true/false",
  doctorSignatureTime: "医师签字时间"
};

//疼痛治疗知情同意书 v4.0
let o4 = {
  deptName: "科室",
  bedNumber: "床号",
  name: "患者姓名",
  gender: "性别",
  age: "年龄",
  admissionNumber: "住院号",
  diagnosis: "诊断",
  anesTypeName: "麻醉方法",
  replaceanesTypeName: "替代麻醉方法",
  doctor1_other: "其他",
  doctorSignatureTime: "医师签字时间"
};

//麻醉知情同意书（副本）v2.0
let o5 = {
  deptName: "科室",
  bedNumber: "床号",
  name: "患者姓名",
  gender: "性别",
  age: "年龄",
  admissionNumber: "住院号",
  diagnosis: "诊断",
  surgeryName: "手术名称",
  anesTypeName: "麻醉方式",
  replaceanesTypeName: "代替麻醉",
  // 医生告知 一
  doctor1_0: "true/false",
  doctor1_1: "true/false",
  doctor1_2: "true/false",
  doctor1_3: "true/false",
  doctor1_4: "true/false",
  doctor1_5: "true/false",
  doctor1_6: "true/false",
  doctor1_7: "true/false",
  doctor1_8: "true/false",
  doctor1_9: "true/false",
  doctor1_10: "true/false",
  doctor1_other: "其他",
  // 医生告知 二
  doctor2_0: "true/false",
  doctor2_1: "true/false",
  doctor2_2: "true/false",
  doctor2_3: "true/false",
  doctor2_4: "true/false",
  doctor2_5: "true/false",
  doctor2_6: "true/false",
  doctor2_7: "true/false",
  doctor2_8: "true/false",
  doctor2_9: "true/false",
  doctor2_10: "true/false",
  doctor2_11: "true/false",
  // 医生告知 三
  doctor3_0: "true/false",
  //我同意
  toAnesthesia: "true/false",
  toAnesthesia_dis: "true/false",
  // 用药
  useDrugs: "true/false",
  useDrugs_dis: "true/false",
  //术后镇痛 是  否
  anaeHelp: "true/false",
  anaeHelp_dis: "true/false",
  doctorSignatureTime: "医师签字时间"
};

//麻醉方式变更同意书 v1.0
let o6 = {
  deptName: "科室",
  bedNumber: "床号",
  name: "患者姓名",
  gender: "性别",
  age: "年龄",
  admissionNumber: "住院号",
  reason: "更改麻醉方式的理由",
  diagnosis: "诊断",
  surgeryName: "手术名称",
  oldAnesTypeName: "已实施麻醉方式",
  newAnesTypeName: "更改麻醉方式",
  agree: "同意", //ture false
  unagree: "不同意" //ture false
};
