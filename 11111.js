// 分娩镇痛麻醉知情同意书 v6.0 关键字说明：
let o = {
  deptName: "科室",
  bedNumber: "床号",
  name: "患者姓名",
  gender: "性别",
  age: "年龄",
  admissionNumber: "住院号",
  diagnosis: "诊断",
  // 医生告知 一  依次对应复选框 下面的值为选中状态  未选中为空字符串
  doctor1_0: "select1",
  doctor1_1: "select2",
  doctor1_2: "select3",
  doctor1_3: "select4",
  doctor1_4: "select5",
  doctor1_5: "select6",
  doctor1_6: "select7",
  doctor1_7: "select8",
  doctor1_8: "select9",
  doctor1_other: "其他",
  // 医生告知 二 依次:对应复选框 下面的值为选中状态  未选中为空字符串
  doctor2_0: "select1",
  doctor2_1: "select2",
  doctor2_2: "select3",
  doctor2_3: "select4",
  doctor2_4: "select5",
  doctor2_5: "select6",
  doctor2_6: "select7",
  doctor2_7: "select8",
  doctor2_8: "select9",
  doctor2_9: "select10",
  doctor2_10: "select11",
  doctor2_11: "select12",
  // 医生告知 三
  doctor3_0: "select1",
  //医生告知 四
  doctor4_0:"select1",
  //同意 接受分娩镇痛服务和使用麻醉药品、第一类精神药品
  toAnesthesia: "同意",
  //同意舒芬太尼，用于分娩镇痛 同意 -> 同意  不同意 ""
  toAnesthesia1:"同意",
  // 使用300以上耗材  -> 是  否
  useDrugs: "是"
};
// 麻醉知情同意书 v6.0 关键字说明：
let o1 = {
  deptName: "科室",
  bedNumber: "床号",
  name: "患者姓名",
  gender: "性别",
  age: "年龄",
  admissionNumber: "住院号",
  diagnosis: "诊断",
  surgeryName: "手术名称",
  anesTypeName: "拟定麻醉方式",//新版未使用
  replaceanesTypeName: "替代麻醉方式",//新版未使用
  //拟定麻醉方式 多选框  以下值为选中状态  未选中为空字符串
  proposedAnesthesia1: "全身麻醉",
  proposedAnesthesia2: "椎管内麻醉",
  proposedAnesthesia3: "神经阻滞麻醉",
  proposedAnesthesia4: "麻醉性监护",
  alternativeAnesthesia1: "全身麻醉",
  alternativeAnesthesia2: "椎管内麻醉",
  alternativeAnesthesia3: "神经阻滞麻醉",
  alternativeAnesthesia4: "麻醉性监护",
  // 医生告知 一  依次对应复选框 下面的值为选中状态  未选中为空字符串
  doctor1_0: "select1",
  doctor1_1: "select2",
  doctor1_2: "select3",
  doctor1_3: "select4",
  doctor1_4: "select5",
  doctor1_5: "select6",
  doctor1_6: "select7",
  doctor1_7: "select8",
  doctor1_8: "select9",
  doctor1_9: "select10",
  doctor1_10: "select11",
  doctor1_other: "其他",
  // 医生告知 二 依次:对应复选框 下面的值为选中状态  未选中为空字符串
  doctor2_0: "select1",
  doctor2_1: "select2",
  doctor2_2: "select3",
  doctor2_3: "select4",
  doctor2_4: "select5",
  doctor2_5: "select6",
  doctor2_6: "select7",
  doctor2_7: "select8",
  doctor2_8: "select9",
  doctor2_9: "select10",
  doctor2_10: "select11",
  doctor2_11: "select12",
  // 医生告知 三
  doctor3_0: "select1",
  //明确同意 ""
  toAnesthesia: "同意",
  // 药品 值为选中状态
  medicine1: "舒芬太尼",
  medicine2: "丙泊酚",
  medicine3: "右美托咪定",
  //麻醉中使用省、市公费医疗及医保报销范围以外（包含300元以上）的药物、耗材或器械
  //需使用（舒芬太尼丙泊酚右美托咪定）同意不同意
  toAnesthesia1: "同意",
  toAnesthesiaTwo: "同意",
  //术后镇痛 是  否
  anaeHelp: "是",
  //术后镇痛方式  静脉镇痛 连续硬膜外阻滞镇痛  连续外周神经阻滞镇痛
  painrelief: "静脉镇痛",
};
// 无痛治疗知情同意书 v7.0
let o2 = {
  deptName: "科室",
  bedNumber: "床号",
  name: "患者姓名",
  gender: "性别",
  age: "年龄",
  admissionNumber: "住院号",
  diagnosis: "诊断",
  anesTypeName: "麻醉方法",
  // 医生告知 一  依次对应复选框 下面的值为选中状态  未选中为空字符串
  doctor1_0: "select1",
  doctor1_1: "select2",
  doctor1_2: "select3",
  doctor1_3: "select4",
  doctor1_4: "select5",
  doctor1_5: "select6",
  doctor1_6: "select7",
  doctor1_7: "select8",
  doctor1_8: "select9",
  doctor1_other: "其他",
  // 医生告知 二 依次:对应复选框 下面的值为选中状态  未选中为空字符串
  doctor2_0: "select1",
  doctor2_1: "select2",
  doctor2_2: "select3",
  doctor2_3: "select4",
  doctor2_4: "select5",
  doctor2_5: "select6",
  doctor2_6: "select7",
  doctor2_7: "select8",
  doctor2_8: "select9",
  doctor2_9: "select10",
  doctor2_10: "select11",
  doctor2_11: "select12",
  // 医生告知 三
  doctor3_0: "select1",
  // 医生告知 四
  doctor4_0: "number4",
  //同意麻醉药品 同意 -> 同意  不同意 ""
  toAnesthesia: "同意",
  //300 以上 耗材知情同意  -> 是  否
  useDrugs: "是",
  doctorSignatureTime: "医师签字时间",
};
//疼痛治疗知情同意书 v4.0
let o3 = {
  deptName: "科室",
  bedNumber: "床号",
  name: "患者姓名",
  gender: "性别",
  age: "年龄",
  admissionNumber: "住院号",
  diagnosis: "诊断",
  anesTypeName: "麻醉方法",
  replaceanesTypeName: "替代麻醉方法",
  doctor1_other: "其他"
};
//麻醉知情同意书（副本）v2.0
let o4 = {
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
  // 医生告知 一  依次对应复选框 下面的值为选中状态  未选中为空字符串
  doctor1_0: "select1",
  doctor1_1: "select2",
  doctor1_2: "select3",
  doctor1_3: "select4",
  doctor1_4: "select5",
  doctor1_5: "select6",
  doctor1_6: "select7",
  doctor1_7: "select8",
  doctor1_8: "select9",
  doctor1_9: "select10",
  doctor1_10: "select11",
  doctor1_other: "其他",
  // 医生告知 二 依次:对应复选框 下面的值为选中状态  未选中为空字符串
  doctor2_0: "select1",
  doctor2_1: "select2",
  doctor2_2: "select3",
  doctor2_3: "select4",
  doctor2_4: "select5",
  doctor2_5: "select6",
  doctor2_6: "select7",
  doctor2_7: "select8",
  doctor2_8: "select9",
  doctor2_9: "select10",
  doctor2_10: "select11",
  doctor2_11: "select12",
  // 医生告知 三
  doctor3_0: "select1",
  //我同意  同意  不同意
  toAnesthesia: "同意",
  //术后镇痛 是  否
  anaeHelp: "是"
};
//麻醉方式变更同意书 v1.0
let o5 = {
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
  agree: "同意",//ture false
  unagree: "不同意"//ture false
};

2022-09-29 更新
1.更新文书版本

2.更新分娩镇痛关键字
{
  //同意舒芬太尼，用于分娩镇痛 同意 -> 同意  不同意 ""
  toAnesthesia1:"同意",
// 医生告知四 选中时的值
  doctor4_0: "select1,",
}
3.更新麻醉知情同意书关键字
{
  //同意舒芬太尼，用于分娩镇痛 同意 -> 同意  不同意 ""
  toAnesthesia1:"同意",
// 医生告知四 选中时的值
  doctor4_0: "select1,",
  medicine1: "舒芬太尼",
  medicine2: "丙泊酚",
  medicine3: "右美托咪定",
  //麻醉中使用省、市公费医疗及医保报销范围以外（包含300元以上）的药物、耗材或器械
  //需使用（舒芬太尼丙泊酚右美托咪定）同意不同意
  toAnesthesia1: "同意",
}

UPDATE sys_dict_document_type n SET n.EXTEND_ATTRIBUTE = CASE WHEN n.EXTEND_ATTRIBUTE IS NULL THEN
JSON_OBJECT('tNo','3376092312081134')
ELSE json_set(n.EXTEND_ATTRIBUTE,'$.tNo','3376092312081134')  END
WHERE n.CODE = '336964a77f6211e8b3eb60a44cce202b';

UPDATE sys_dict_document_type n SET n.EXTEND_ATTRIBUTE = CASE WHEN n.EXTEND_ATTRIBUTE IS NULL THEN
JSON_OBJECT('tNo','3376092115541216')
ELSE json_set(n.EXTEND_ATTRIBUTE,'$.tNo','3376092115541216')  END
WHERE n.CODE = 'ed6efdd49ad111e8823660a44cce202b';

UPDATE sys_dict_document_type n SET n.EXTEND_ATTRIBUTE = CASE WHEN n.EXTEND_ATTRIBUTE IS NULL THEN
JSON_OBJECT('tNo','3376092312223437')
ELSE json_set(n.EXTEND_ATTRIBUTE,'$.tNo','3376092312223437')  END
WHERE n.CODE = '5ed5a6409ef44aacbcb0b9992ef55268';

UPDATE sys_dict_document_type n SET n.EXTEND_ATTRIBUTE = CASE WHEN n.EXTEND_ATTRIBUTE IS NULL THEN
JSON_OBJECT('tNo','3376092311005978')
ELSE json_set(n.EXTEND_ATTRIBUTE,'$.tNo','3376092311005978')  END
WHERE n.CODE = '952b54049aaf11e8823660a44cce202b';

UPDATE sys_dict_document_type n SET n.EXTEND_ATTRIBUTE = CASE WHEN n.EXTEND_ATTRIBUTE IS NULL THEN
JSON_OBJECT('tNo','3376092312410251')
ELSE json_set(n.EXTEND_ATTRIBUTE,'$.tNo','3376092312410251')  END
WHERE n.CODE = '132907e4192111eda53e0242ac1c0004';

UPDATE sys_dict_document_type n SET n.EXTEND_ATTRIBUTE = CASE WHEN n.EXTEND_ATTRIBUTE IS NULL THEN
JSON_OBJECT('tNo','3376092313033872')
ELSE json_set(n.EXTEND_ATTRIBUTE,'$.tNo','3376092313033872')  END
WHERE n.CODE = '08130ca1238911ed9ac90242ac1c0004';

1.麻醉护士管理  复苏用时flag正确  数据错误
2.手术护士工作量分析列表页打开报错 后台500
3.手术护士文书提交情况接口报错 后台500
4.麻醉医生指标  麻醉护士指标 手术级别无法追溯  是否添加
5.手术管理指标  手术护士指标  急诊手术情况无法追溯 是否添加


DoctorManage106

OrDeptManage12
const DeptManage08 = (data, cardInfo, config) => {
  let total = "",
    options = null,
    style = null,
    legend = null,
  eventList = null;
  let chartData = data && data.value.items;
  if (chartData && chartData.length > 0) {
    total = data.value.total;
    style = {
      height: "105px",
      bottom: "-10px",
      paddingLeft: "100px"
    };
    legend = chartData.slice(0);
    options = getDefaultPipeOptions(chartData);
    eventList = [
      {
        eventName: "click",
        query: "series",
        context: null,
        handler: param => {
          let currentClickData = param.data;
          //let flag = currentClickData.name.replace(/级/g, "");
          showEchartExtWin(cardInfo, config, {
            subName: currentClickData.name,
            condition: {
              flag: currentClickData.name
            }
          });
        }
      }
    ];
  }
  return {
    total,
    style,
    options,
    legend,
    eventList
  };
};
姓名:张欢
电话:17643015536
楼栋：4栋1单元2101
身份证：220122199905013128
来源地址 ：河南省安阳市文峰区宝莲镇平原路
回小区时间:2022-11-03
申请回小区


赵蕊 15337174557 411425199707060662
刘贤金 18727109727 42032219970824331X
张欢 17643015536 220122199905013128
罗朋朋 18039570207 410222199905304575
张天雨 19939925172 220822198802237333
