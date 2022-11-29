const DoctorManage102 = (data, cardInfo, config) => {
  let total = "",
    options = null,
    legend = null,
    eventList = null;
  let chartData = data && data.value;
  if (chartData && chartData.items.length > 0) {
    total = data.value.total;
    options = getDefaultBarOptions(chartData.items);
    legend = [
      {
        name: "已完成",
        value: data.value.doneTotal
      },
      {
        name: "进行中",
        value: data.value.undoneTotal
      }
    ];
    eventList = [
      {
        eventName: "click",
        query: "series",
        context: null,
        handler: param => {
          let currentClickData = param.data;
          showEchartExtWin(cardInfo, config, {
            subName: currentClickData.name,
            condition: {
              flag: null,
              deptId: currentClickData.deptId
            }
          });
        }
      }
    ];
  }
  return {
    total,
    style: null,
    options,
    legend,
    eventList
  };
};

麻醉管理指标  麻醉人员情况  总数追溯数据错误(数据为空)


items.push(
  CommonComp.getUserCombo(
    me.userInfo,
    {
      name: "checkDoctor",
      fieldLabel: feeUserName ? feeUserName : "开单医生",
      allowBlank: false,
      width: 258,
      emptyText: feeUserName ? feeUserName : "开单医生"
    },
    "anesDoctorAndNurse"
  )
);
