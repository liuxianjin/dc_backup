function share() {
  if (step == "fcircuitNurse" || step == "equmentNurse") {
    if (!requiredFlag) {
      return;
    }
    if (me.signMap[step].length >= 4) {
      AimsUtils.alert("最多允许四个巡回护士签名！", 3);
      return;
    }
  }
  me.signMap[step].length >= 1 && AimsUtils.alert("最多允许一个护士签名！", 3);
}

if (key == "bloodType") {
  let multivalueCompObj = me.opeNurseRecordComp.contentInfo.commonContent[me.idPrefix + "-multivaluecomp"].multivalueCompObj;
  let temp = multivalueCompObj["bloodType"];
  temp.removeAllRec(temp);
  me.data.data.content.patientInfo.bloodType = "";
} else {
  me.data.data.content.intraoperative[key];
}
