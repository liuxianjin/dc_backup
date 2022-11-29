CommonComp.getSurgeryRoomCombo(me.win.userInfo, {
  width: 180,
  hidden: true,
  fieldLabel: me.win.prefix === "anes" || "anesDoctor" ? "麻醉科" : "手术室",
  extraParamsType: me.win.prefix === "anes" || "anesDoctor" ? "anes" : null //anes代表麻醉数据
})
