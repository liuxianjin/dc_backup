<template>
  <div id="paper" :class="idPrefix" v-if="documentReady">
    <div class="documentWrapper" style="width: 1020px;height: 377mm;text-align: left;position: relative;">
        <div class="document-modal" v-if="disabled"></div>
        <div class="documentPaper">
            <div class="hospital-logo">
                <img :src="logo" />
            </div>
            <div class="documentHeader">
                <span>手术护理记录单</span>
            </div>
            <div class="documentBody noborder inputClass signBase9 ">
                <p class="documentTreeselect">
                    <span class="customh3">姓名:</span>
                    <input type="text" v-model="data.data.content.patientInfo.name" readonly="true" class="commonInput" style="width:130px; font-size:15px;">
                    <span class="customh3">性别:</span>
                    <input type="text" v-model="data.data.content.patientInfo.gender" readonly="true" class="commonInput" style="width:20px;font-size:15px;">
                    <span class="customh3">年龄:</span>
                    <input type="text" v-model="data.data.content.patientInfo.age" readonly="true" class="commonInput" style="width:140px;font-size:15px;">
                    <span class="customh3">病区:</span>
                    <input type="text" v-model="data.data.content.patientInfo.deptName" readonly="true" class="commonInput" style="width:300px;font-size:15px;">
                    <span class="customh3">床号:</span>
                    <input type="text" v-model="data.data.content.patientInfo.bedNumber" readonly="true" class="commonInput" style="width:125px;font-size:15px;">
                    <span class="customh3">住院号:</span>
                    <input type="text" v-model="data.data.content.patientInfo.admissionNumber" readonly="true" class="commonInput" style="width:125px;font-size:15px;">
                    <span class="customh3">手术日期:</span>
                    <el-date-picker class="inputClass" style="width:150px;font-size:15px;" v-model="data.data.content.patientInfo.surgeryDate" :clearable="true" format="yyyy-MM-dd" :readonly="disabled" value-format="yyyy-MM-dd" :editable="false" type="datetime"></el-date-picker>
                </p>
                <div>
                    <p class="customh3">一、基本信息：</p>
                    <p style="justify-content:flex-start;">
                        <span>1、手术间</span>
                        <input type="text" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.patientInfo.roomName" style="width:100px;padding: 0px;">
                        <label style="margin-left: 0px;">
                            <span>择期手术</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.patientInfo.isEmergency" true-value="择期手术" false-value="">
                        </label>
                        <label style="margin-left: 30px;">
                            <span>急诊手术</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.patientInfo.isEmergency" true-value="急诊手术" false-value="">
                        </label>
                    </p>
                    <p>
                        <span class="surgeryEntryTime timeHover" style="width: 285px;">2、患者入室时间
                        <el-date-picker class="inputClass" style="width:150px;" :readonly="surgeryEntryTimeValue == '1'" @change="surgeryTime" v-model="data.data.content.basicInformation.surgeryEntryTime" :clearable="false" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                        <lancet-tooltip class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
                            <div slot="options">
                              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshTime('1')">
                                  <span class="right-tooltip" style="width: 160px;">从麻醉单提取入室时间</span>
                              </i>
                              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteTime">
                                  <span class="right-tooltip" style="width: 50px;">删除</span>
                              </i>
                            </div>
                        </lancet-tooltip>
                        </span>
                        <span class="surgeryBeginTime timeHover" style="width: 255px;">手术开始时间
                        <el-date-picker class="inputClass" style="width:145px;" :readonly="surgeryBeginTimeValue == '1'" @change="surgeryTime1" v-model="data.data.content.basicInformation.surgeryBeginTime" :clearable="false" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                        <lancet-tooltip class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
                            <div slot="options">
                              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshTime('2')">
                                  <span class="right-tooltip" style="width: 190px;">从麻醉单提取手术开始时间</span>
                              </i>
                              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteTime1">
                                  <span class="right-tooltip" style="width: 50px;">删除</span>
                              </i>
                            </div>
                        </lancet-tooltip>
                        </span>
                        <span class="surgeryEndTime timeHover" style="width: 255px;">手术结束时间
                        <el-date-picker  class="inputClass" style="width:145px;" :readonly="surgeryEndTimeValue == '1'" @change="surgeryTime2" v-model="data.data.content.basicInformation.surgeryEndTime" :clearable="false" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                        <lancet-tooltip class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
                            <div slot="options">
                              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshTime('3')">
                                  <span class="right-tooltip" style="width: 190px;">从麻醉单提取手术结束时间</span>
                              </i>
                              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteTime2">
                                  <span class="right-tooltip" style="width: 50px;">删除</span>
                              </i>
                            </div>
                        </lancet-tooltip>
                        </span>
                        <span class="surgeryLeaveTime timeHover" style="width: 225px;">离室时间
                        <el-date-picker  class="inputClass" style="width:151px;" :readonly="surgeryLeaveTimeValue == '1'" @change="surgeryTime3" v-model="data.data.content.basicInformation.surgeryLeaveTime" :clearable="false" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                        <lancet-tooltip class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
                            <div slot="options">
                              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshTime('4')">
                                  <span class="right-tooltip" style="width: 160px;">从麻醉单提取离室时间</span>
                              </i>
                              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteTime3">
                                  <span class="right-tooltip" style="width: 50px;">删除</span>
                              </i>
                            </div>
                        </lancet-tooltip>
                        </span>
                    </p>
                    <p >
                      <span>3、入室时意识情况：</span>
                       <label>
                            <span>清醒</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.awareness" true-value="清醒" false-value="">
                        </label>
                        <label>
                            <span>浅昏迷</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.awareness" true-value="浅昏迷" false-value="">
                        </label>
                        <label>
                            <span>深昏迷</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.awareness" true-value="深昏迷" false-value="">
                        </label>
                           <label>
                            <span>其他</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.awareness" true-value="其他" false-value="">
                        </label>
                         :<input type="text"  @blur="changgeno('')" :readonly="data.data.content.basicInformation.awareness!='其他'||disabled" v-model="data.data.content.basicInformation.awarenessText" style="width:60%;">

                    </p>
                    <p>
                      <span>4、术前抗生素：</span>
                      <label>
                            <span>否</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.antibiotics" true-value="否" false-value="">
                        </label>
                           <label>
                            <span>是</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.antibiotics" true-value="是" false-value="">
                        </label>
                         :<input type="text"  @blur="changgeno('')" :readonly="data.data.content.basicInformation.antibiotics!='是'||disabled" v-model="data.data.content.basicInformation.antibioticsText" style="width:80%;">

                    </p>
                    <p style="justify-content:flex-start;display:flex;margin-bottom:0px;">
                        <span>5、麻醉方式：</span>
                        <span :id="idPrefix+'-anesTypeName'" class="ASAfont" style="width: 59%;flex-shrink: 1;"></span>
                        <!-- <span>麻醉医生：</span> -->
                        <!-- <input type="text" class="commonInput" v-model="data.data.content.sign.aneDoctor" style="width:220px;"> -->
                        <div class="userColumn" style="line-height: 32px;width: 300px;float: right;margin-top: -29px;">
                          <div>
                            <span class="aneDoctor">麻醉医生：</span>
                          </div>
                          <div class="sign aneDoctorName">
                              <i class="fa fa-key signIcon" @click="showSignWin('麻醉医生','aneDoctor','aneDoctor')"></i>
                              <input type="text" class="signInput" readonly v-model="data.data.content.sign.aneDoctor">
                          </div>
                        </div>
                        <!-- <label>
                            <span>局部麻醉</span>
                            <input type="checkbox" @change="anaesthesia" :disabled="disabled" v-model="data.data.content.basicInformation.anaesthesia" true-value="局部麻醉" false-value="">
                        </label>
                        <label>
                            <span>神经阻滞麻醉</span>
                            <input type="checkbox" @change="anaesthesia" :disabled="disabled" v-model="data.data.content.basicInformation.anaesthesia" true-value="神经阻滞麻醉" false-value="">
                        </label>
                        <label>
                            <span>椎管内麻醉</span>
                            <input type="checkbox" @change="anaesthesia" :disabled="disabled" v-model="data.data.content.basicInformation.anaesthesia" true-value="椎管内麻醉" false-value="">
                        </label>
                        <label>
                            <span>全身麻醉</span>
                            <input type="checkbox" @change="anaesthesia" :disabled="disabled" v-model="data.data.content.basicInformation.anaesthesia" true-value="全身麻醉" false-value="">
                        </label>
                        <span style="margin-left:10px;">其他</span>
                        <input type="text"  @blur="changgeno('')" :readonly="disabled" v-model="data.data.content.basicInformation.anaesthesiaText" style="width:450px;"> -->
                    </p>
                    <p>
                        <span>6、手术方式：</span>
                        <span :id="idPrefix+'-operationName'" class="ASAfont" style="width: 89%;"></span>
                    </p>
                    <p style="justify-content:flex-start;display:flex;">
                        <span class="surgeryDoctorName">手术医生：</span>
                        <!-- <input type="text" class="commonInput" v-model="data.data.content.sign.surgeryDoctor" style="width:330px;"> -->
                        <div :id="idPrefix+'-surgeryDoctor'" style="width: 200px;flex: 1; margin-top: -30px;margin-left: 89px;"></div>
                    </p>
                    <div>
                      <!-- <div class="userColumn" style="line-height: 32px;width:315px">
                        <div>
                            <span class="surgeryDoctor">手术医生：</span>
                        </div>
                        <div class="sign surgeryDoctorName">
                            <i class="fa fa-key signIcon" @click="showSignWin('手术医生','surgeryDoctor','surgeryDoctor')"></i>
                            <input type="text" class="signInput" readonly v-model="data.data.content.sign.surgeryDoctor">
                        </div>
                      </div> -->
                      <div class="userColumn" style="line-height: 32px;width:665px">
                        <div>
                            <span class="washNurse">洗手护士：</span>
                        </div>
                        <div class="sign washNurseName">
                            <i class="fa fa-key signIcon" @click="showSignWin('洗手护士','surgeryNurse','washNurse')"></i>
                            <input type="text" class="signInput" readonly v-model="data.data.content.sign.washNurse">
                        </div>
                        <div>
                            <span class="takeWashNurse">接班洗手护士：</span>
                        </div>
                        <div class="sign takeWashNurseName">
                            <i class="fa fa-key signIcon" @click="showSignWin('接班洗手护士','surgeryNurse','takeWashNurse')"></i>
                            <input type="text" class="signInput" readonly v-model="data.data.content.sign.fcircuitNurse2">
                        </div>
                      </div>
                      <div class="userColumn" style="line-height: 32px;width:665px">
                        <div>
                            <span class="tourNurse">巡回护士：</span>
                        </div>
                        <div class="sign tourNurseName">
                            <i class="fa fa-key signIcon" @click="showSignWin('巡回护士','surgeryNurse','tourNurse')"></i>
                            <input type="text" class="signInput" readonly v-model="data.data.content.sign.fcircuitNurse">
                        </div>
                        <div>
                            <span class="takeTourNurse">接班巡回护士：</span>
                        </div>
                        <div class="sign takeTourNurseName">
                            <i class="fa fa-key signIcon" @click="showSignWin('接班巡回护士','surgeryNurse','takeTourNurse')"></i>
                            <input type="text" class="signInput" readonly v-model="data.data.content.sign.fcircuitNurse2">
                        </div>
                      </div>
                    </div>
                    <p class="customh3">二、术中情况：</p>
                    <p>
                      <span>1、手术体位：</span>
                       <label>
                            <span>仰卧位</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.position1" true-value="仰卧位" false-value="">
                        </label>
                        <label>
                            <span>右侧卧位</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.position2" true-value="右侧卧位" false-value="">
                        </label>
                        <label>
                            <span>左侧卧位</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.position3" true-value="左侧卧位" false-value="">
                        </label>
                           <label>
                            <span>俯卧位</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.position4" true-value="俯卧位" false-value="">
                        </label>
                           <label>
                            <span>截石位</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.position5" true-value="截石位" false-value="">
                        </label>
                           <label>
                            <span>甲状腺体位</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.position6" true-value="甲状腺体位" false-value="">
                        </label>
                          <label>
                            <span>其他</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.position7" true-value="其他" false-value="">
                        </label>
                         ：<input type="text"  @blur="changgeno('')" :readonly="data.data.content.basicInformation.position7!='其他'||disabled" v-model="data.data.content.basicInformation.positionText" style="width:60%;">

                    </p>
                      <p>
                      <span>2、皮肤消毒：</span>
                       <label>
                            <span>2%碘酊</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.skinDisinfection1" true-value="2%碘酊" false-value="">
                        </label>
                        <label>
                            <span>75%酒精</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.skinDisinfection2" true-value="75%酒精" false-value="">
                        </label>
                        <label>
                            <span>安尔碘Ⅲ型</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.skinDisinfection3" true-value="安尔碘Ⅲ型" false-value="">
                        </label>
                           <label>
                            <span>其他</span>
                            <input type="checkbox"  :disabled="disabled" v-model="data.data.content.basicInformation.skinDisinfection4" true-value="其他" false-value="">
                        </label>

                         ：<input type="text"  @blur="changgeno('')" :readonly="data.data.content.basicInformation.skinDisinfection4!='其他'||disabled" v-model="data.data.content.basicInformation.skinDisinfectionText" style="width:60%;">

                    </p>
                    <p>
                      <span class="infusion timeHover" style="width: 100%">3、术中输液量：
                        <textarea @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.infusion" style="width:884px" :style="{fontSize:infusionFont,height:infusionHeight}" class="commonInput"></textarea>
                        <lancet-tooltip class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
                          <div slot="options">
                            <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="syncAnesRecordChecked('infusion')">
                                <span class="right-tooltip" style="width: 160px;">从麻醉单提取入量合计</span>
                            </i>
                            <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteBloodInfusion('infusion');">
                                <span class="right-tooltip" style="width: 50px;">删除</span>
                            </i>
                          </div>
                        </lancet-tooltip>
                      </span>；
                    </p>
                    <!-- <p style="justify-content: normal;"> -->
                        <!--<span>4、血型</span>
                        <span :id="idPrefix+'-bloodType'" class="ASAfont" style="width: 15%;"></span> -->


                        <!-- <span>血浆：</span>
                        <input type="text" @change="changgeno('')" :readonly="data.data.content.intraoperative.BloodTransfusion !='有' || disabled" v-model="data.data.content.intraoperative.plasma" style="width:24.7%">；
                        <br>
                        <span>冷沉淀：</span>
                        <input type="text" @change="changgeno('')" :readonly="data.data.content.intraoperative.BloodTransfusion !='有' || disabled" v-model="data.data.content.intraoperative.precipitate" style="width:20%">； -->
                    <!-- </p> -->
                    <p>
                      <span>4、输血：</span>
                      <label>
                        <span>无</span>
                        <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.BloodTransfusion" true-value="无" false-value="">
                      </label>
                      <label>
                          <span>有</span>
                          <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.BloodTransfusion" true-value="有" false-value="">；
                      </label>
                      <!-- 红细胞： -->
                      <span class="Cells timeHover">
                        <input type="text" @change="changgeno('')" :readonly="data.data.content.intraoperative.BloodTransfusion !='有' || disabled" v-model="data.data.content.intraoperative.Cells" style="width:829px" :style="data.data.content.intraoperative.Cells.length>47 ? 'font-size:12px;' : ''">；
                        <lancet-tooltip class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
                          <div slot="options">
                            <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshBloodInfusion('Cells')">
                                <span class="right-tooltip" style="width: 160px;">从麻醉单提取入量合计</span>
                            </i>
                            <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteBloodInfusion('Cells');">
                                <span class="right-tooltip" style="width: 50px;">删除</span>
                            </i>
                          </div>
                        </lancet-tooltip>
                      </span>
                    </p>
                    <p style="position: relative;">
                        <span>5、有无输液、输血反应：</span>
                        <label>
                          <span>无</span>
                          <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.transfusionReaction" true-value="无" false-value="">
                        </label>
                        <label>
                            <span>有</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.transfusionReaction" true-value="有" false-value="">
                        </label>
                        <input type="text" @change="changgeno('')" :readonly="data.data.content.intraoperative.transfusionReaction !='有' || disabled" v-model="data.data.content.intraoperative.otherReaction" style="width:728px">
                        <span style="position: absolute;right: -15px">；</span>
                    </p>
                    <p>
                        <span class="timeHover hemorrhage">6、出血量
                          <input type="text" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.hemorrhage" style="width:420px">
                          <lancet-tooltip class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
                            <div slot="options">
                              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshBloodInfusion('hemorrhage')">
                                  <span class="right-tooltip" style="width: 160px;">从麻醉单提取出量合计</span>
                              </i>
                              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteBloodInfusion('hemorrhage');">
                                  <span class="right-tooltip" style="width: 50px;">删除</span>
                              </i>
                            </div>
                          </lancet-tooltip>
                        </span>
                        <span>ml；</span>
                        <span class="timeHover urineOther">其他
                          <input type="text" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.urineOther" style="width:420px">
                          <lancet-tooltip class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
                            <div slot="options">
                              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshBloodInfusion('urineOther')">
                                  <span class="right-tooltip" style="width: 160px;">从麻醉单提取出量合计</span>
                              </i>
                              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteBloodInfusion('urineOther');">
                                  <span class="right-tooltip" style="width: 50px;">删除</span>
                              </i>
                            </div>
                          </lancet-tooltip>
                        </span>
                        <span>ml；</span>
                    </p>
                    <p style="justify-content:flex-start;">
                        <span class="ureter">7、尿管：</span>
                        <label>
                            <span>无</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.ureter" true-value="无" false-value="">
                        </label>
                        <label>
                            <span>有</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.ureter" true-value="有" false-value="">；
                        </label>
                        <span class="timeHover ureternub">术中尿量
                          <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.ureter !='有' || disabled" v-model="data.data.content.intraoperative.ureternub" style="width:200px;">
                          <lancet-tooltip class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
                            <div slot="options">
                              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshBloodInfusion('ureternub')">
                                  <span class="right-tooltip" style="width: 160px;">从麻醉单提取尿量合计</span>
                              </i>
                              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteBloodInfusion('ureternub');">
                                  <span class="right-tooltip" style="width: 50px;">删除</span>
                              </i>
                            </div>
                          </lancet-tooltip>
                        </span>
                        <span>ml;</span>
                    </p>
                    <p>
                        <label>
                            <span>8、引流：</span>
                            <span>无</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.drainage" true-value="无" false-value="">
                        </label>
                        <label>
                            <span>有</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.drainage" true-value="有" false-value="">；
                        </label>
                        <label>
                            <span>胶管</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.drainageContent" false-value="">
                        </label>
                        <label>
                            <span>负压引流</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.drainageContent1" false-value="">
                        </label>
                        <label>
                            <span>胸腔引流管</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.drainageContent2" false-value="">
                        </label>
                        <label>
                            <span>T型管</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.drainageContent3" false-value="">
                        </label>
                        <span style="margin-left:10px;">其他</span>
                        <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.drainageText" style="width:100%">
                    </p>
                    <p>
                        <span style="margin-left: 25px;">部位：</span>
                        <input type="text" @change="changgeno('')" :readonly="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.Position" style="width:100%">
                    </p>
                    <div class="marginBottom">
                        <span>9、胃管：</span>
                        <label>
                            <span>无</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.tube" true-value="无" false-value="">
                        </label>
                        <label>
                            <span>有</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.tube" true-value="有" false-value="">；
                        </label>
                        <label>
                            <span>术前留置</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.tube !='有' || disabled" v-model="data.data.content.intraoperative.tubeOther" true-value="术前留置" false-value="">
                        </label>
                        <label>
                            <span>术中留置</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.tube !='有' || disabled" v-model="data.data.content.intraoperative.tubeOther" true-value="术中留置" false-value="">；
                        </label>
                        <!-- <span class="operationRoom1">手术医生确认签名:</span>
                        <input type="text" @change="changgeno('')" :readonly="disabled" v-model="data.data.content.postoperatively.operationRoom1" style="width:48.9%"> -->
                        <!-- <div class="userColumn" style="margin-top: -3px;float: right;width: 50%;">
                            <div>
                                <span class="operationRoom1">手术医生确认签名:</span>
                            </div>
                            <div class="sign operationRoom1Name">
                                <i class="fa fa-key signIcon" @click="showSignWin('手术医生','surgeryDoctor','operationRoom1','手术室')"></i>
                                <input type="text" class="signInput" readonly v-model="data.data.content.postoperatively.operationRoom1">
                            </div>
                        </div> -->
                    </div>
                    <div class="marginBottom">
                        <span>10、体内填塞物品：</span>
                        <label>
                            <span>无</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.invivo" true-value="无" false-value="">
                        </label>
                        <label>
                            <span>有</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.invivo" true-value="有" false-value="">；
                        </label>
                        <span>名称</span>
                        <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.invivo !='有' || disabled" v-model="data.data.content.intraoperative.invivoName" style="width:200px">
                        <span>数目</span>
                        <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.invivo !='有' || disabled" v-model="data.data.content.intraoperative.invivoNum" style="width:190px">
                        <span>部位</span>
                        <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.invivo !='有' || disabled" v-model="data.data.content.intraoperative.invivoPosition" style="width:237px">
                        <!-- <span class="operationRoom1">手术医生确认签名:</span>
                        <input type="text" @change="changgeno('')" :readonly="disabled" v-model="data.data.content.postoperatively.recovery" style="width:26%"> -->
                        <!-- <div class="userColumn" style="margin-top: -3px;float: right;width: 40%;">
                            <div>
                                <span class="recovery">手术医生确认签名:</span>
                            </div>
                            <div class="sign recoveryName">
                                <i class="fa fa-key signIcon" @click="showSignWin('手术医生','surgeryDoctor','recovery')"></i>
                                <input type="text" class="signInput" readonly v-model="data.data.content.postoperatively.recovery">
                            </div>
                        </div> -->
                    </div>
                    <p style="justify-content: normal;">
                        <span>11、标本：</span>
                        <label>
                            <span>无</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.specimen" true-value="无" false-value="">
                        </label>
                        <label>
                            <span>有</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.specimen" true-value="有" false-value="">
                        </label>：
                        <label>
                            <span>已送</span>
                            <input type="checkbox" true-value="已送" @change="changgeno('')" :disabled="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.sendMsg" false-value="">
                        </label>
                        <label>
                            <span>不需要</span>
                            <input type="checkbox" true-value="不需要" @change="changgeno('')" :disabled="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.sendMsg" false-value="">
                        </label>；（
                        培养标本
                        <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.sendMsg1" style="width:95px;">个；
                        石蜡切片
                        <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.sendMsg2" style="width:95px;">个；
                        <span>术中冰冻切片：</span>
                        <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.sendEndother" style="width:100px">个
                        <!-- <label>
                            <span>无</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.frozenSection" true-value="无" false-value="">
                        </label>
                        <label>
                            <span>有</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.frozenSection" true-value="有" false-value="">；
                        </label> -->
                    </p>
                    <p style="justify-content: normal;">
                        <span style="margin-left: 35px;">其他</span>
                        <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.sendMsg3" style="width:100px;">个
                        <!-- <label>
                            <span>已送</span>
                            <input type="checkbox" true-value="已送" @change="changgeno('')" :disabled="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.sendEnd" false-value="">
                        </label>） -->
                    </p>
                    <!-- <div class="marginBottom"> -->
                        <!-- <label>
                            <span style="margin-left:25px;">培养管</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.specimenContent3" false-value="">
                        </label>
                        <input type="text" @blur="changgeno('')" :readonly="!data.data.content.intraoperative.specimenContent3 || disabled" v-model="data.data.content.intraoperative.specimenContent3Other" style="width:180px">
                            份；
                        <span>其他</span>
                        <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.specimenText" style="width:655px"> -->
                        <!-- <span class="operationRoom1">手术医生确认签名:</span>
                        <input type="text" @change="changgeno('')" :readonly="disabled" v-model="data.data.content.postoperatively.instrumentNurse" style="width:26%"> -->
                        <!-- <div class="userColumn" style="margin-top: -3px;float: right;width: 40%;">
                            <div>
                                <span class="instrumentNurse">手术医生确认签名:</span>
                            </div>
                            <div class="sign instrumentNurseName">
                                <i class="fa fa-key signIcon" @click="showSignWin('手术医生','surgeryDoctor','instrumentNurse')"></i>
                                <input type="text" class="signInput" readonly v-model="data.data.content.postoperatively.instrumentNurse">
                            </div>
                        </div> -->
                    <!-- </div> -->
                    <div class="marginBottom">
                        <label>
                            <span>12、植入物：</span>
                            <span>无</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.implantation" true-value="无" false-value="">
                        </label>
                        <label>
                            <span>有</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.implantation" true-value="有" false-value="">
                        </label>
                        <span>(详见：
                            <!-- <label>
                              手术物品清点记录单
                                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.implantation !='有' || disabled" v-model="data.data.content.intraoperative.clearPoint" true-value="手术物品清点记录单" false-value="">,
                            </label> -->
                            <label>
                              植入记录表
                                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.implantation !='有' || disabled" v-model="data.data.content.intraoperative.record" true-value="植入记录表" false-value="">)；
                            </label>
                        </span>
                        生物检测结果：
                        <label>
                            <span>合格</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.qualified" true-value="合格" false-value="">
                        </label>
                    </div>
                    <p>
                      <span>13、使用电刀：</span>
                      <label>
                            <span>否</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.electricKnife" true-value="否" false-value="">
                        </label>
                        <label>
                            <span>是</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.electricKnife" true-value="是" false-value="">
                        </label>
                            ，电极片放置位置：<input type="text" @blur="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.electricKnifeText" style="width:60%">

                    </p>
                    <div class="marginBottom">
                        <span>14、使用充气式止血带：</span>
                        <label>
                            <span>无</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.hemostasis" true-value="无" false-value="">

                        </label>
                        <span>有</span>
                        <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.hemostasis" true-value="有" false-value="">
                        <span>（部位：
                            <label>
                              左上肢
                                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.upper" true-value="左上肢" false-value="">，
                            </label>
                            <label>
                              右上肢
                                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.rightupper" true-value="右上肢" false-value="">，
                            </label>
                            <label>
                              左下肢
                                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.lower" true-value="左下肢" false-value="">，
                            </label>
                            <label>
                              右下肢
                                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.rightlower" true-value="右下肢" false-value="">）；
                            </label>
                        </span>
                    </div>
                    <p>
                        <span style="margin-left:25px;">止血带压力</span>
                        <input type="text" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.tourniquet" style="width:100%">
                        <span> (KPa)；使用时间</span>
                        <el-date-picker  class="inputClass" style="width:100%" :readonly="disabled" v-model="data.data.content.intraoperative.tourniquetTime" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                        <span style="width: 30px; text-align: center;">至</span>
                        <el-date-picker  class="inputClass" style="width:100%" :readonly="disabled" v-model="data.data.content.intraoperative.tourniquetEndTime" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                    </p>
                    <p>
                        <span style="margin-left:25px;">止血带压力</span>
                        <input type="text" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.tourniquet1" style="width:100%">
                        <span> (KPa)；使用时间</span>
                        <el-date-picker class="inputClass" style="width:100%" :readonly="disabled" v-model="data.data.content.intraoperative.tourniquetTime1" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                        <span style="width: 30px; text-align: center;">至</span>
                        <el-date-picker  class="inputClass" style="width:100%" :readonly="disabled" v-model="data.data.content.intraoperative.tourniquetEndTime1" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                    </p>
                    <p>
                        <span style="margin-left:25px;">止血带压力</span>
                        <input type="text" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.tourniquet2" style="width:100%">
                        <span> (KPa)；使用时间</span>
                        <el-date-picker  class="inputClass" style="width:100%" :readonly="disabled" v-model="data.data.content.intraoperative.tourniquetTime2" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                        <span style="width: 30px; text-align: center;">至</span>
                        <el-date-picker  class="inputClass" style="width:100%" :readonly="disabled" v-model="data.data.content.intraoperative.tourniquetEndTime2" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                    </p>
                    <p>
                        <span style="margin-left:25px;">止血带压力</span>
                        <input type="text" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.tourniquet3" style="width:100%">
                        <span> (KPa)；使用时间</span>
                        <el-date-picker class="inputClass" style="width:100%" :readonly="disabled" v-model="data.data.content.intraoperative.tourniquetTime3" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                        <span style="width: 30px; text-align: center;">至</span>
                        <el-date-picker  class="inputClass" style="width:100%" :readonly="disabled" v-model="data.data.content.intraoperative.tourniquetEndTime3" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                    </p>
                    <p>
                        <span>15、全身皮肤情况 </span>
                        <label style="margin-left:10px;">
                          手术前：
                            <span>完好</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.beforeSkin" true-value="完好" false-value="">
                        </label>
                        <label>
                            <span>异常</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.beforeSkin" true-value="异常" false-value="">
                        </label>
                        <span style="margin-left:10px;">皮肤异常描述：</span>
                        <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.beforeSkin !='异常' || disabled" v-model="data.data.content.intraoperative.beforeSkinText" style="width:100%;">
                     <label style="margin-left:10px;">
                          手术结束：
                            <span>完好</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.afterSkin" true-value="完好" false-value="">
                        </label>
                        <label>
                            <span>异常</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.afterSkin" true-value="异常" false-value="">
                        </label>
                        <span style="margin-left:10px;">皮肤异常描述：</span>
                        <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.afterSkin !='异常' || disabled" v-model="data.data.content.intraoperative.afterSkinText" style="width:100%;">

                    </p>
                    <p style="justify-content: normal;">
                        <span>16、敷料、器械核对数目是否相符： </span>
                        <label style="margin-left:10px;">
                            <span>是</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.dressing" true-value="是" false-value="">
                        </label>
                        <label>
                            <span>否</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.dressing" true-value="否" false-value="">
                        </label>
                        <span style="margin-left:30px">术中X线照影： </span>
                        <label style="margin-left:10px;">
                            <span>否</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.photosX" true-value="否" false-value="">
                        </label>
                        <label>
                            <span>是</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.photosX" true-value="是" false-value="">
                        </label>
                    </p>
                    <p class="flexible" style="align-items:flex-start;position: relative;">
                        <span>17、术中特殊记录：</span>

                    </p>
                    <p class="flexible" style="align-items:flex-start;position: relative;">
                        <textarea rows="2" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.special" class="commonInput" style="width: 100%;height:107px;line-height:37px;z-index: 1;margin-top: -6px;overflow:hidden;"></textarea>
                        <ul style="position: absolute;width:calc(100%);right: 0;z-index: 0;margin-top: -10px;">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </p>
                    <p>
                      <span>18、术毕去向</span>
                      <label>
                          <span>病房</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.whereabouts" true-value="病房" false-value="">
                        </label>
                        <label>
                            <span>复苏室</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.whereabouts" true-value="复苏室" false-value="">
                        </label>
                           <label>
                          <span>ICU</span>
                            <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.whereabouts" true-value="ICU" false-value="">
                        </label>
                        <span style="margin-left:20px;width:660px;">
                          带出病房物品：<input type="text" :readonly="disabled" v-model="data.data.content.intraoperative.bringOutItems" style="width:21%;">
                          液体量：<input type="text" :readonly="disabled" v-model="data.data.content.intraoperative.liquidValue" style="width:18%;">ml
                           血量：<input type="text" :readonly="disabled" v-model="data.data.content.intraoperative.bloodValue" style="width:17%;">ml
                        </span>
                    </p>
                    <p>
                      <span>术后交接：</span>
                    </p>
                    <div class="userColumn" style="line-height: 32px;">
                      <div>
                          <span class="fcircuitNurse">巡回护士：</span>
                      </div>
                      <div class="sign fcircuitNurseName">
                          <i class="fa fa-key signIcon" @click="showSignWin('手术护士','surgeryNurse','fcircuitNurse')"></i>
                          <input type="text" class="signInput" readonly v-model="data.data.content.sign.fcircuitNurse">
                      </div>
                      <div>
                          <span class="fcircuitNurse2">复苏室或病房交接护士签名：</span>
                      </div>
                      <div class="sign fcircuitNurse2Name">
                          <i class="fa fa-key signIcon" @click="showSignWin('手术护士','surgeryNurse','fcircuitNurse2')"></i>
                          <input type="text" class="signInput" readonly v-model="data.data.content.sign.fcircuitNurse2">
                      </div>
                      <span>交接时间：</span>
                      <el-date-picker class="inputClass" style="width:160px;line-height:32px;" :readonly="disabled" v-model="data.data.content.sign.fcircuitNurseTime" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import documentLogo from "portal/lib/documentlogo.js";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import mixinStatus from "src/portal/lib/mixin-save-status.js";
import "../../../../../../../static/lib/common/Content";
import OpeNurseRecord from "./OpeNurseRecord";
import LancetTooltip from "portal/components/form/LancetTooltip";
export default {
  name: "init-cantent",
  mixins: [mixinStatus, documentLogo],
  data() {
    return {
      data: {},
      id: null,
      needPatientInfo: true,
      disabled: true,
      mustFill:[],
      typeCode: "4dc8122a96f44c20ab46bc1f86fe98da",
      oldData: {},
      titleTip: "手术护理记录单",
      options4: [],
      value9: [],
      list: [],
      loading: false,
      states: [],
      icdSurgerys: [],
      value: null,
      // 配置要绑定多值组件的元素
      multivalueConfig: [],
      idPrefix: "nurse-nursingrecords"+'_'+Math.uuid.v1().replace(/-/g, ""),
      focus: {
        skin: false,
        drugs: false,
        submitStatus: null,
        specimen: false,
        FallingRisk: false,
        DVTrisk: false,
        damage: false,
        riskAssessment: false,
        anaesthesia: false,
        drainage: false,
        bloodProducts: false,
        roomName: false,
        infusion: false,
        bloodType: false,
        precipitate: false,
        Platelet: false,
        OtherBloodType: false,
        hemorrhage: false,
        urine: false,
        urineOther: false,
        Cells: false,
        plasma: false,
        tourniquet1: false,
        tourniquet: false,
        specialC: false,
        bloodProducts5: false,
        bloodProducts4: false,
        bloodProducts3: false,
        bloodProducts2: false,
        handover: false,
        Position1: false
      },
      userInfo: {
        orDeptId: null,
        hospitalId: this.hospitalId
      },
      surgeryEntryTimeValue: null,
      surgeryBeginTimeValue: null,
      surgeryEndTimeValue: null,
      surgeryLeaveTimeValue: null,
      surgeryEntryTime: null,
      surgeryBeginTime: null,
      surgeryEndTime: null,
      surgeryLeaveTime: null,
      surgeryTimeDate:{},
      timer:null,
      timer1:null,
      timer2:null,
      timer3:null,
      infusionFont:'',
      infusionHeight:'',
      signMap: {
        aneDoctor: [],//麻醉医生
        washNurse:[],// 洗手护士
        takeWashNurse:[],// 接班洗手护士
        tourNurse:[],// 巡回护士
        takeTourNurse:[],// 接班巡回护士
        fcircuitNurse:[],// 巡回护士
        fcircuitNurse2:[],// 复苏室或病房交接护士签名
      },
    };
  },
  props: {
    res: {
      type: Object,
      default: null
    },
    params: {
      type: Object,
      default: null
    },
    hospitalId: {
      type: String,
      default: null
    },
    isOnly: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    data: {
      handler: function(val, oldval) {
        var content = val.data.content;
        if (content.intraoperative.transfusionReaction != "有") {
          content.intraoperative.otherReaction = ""
        }
        if(content.intraoperative.infusion.length>48 && content.intraoperative.infusion.length<86) {
          this.infusionFont = '12px';
          this.infusionHeight = '25px';
        }else if (content.intraoperative.infusion.length>86) {
          this.infusionFont = '12px';
          this.infusionHeight = '34px';
        }else {
          this.infusionFont = '17px';
          this.infusionHeight = '25px';
        }
        if (content.basicInformation.anaesthesiaText) {
          content.basicInformation.anaesthesia = "";
        }
        // if (content.intraoperative.frozenSection !='有') {
        //   content.intraoperative.sendEndother =''
        //   content.intraoperative.sendEnd =''
        // }
        if (content.intraoperative.specimen !='有') {
          content.intraoperative.sendMsg =''
          content.intraoperative.sendMsg1 =''
          content.intraoperative.sendMsg2 =''
          content.intraoperative.sendMsg3 =''
          content.intraoperative.sendEndother = ''
          // content.intraoperative.sendEnd =''
        }
        if (content.surgeryRisk.damage != "有") {
          content.surgeryRisk.damageContent = "";
          content.surgeryRisk.damageContent1 = "";
          content.surgeryRisk.damageContent2 = "";
          content.surgeryRisk.damageText = "";
        }
        if (content.surgeryRisk.FallingRisk != "有") {
          content.surgeryRisk.FallingRiskContent = "";
          content.surgeryRisk.FallingRiskContent1 = "";
          content.surgeryRisk.FallingRiskContent2 = "";
          content.surgeryRisk.FallingRiskText = "";
        }
        if (content.intraoperative.specimen != "有") {
          content.intraoperative.specimenContent = "";
          content.intraoperative.specimenContent1 = "";
          content.intraoperative.specimenContent2 = "";
          content.intraoperative.specimenContent3 = "";
          content.intraoperative.specimenText = "";
        }
        if (!content.intraoperative.specimenContent) {
          content.intraoperative.specimenContentOther = "";
        }
        if (!content.intraoperative.specimenContent1) {
          content.intraoperative.specimenContent1Other = "";
        }
        if (!content.intraoperative.specimenContent2) {
          content.intraoperative.specimenContent2Other = "";
        }
        if (!content.intraoperative.specimenContent3) {
          content.intraoperative.specimenContent3Other = "";
        }

        if (content.postoperatively.drugs != "有") {
          content.postoperatively.drugsText = "";
        }
        if (content.intraoperative.BloodTransfusion != "有") {
          content.intraoperative.Cells = "";
          content.intraoperative.plasma = "";
          content.intraoperative.precipitate = "";
          content.intraoperative.Platelet = "";
          content.intraoperative.OtherBloodType = "";
        }
        if (content.intraoperative.drainage != "有") {
          content.intraoperative.drainageContent = "";
          content.intraoperative.drainageContent1 = "";
          content.intraoperative.drainageContent2 = "";
          content.intraoperative.drainageContent3 = "";
          content.intraoperative.drainageText = "";
          content.intraoperative.Position = "";
        }
        if (content.intraoperative.implantation != "有") {
          // content.intraoperative.clearPoint = "";
          content.intraoperative.record = "";
        }
        if (content.intraoperative.hemostasis != "有") {
          content.intraoperative.upper = "";
          content.intraoperative.rightupper = "";
          content.intraoperative.lower = "";
          content.intraoperative.rightlower = "";
        }
        if (content.postoperatively.bloodProducts != "有") {
          content.postoperatively.bloodProducts1 = "";
          content.postoperatively.bloodProducts2 = "";
          content.postoperatively.bloodProducts3 = "";
          content.postoperatively.bloodProducts4 = "";
          content.postoperatively.bloodProducts5 = "";
        }

        if (content.intraoperative.ureter != "有") {
          content.intraoperative.ureternub = "";
        }

        if (content.intraoperative.tube != "有") {
          content.intraoperative.tubeOther = "";
        }
        if (content.intraoperative.invivo != "有") {
          content.intraoperative.invivoName = "";
          if (content.intraoperative.invivoNum) {
            content.intraoperative.invivoNum = "";
          }
          content.intraoperative.invivoPosition = "";
        }
        if (content.intraoperative.temperature != "有") {
          content.intraoperative.facility1 = "";
          content.intraoperative.facility2 = "";
          content.intraoperative.facility3 = "";
          content.intraoperative.facilityText = "";
        }
        if (content.intraoperative.afterSkin !='异常') {
          content.intraoperative.afterSkinText = "";
        }
         if (content.intraoperative.beforeSkin !='异常') {
          content.intraoperative.beforeSkinText = "";
        }
          if (content.basicInformation.position1!='其他') {
          content.basicInformation.positionText = "";
        }
        if (content.basicInformation.skinDisinfection4!='其他') {
          content.basicInformation.skinDisinfectionText = "";
        }
         if (content.basicInformation.antibiotics!='是') {
          content.basicInformation.antibioticsText = "";
        }
        if (content.basicInformation.awareness!='其他') {
          content.basicInformation.awarenessText = "";
        }

        let CaSignInfo = ["instrumentNurse", "operationRoom1", "recovery", "fcircuitNurse","fcircuitNurse2","aneDoctor","surgeryDoctor","washNurse","takeWashNurse","tourNurse","takeTourNurse"];
        let CaSignInfoCopy = JSON.parse(JSON.stringify(CaSignInfo));
        // 清除多余DOM
        // TODO
        let removeDomArr = [' .aneDoctorimg', ' .washNurseimg', ' .takeWashNurseimg', ' .tourNurseimg', ' .takeTourNurseimg', ' .fcircuitNurseimg', ' .fcircuitNurse2img']
        removeDomArr.forEach(item =>{
          if ($('.' + this.idPrefix + item).length > 0) {
            $('.' + this.idPrefix + item).remove()
          }
        })
        // 更新签名数组
        if (val.data.signatureList && val.data.signatureList.length > 0) {
          // 清空签名数组
          this.resetSignMap();
           // 初始化签名数组
          val.data.signatureList.forEach((k) => {
            this.signMap[k.signLabelName].push(k)
          });
          // 更改dom
          this.appendDom(this.signMap['aneDoctor']);
          this.appendDom(this.signMap["washNurse"]);
          this.appendDom(this.signMap["takeWashNurse"]);
          this.appendDom(this.signMap["tourNurse"]);
          this.appendDom(this.signMap["takeTourNurse"]);
          this.appendDom(this.signMap["fcircuitNurse"]);
          this.appendDom(this.signMap["fcircuitNurse2"]);
        } else {
          for (let i = 0; i < CaSignInfo.length; i++) {
            if ($('.' + this.idPrefix + ' .' + CaSignInfo[i] + 'img').length > 0) {
              $('.' + this.idPrefix + ' .' + CaSignInfo[i] + 'img').remove();
            }
          }
          this.resetSignMap();
        }
        // 检查必填项
        this.checkRequired(val, this.mustFill, false);

        this.deleteSign();
      },
      deep: true
    }
  },
  components: {
    Treeselect: Treeselect,
    "lancet-tooltip": LancetTooltip
  },
  created() {
    let me = this;
    // 组件创建时 绑定 eventBus on事件
    me.opeNurseRecordComp = new OpeNurseRecord({
      vueNode: me
    }).init();

  },
  directives: {
    focus: {
      update: function(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  },
  methods: {
    resetSignMap(){
      this.signMap["aneDoctor"] = [];
      this.signMap["washNurse"] = [];
      this.signMap["takeWashNurse"] = [];
      this.signMap["tourNurse"] = [];
      this.signMap["takeTourNurse"] = [];
      this.signMap["fcircuitNurse"] = [];
      this.signMap["fcircuitNurse2"] = [];
    },
    appendDom(SignArr){
      let i = 0;
      SignArr.forEach((o) => {
        if (o.signLabelName) {
          if (o.signature) {
            let dom = '<span class="' + o.signLabelName + 'img delImg"' + 'style="left: ' + i + 'px"><img class=signImgAneDoctor src="' + o.signature + '" /><i class="fa fa-remove delViceAneDoctor" data-userid=' + o.signerId + " data-usertype=" + o.signLabelName + "></i></span>";
            $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
            i += 70;
          } else {
            let dom = `<span class="${o.signLabelName}img delDoctorOuter" style="left:${i}px">${o.name}<i class="fa fa-remove delViceAneDoctor" data-userid=${o.signerId} data-usertype=${o.signLabelName}></i></span>`;
            $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
            i += 70;
          }
        }
      });
    },
    deleteTime(property){
        let me = this;
        if (me.submitStatus == '1') return
        me.data.data.content.basicInformation.surgeryEntryTime = null;
        me.surgeryTime(me.data.data.content.basicInformation.surgeryEntryTime);
    },
    deleteTime1(){
        let me = this;
        if (me.submitStatus == '1') return
        me.data.data.content.basicInformation.surgeryBeginTime = null;
        me.surgeryTime1(me.data.data.content.basicInformation.surgeryBeginTime);
    },
    deleteTime2(){
        let me = this;
        if (me.submitStatus == '1') return
        me.data.data.content.basicInformation.surgeryEndTime = null;
        me.surgeryTime2(me.data.data.content.basicInformation.surgeryEndTime);
    },
    deleteTime3(){
        let me = this;
        if (me.submitStatus == '1') return
        me.data.data.content.basicInformation.surgeryLeaveTime = null;
        me.surgeryTime3(me.data.data.content.basicInformation.surgeryLeaveTime);
    },
    getData(res) {
      this.opeNurseRecordComp.getData(res);
    },
    refreshTime(key){
        let me = this;
        if (me.submitStatus == '1') return
          axios
            .get(
              "anesthesia/record/special/event/" + me.conifgContent.PATIENT_ID,
              {}
            )
            .then(res => {
              let data = res.data.data;
              for (let i = 0; i < data.length; i++) {
                if (data[i].eventName == "入手术间" && key == 1) {
                  if (me.surgeryEntryTimeValue == "1" || me.surgeryEntryTimeValue == "3" || me.surgeryEntryTimeValue == "4") {
                    if (data[i].eventTime) {
                        data[i].eventTime = me.switchTimeFormat(data[i].eventTime)
                    }
                    me.data.data.content.basicInformation.surgeryEntryTime =
                      data[i].eventTime;
                    me.surgeryEntryTime = data[i].eventTime;
                  }
                } else {
                  me.surgeryEntryTime =
                    me.data.data.content.basicInformation.surgeryEntryTime;
                }

                if (data[i].eventName == "手术开始" && key == 2) {
                  if (me.surgeryBeginTimeValue == "1" ||  me.surgeryBeginTimeValue == "3" || me.surgeryBeginTimeValue == "4") {
                    if (data[i].eventTime) {
                        data[i].eventTime = me.switchTimeFormat(data[i].eventTime)
                    }
                    me.data.data.content.basicInformation.surgeryBeginTime =
                      data[i].eventTime;
                    me.surgeryBeginTime = data[i].eventTime;
                  }
                } else {
                  me.surgeryBeginTime =
                    me.data.data.content.basicInformation.surgeryBeginTime;
                }

                if (data[i].eventName == "手术结束" && key == 3) {
                  if (me.surgeryEndTimeValue == "1" ||  me.surgeryEndTimeValue == "3" || me.surgeryEndTimeValue == "4") {
                    if (data[i].eventTime) {
                        data[i].eventTime = me.switchTimeFormat(data[i].eventTime)
                    }
                    me.data.data.content.basicInformation.surgeryEndTime =
                      data[i].eventTime;
                    me.surgeryEndTime = data[i].eventTime;
                  }
                } else {
                  me.surgeryEndTime =
                    me.data.data.content.basicInformation.surgeryEndTime;
                }

                if (data[i].eventName == "出手术间" && key == 4) {
                  if (me.surgeryLeaveTimeValue == "1" || me.surgeryLeaveTimeValue == "3" || me.surgeryLeaveTimeValue == "4") {
                    if (data[i].eventTime) {
                        data[i].eventTime = me.switchTimeFormat(data[i].eventTime)
                    }
                    me.data.data.content.basicInformation.surgeryLeaveTime =
                      data[i].eventTime;
                    me.surgeryLeaveTime = data[i].eventTime;
                  }
                } else {
                  me.surgeryLeaveTime =
                    me.data.data.content.basicInformation.surgeryLeaveTime;
                }
              }
            })
            .catch(error => {});
    },
    initData() {
      let me = this;
      if (me.res) {
        if (me.res.id) {
          me.disabled = false;
          axios
            .get("patient/patient/document/template", {
              params: {
                id: me.res.id
              }
            })
            .then(res => {
              res.data.data.content.patientInfo =
                me.data.data.content.patientInfo;
                let anesTypeName = me.data.data.content.anaesthesia.anesTypeName;
                let surgeryDoctor = me.data.data.content.sign.surgeryDoctor;
              res.data.data.content.basicInformation =
                me.data.data.content.basicInformation;
              me.data.data.content = res.data.data.content;
              me.data.data.content.anaesthesia.anesTypeName = anesTypeName;
              me.data.data.content.sign.surgeryDoctor = surgeryDoctor;
              me.opeNurseRecordComp.contentInfo.initData({
                operationName: me.data.data.content.anaesthesia.operationName,
                anesTypeName: me.data.data.content.anaesthesia.anesTypeName,
                bloodType: me.data.data.content.patientInfo.bloodType,
                surgeryDoctor: me.data.data.content.sign.surgeryDoctor
              });
            })
            .catch(error => {});
        } else {
          me.conifgContent = me.res;
          me.opeNurseRecordComp.getData(me.res);
        }
      }else if (this.params) {
        let res = {
          PATIENT_ID: this.params.patientId
        };
        res = Object.assign(res, this.params);
        if (!res.multiVersion) {
          if (!this.params.typeCode || this.isOnly) {
            this.isShow = true;
          }
        }
        me.conifgContent = res;
        if (me.noSchema) {
            me.getDocumentSchema(function(){
                me.opeNurseRecordComp.getData(res);
            })
        }else {
            me.opeNurseRecordComp.getData(res);
        }

      } else {
        setTimeout(function() {
          if (!me.opeNurseRecordComp.isSelectItem)
              me.opeNurseRecordComp.contentInfo.initData();
        }, 500);

      }
    },
    anaesthesia() {
      let me = this;
      if (me.data.data.content.basicInformation.anaesthesia) {
        me.data.data.content.basicInformation.anaesthesiaText = "";
      }
    },
    anaesthesiaText() {
      let me = this;
      if (me.data.data.content.basicInformation.anaesthesiaText) {
        me.data.data.content.basicInformation.anaesthesia = "";
      }
    },

    switchTimeFormat(time) {
      let me = this;
      const dateTime = new Date(time);
      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1;
      const date = dateTime.getDate();
      const hour = dateTime.getHours();
      const minute = dateTime.getMinutes();
      const second = dateTime.getSeconds();
      let timeContent =
        year +
        "-" +
        me.addZero(month) +
        "-" +
        me.addZero(date) +
        " " +
        me.addZero(hour) +
        ":" +
        me.addZero(minute);
      return timeContent;
    },
    addZero(v) {
      return v < 10 ? "0" + v : v;
    },
    surgeryTime(key) {
      let me = this;
      let content = me.data.data.content;
      if (me.surgeryEntryTimeValue == "2" || me.surgeryEntryTimeValue == "3" || me.surgeryEntryTimeValue == "4") {
        if (content.basicInformation.surgeryBeginTime && key) {
          if (
            new Date(key).getTime() >
            new Date(content.basicInformation.surgeryBeginTime).getTime()
          ) {
            AimsUtils.alert("患者入室时间不能大于手术开始时间", 3);
            content.basicInformation.surgeryEntryTime = me.surgeryEntryTime;
            return;
          }
        }
        if (content.basicInformation.surgeryEndTime && key) {
          if (
            new Date(key).getTime() >
            new Date(content.basicInformation.surgeryEndTime).getTime()
          ) {
            AimsUtils.alert("患者入室时间不能大于手术结束时间", 3);
            content.basicInformation.surgeryEntryTime = me.surgeryEntryTime;
            return;
          }
        }
        if (content.basicInformation.surgeryLeaveTime && key) {
          if (
            new Date(key).getTime() >
            new Date(content.basicInformation.surgeryLeaveTime).getTime()
          ) {
            AimsUtils.alert("患者入室时间不能大于患者出室时间", 3);
            content.basicInformation.surgeryEntryTime = me.surgeryEntryTime;
            return;
          }
        }
        axios
          .get(
            "anesthesia/record/special/event/" + me.conifgContent.PATIENT_ID,
            {}
          )
          .then(res => {
            let data = res.data.data;
            let time = null;
            let uptime = null;
            for (let i = 0; i < data.length; i++) {
              if (data[i].eventName == "入手术间") {
                time = data[i].eventTime;
              }
              if (data[i].eventName == "准备出手术间") {
                uptime = data[i].eventTime;
              }
            }
            if (time) {
              if (new Date(key).getTime() == new Date(time).getTime()) {
                //可以开始运转
                me.surgeryEntryTime = key;
                if (!me.surgeryTimeDate['surgeryEntryTime']) {
                    me.surgeryTimeDate['surgeryEntryTime'] = true;
                }
              } else {
                if (me.surgeryEntryTimeValue == "2") {
                  let remark = null;
                      //可以开始运转
                  if(uptime){
                    content.basicInformation.surgeryEntryTime =
                    me.surgeryEntryTime;
                    AimsUtils.alert("麻醉记录单已经出室，禁止修改关键时间点！", 3);
                    return;
                  }
                  AimsUtils.alert("麻醉记录单入室时间与护理记录单不符，请通知麻醉医生修改入室时间！", 3);
                  me.surgeryEntryTime = key;
                  if (!me.surgeryTimeDate['surgeryEntryTime']) {
                        me.surgeryTimeDate['surgeryEntryTime'] = true;
                    }
                } else if (me.surgeryEntryTimeValue == "3") {
                  let remark = null;
                  if (key) {
                    remark = '当前患者入室时间需要共同协商，护理患者入室时间：' + key + '，麻醉患者入室时间：' + me.switchTimeFormat(time) + '，两者时间不一致'
                  } else {
                    remark = '当前患者入室时间需要共同协商，护理患者入室时间：' + '空' + '，麻醉患者入室时间：' + me.switchTimeFormat(time) + '，两者时间不一致'
                  }
                  // content.basicInformation.surgeryEntryTime =
                  //   me.surgeryEntryTime;
                  AimsUtils.alert(remark, 3);
                  // if (!me.surgeryTimeDate['surgeryEntryTime']) {
                  //       me.surgeryTimeDate['surgeryEntryTime'] = true;
                  //   }
                }else if (me.surgeryEntryTimeValue == "4") {
                    me.surgeryEntryTime = key;
                    if (!me.surgeryTimeDate['surgeryEntryTime']) {
                        me.surgeryTimeDate['surgeryEntryTime'] = true;
                    }
                }
              }
            } else {
              //可以开始运转
              me.surgeryEntryTime = key;
              if (!me.surgeryTimeDate['surgeryEntryTime']) {
                  me.surgeryTimeDate['surgeryEntryTime'] = true;
              }
            }
          })
          .catch(error => {});
      }
    },
    surgeryTime1(key) {
      let me = this;
      let content = me.data.data.content;
      if (me.surgeryBeginTimeValue == "2" || me.surgeryBeginTimeValue == "3" || me.surgeryBeginTimeValue == "4") {
        if (content.basicInformation.surgeryEntryTime && key) {
          if (
            new Date(key).getTime() <
            new Date(content.basicInformation.surgeryEntryTime).getTime()
          ) {
            AimsUtils.alert("手术开始时间不能小于患者入室时间", 3);
            content.basicInformation.surgeryBeginTime = me.surgeryBeginTime;
            return;
          }
        }
        if (content.basicInformation.surgeryEndTime && key) {
          if (
            new Date(key).getTime() >
            new Date(content.basicInformation.surgeryEndTime).getTime()
          ) {
            AimsUtils.alert("手术开始时间不能大于手术结束时间", 3);
            content.basicInformation.surgeryBeginTime = me.surgeryBeginTime;
            return;
          }
        }
        if (content.basicInformation.surgeryLeaveTime && key) {
          if (
            new Date(key).getTime() >
            new Date(content.basicInformation.surgeryLeaveTime).getTime()
          ) {
            AimsUtils.alert("手术开始时间不能大于患者出室时间", 3);
            content.basicInformation.surgeryBeginTime = me.surgeryBeginTime;
            return;
          }
        }
        axios
          .get(
            "anesthesia/record/special/event/" + me.conifgContent.PATIENT_ID,
            {}
          )
          .then(res => {
            let data = res.data.data;
            let time = null;
            let uptime = null;
            for (let i = 0; i < data.length; i++) {
              if (data[i].eventName == "手术开始") {
                time = data[i].eventTime;
              }
              if (data[i].eventName == "准备出手术间") {
                uptime = data[i].eventTime;
              }
            }
            if (time) {
              if (new Date(key).getTime() == new Date(time).getTime()) {
                //可以开始保存
                me.surgeryBeginTime = key;
                if (!me.surgeryTimeDate['surgeryBeginTime']) {
                  me.surgeryTimeDate['surgeryBeginTime'] = true;
                }
              } else {
                if (me.surgeryBeginTimeValue == "2") {
                  if(uptime){
                    content.basicInformation.surgeryBeginTime =
                    me.surgeryBeginTime;
                    AimsUtils.alert("麻醉记录单已经出室，禁止修改关键时间点！", 3);
                    return;
                  }
                  let remark = null;
                  //可以开始保存
                  AimsUtils.alert("麻醉记录单手术开始与护理记录单不符，请通知麻醉医生修改手术开始时间！", 3);
                  me.surgeryBeginTime = key;
                  if (!me.surgeryTimeDate['surgeryBeginTime']) {
                    me.surgeryTimeDate['surgeryBeginTime'] = true;
                  }
                } else if (me.surgeryBeginTimeValue == "3") {
                  let remark = null;
                  if (key) {
                    remark = '当前手术开始时间需要共同协商，护理手术开始时间：' + key + '，麻醉手术开始时间：' + me.switchTimeFormat(time) + '，两者时间不一致'
                  } else {
                    remark = '当前手术开始时间需要共同协商，护理手术开始时间：' + '空' + '，麻醉手术开始时间：' + me.switchTimeFormat(time) + '，两者时间不一致'
                  }
                  // content.basicInformation.surgeryBeginTime =
                  //   me.surgeryBeginTime;
                  AimsUtils.alert(remark, 3);
                  // if (!me.surgeryTimeDate['surgeryBeginTime']) {
                  //     me.surgeryTimeDate['surgeryBeginTime'] = true;
                  //   }
                }else if (me.surgeryBeginTimeValue == "4") {
                    me.surgeryBeginTime = key;
                    if (!me.surgeryTimeDate['surgeryBeginTime']) {
                      me.surgeryTimeDate['surgeryBeginTime'] = true;
                    }
                }
              }
            } else {
              //可以开始保存
              me.surgeryBeginTime = key;
              if (!me.surgeryTimeDate['surgeryBeginTime']) {
                me.surgeryTimeDate['surgeryBeginTime'] = true;
              }
            }
          })
          .catch(error => {});
      }
    },
    surgeryTime2(key) {
      let me = this;
      let content = me.data.data.content;
      if (me.surgeryEndTimeValue == "2" || me.surgeryEndTimeValue == "3" || me.surgeryEndTimeValue == "4") {
        if (content.basicInformation.surgeryEntryTime && key) {
          if (
            new Date(key).getTime() <
            new Date(content.basicInformation.surgeryEntryTime).getTime()
          ) {
            AimsUtils.alert("手术结束时间不能小于患者入室时间", 3);
            content.basicInformation.surgeryEndTime = me.surgeryEndTime;
            return;
          }
        }
        if (content.basicInformation.surgeryBeginTime && key) {
          if (
            new Date(key).getTime() <
            new Date(content.basicInformation.surgeryBeginTime).getTime()
          ) {
            AimsUtils.alert("手术结束时间不能小于手术开始时间", 3);
            content.basicInformation.surgeryEndTime = me.surgeryEndTime;
            return;
          }
        }
        if (content.basicInformation.surgeryLeaveTime && key) {
          if (
            new Date(key).getTime() >
            new Date(content.basicInformation.surgeryLeaveTime).getTime()
          ) {
            AimsUtils.alert("手术结束时间不能大于患者出室时间", 3);
            content.basicInformation.surgeryEndTime = me.surgeryEndTime;
            return;
          }
        }
        axios
          .get(
            "anesthesia/record/special/event/" + me.conifgContent.PATIENT_ID,
            {}
          )
          .then(res => {
            let data = res.data.data;
            let time = null;
            let uptime = null;
            for (let i = 0; i < data.length; i++) {
              if (data[i].eventName == "手术结束") {
                time = data[i].eventTime;
              }
              if (data[i].eventName == "准备出手术间") {
                uptime = data[i].eventTime;
              }
            }
            if (time) {
              if (new Date(key).getTime() == new Date(time).getTime()) {
                //可以开始保存
                me.surgeryEndTime = key;
                if (!me.surgeryTimeDate['surgeryEndTime']) {
                  me.surgeryTimeDate['surgeryEndTime'] = true;
                }
              } else {
                if (me.surgeryEndTimeValue == "2") {
                  if(uptime){
                    content.basicInformation.surgeryEndTime = me.surgeryEndTime;
                    AimsUtils.alert("麻醉记录单已经出室，禁止修改关键时间点！", 3);
                    return;
                  }
                  let remark = null;
                  AimsUtils.alert("麻醉记录单手术结束与护理记录单不符，请通知麻醉医生修改手术结束时间！", 3);
                  //可以开始保存
                  me.surgeryEndTime = key;
                  if (!me.surgeryTimeDate['surgeryEndTime']) {
                    me.surgeryTimeDate['surgeryEndTime'] = true;
                  }
                } else if (me.surgeryEndTimeValue == "3") {
                  let remark = null;
                  if (key) {
                    remark = '当前手术结束时间需要共同协商，护理手术结束时间：' + key + '，麻醉手术结束时间：' + me.switchTimeFormat(time) + '，两者时间不一致'
                  } else {
                    remark = '当前手术结束时间需要共同协商，护理手术结束时间：' + '空' + '，麻醉手术结束时间：' + me.switchTimeFormat(time) + '，两者时间不一致'
                  }
                  // content.basicInformation.surgeryEndTime = me.surgeryEndTime;
                  AimsUtils.alert(remark, 3);
                  // if (!me.surgeryTimeDate['surgeryEndTime']) {
                  //     me.surgeryTimeDate['surgeryEndTime'] = true;
                  //   }
                }else if (me.surgeryEndTimeValue == "4") {
                    me.surgeryEndTime = key;
                    if (!me.surgeryTimeDate['surgeryEndTime']) {
                      me.surgeryTimeDate['surgeryEndTime'] = true;
                    }
                }
              }
            } else {
              //可以开始保存
              me.surgeryEndTime = key;
              if (!me.surgeryTimeDate['surgeryEndTime']) {
                me.surgeryTimeDate['surgeryEndTime'] = true;
              }
            }
          })
          .catch(error => {});
      }
    },
    surgeryTime3(key) {
      let me = this;
      let content = me.data.data.content;
      if (me.surgeryLeaveTimeValue == "2" || me.surgeryLeaveTimeValue == "3" || me.surgeryLeaveTimeValue == "4") {
        if (content.basicInformation.surgeryEndTime && key) {
          if (
            new Date(key).getTime() <
            new Date(content.basicInformation.surgeryEndTime).getTime()
          ) {
            AimsUtils.alert("患者出室时间不能小于手术结束时间", 3);
            content.basicInformation.surgeryLeaveTime = me.surgeryLeaveTime;
            return;
          }
        }
        if (content.basicInformation.surgeryBeginTime && key) {
          if (
            new Date(key).getTime() <
            new Date(content.basicInformation.surgeryBeginTime).getTime()
          ) {
            AimsUtils.alert("患者出室时间不能小于手术开始时间", 3);
            content.basicInformation.surgeryLeaveTime = me.surgeryLeaveTime;
            return;
          }
        }
        if (content.basicInformation.surgeryEntryTime && key) {
          if (
            new Date(key).getTime() <
            new Date(content.basicInformation.surgeryEntryTime).getTime()
          ) {
            AimsUtils.alert("患者出室时间不能小于患者入室时间", 3);
            content.basicInformation.surgeryLeaveTime = me.surgeryLeaveTime;
            return;
          }
        }
        axios
          .get(
            "anesthesia/record/special/event/" + me.conifgContent.PATIENT_ID,
            {}
          )
          .then(res => {
            let data = res.data.data;
            let time = '';
            for (let i = 0; i < data.length; i++) {
              if (data[i].eventName == "准备出手术间"){
                time = data[i].eventTime;
              }
            }
            if (time) {
              if (new Date(key).getTime() == new Date(time).getTime()) {
                //可以开始运转
                me.surgeryLeaveTime = key;
                if (!me.surgeryTimeDate['surgeryLeaveTime']) {
                  me.surgeryTimeDate['surgeryLeaveTime'] = true;
                }
              } else {
                if (me.surgeryLeaveTimeValue == "2") {
                  let remark = null;
                  if(time){
                    content.basicInformation.surgeryLeaveTime =
                    me.surgeryLeaveTime;
                    AimsUtils.alert("麻醉记录单已经出室，禁止修改关键时间点！", 3);
                    return;
                  }
                  AimsUtils.alert("麻醉记录单出手术间与护理记录单不符，请通知麻醉医生修改出手术间时间！", 3);
                  me.surgeryLeaveTime = key;
                  if (!me.surgeryTimeDate['surgeryLeaveTime']) {
                    me.surgeryTimeDate['surgeryLeaveTime'] = true;
                  }
                } else if (me.surgeryLeaveTimeValue == "3") {
                  let remark = null;
                  if (key) {
                    remark = '当前出室时间需要共同协商，护理患者出室时间：' + key + '，麻醉患者出室时间：' + me.switchTimeFormat(time) + '，两者时间不一致'
                  } else {
                    remark = '当前出室时间需要共同协商，护理患者出室时间：' + '空' + '，麻醉患者出室时间：' + me.switchTimeFormat(time) + '，两者时间不一致'
                  }
                  // content.basicInformation.surgeryLeaveTime =
                  //   me.surgeryLeaveTime;
                  AimsUtils.alert(remark, 3);
                  // if (!me.surgeryTimeDate['surgeryLeaveTime']) {
                  //     me.surgeryTimeDate['surgeryLeaveTime'] = true;
                  //   }
                }else if (me.surgeryLeaveTimeValue == "4") {
                    me.surgeryLeaveTime = key;
                    if (new Date(key).getTime() < new Date(time).getTime()) {
                        let remark = '在护理单中出手术间时间：' + key + ' 早于准备出手术间时间：' + me.switchTimeFormat(time) + '，请联系麻醉医生修改！'
                        AimsUtils.alert(remark, 3);
                    }
                    if (!me.surgeryTimeDate['surgeryLeaveTime']) {
                      me.surgeryTimeDate['surgeryLeaveTime'] = true;
                    }
                }
              }
            } else {
              //可以开始运转
              me.surgeryLeaveTime = key;
              if (!me.surgeryTimeDate['surgeryLeaveTime']) {
                me.surgeryTimeDate['surgeryLeaveTime'] = true;
              }
            }
          })
          .catch(error => {});
      }
    },
    saveDoc(key) {
      let me = this;
      if (me.submitStatus != "1") {
        let data = me.data.data;
        data.typeCode = "4dc8122a96f44c20ab46bc1f86fe98da";
        data.patientId = this.conifgContent.PATIENT_ID;
        data.orDeptId = this.conifgContent.SURGERYROOM_ID;
        let res = JSON.parse(sessionStorage.getItem("user"));
        if (data.id == "") {
          data.creatorId = res.userId;
          data.modifierId = res.userId;
        } else {
          data.modifierId = res.userId;
        }
        data.valid = 1;
        axios
          .post("/patient/comm/document", {
            params: me.cloneObjectFn(data)
          })
          .then(res => {
            data = res.data.data;
            me.id = res.data.data.id;
            me.data.data.id = res.data.data.id;
            me.oldData = me.cloneObjectFn(res.data.data.content);
          })
          .catch(err => {});
      }
    },
    saveSignCb(){
      let me = this;
      let user = Object.assign({}, { typeCode: me.typeCode },
          JSON.parse(sessionStorage.getItem('user'))
        );
      me.opeNurseRecordComp.saveDocument(user);
    },
    showSignWin(userTypeText, userTypeValue, step, typeName){
      const me = this;
      if (me.submitStatus == "0") {
        if (step == "aneDoctor") {
          if (me.signMap[step].length >= 3) {
            AimsUtils.alert("最多允许三个麻醉医生签名！", 3);
            return;
          }
        }else{
          if (me.signMap[step].length >= 1) {
            AimsUtils.alert("最多允许一个护士签名！", 3);
            return;
          }
        }
        let data = me.data.data;
        data.typeCode = me.typeCode;
        data.patientId = me.conifgContent.PATIENT_ID;
        data.orDeptId = me.conifgContent.SURGERYROOM_ID;
        let res = JSON.parse(sessionStorage.getItem('user'))
        if (data.id == "") {
          data.creatorId = res.userId;
          data.modifierId = res.userId;
        } else {
          data.modifierId = res.userId;
        }
        delete data.valid;
        const axiosData = me.cloneObjectFn(data)
        axios
          .post("/patient/comm/document", {
            params: axiosData
          })
          .then(res => {
            if (me.disabled == true) {
              return
            }
            me.id = res.data.data.id;
            me.data.data.id = res.data.data.id;
            let businessData = {
              documentId: res.data.data.id,
              patientId: me.conifgContent.PATIENT_ID,
              bizType: me.typeCode,
              signLabelName: step,
              isAdd: true,
              dataSign: Ext.encode(me.data.data.content),
              signLabel: me.titleTip + '(' + typeName + ')'
            };
            if (me.mobile) options["y"] = "90"; //pad上窗口居上
            Ext.create("Ext.sign.SignWindow", {
              title: "签名",
              userTypeValue: userTypeValue, //surgeryDoctor,surgeryNurse,aneDoctor
              userTypeText: userTypeText, //手术医生,手术护士,麻醉医生
              userInfo: res,
              businessData: businessData,
              signCb(userData) {
                let signatureListArr = me.signMap[step];
                if (!me.data.data.signatureList) {
                  me.$set(me.data.data, "signatureList", []);
                }
                if (signatureListArr && me.data.data.signatureList.length > 0) {
                  for (let i = 0; i < signatureListArr.length; i++) {
                    if (signatureListArr[i].jobNumber === userData.jobNumber) {
                      AimsUtils.alert(`已经存在 ${userData.name} 的签名`, 3);
                      return;
                    }
                  }
                }

                if (userData.signature) {
                  let dom = '<span class="' + step + 'img delImg"' + 'style="left: ' + me.signMap[step].length * 70 + 'px"><img class=signImgAneDoctor src=' + userData.signature + ' /><i class="fa fa-remove delViceAneDoctor" data-userid=' + userData.id + "data-usertype=" + step + "></i></span>";
                  $("." + me.idPrefix + " ." + step + "Name").append(dom);
                } else {
                  let dom = `<span class="${step}img delDoctorOuter" style="left:${me.signMap[step].length * 70}px">${userData.name}<i class="fa fa-remove delViceAneDoctor" data-userid=${userData.id} data-usertype=${step}></i></span>`;
                  $("." + me.idPrefix + " ." + step + "Name").append(dom);
                }

                let copySign = {
                  bizType: me.typeCode,
                  signLabelName: step,
                  deptName: userData.deptName,
                  jobNumber: userData.jobNumber,
                  jobTitle: userData.jobTitle,
                  name: userData.name,
                  signerId: userData.id,
                  signType: 1,
                  signature: userData.signature
                }
                me.data.data.signatureList.push(copySign);

                if (me.showSignWinAfterCb) me.showSignWinAfterCb(step);
                me.deleteSign()
                me.saveSignCb(step, userData);
              }
            }).show();
          })
          .catch(err => {

          });
      }
    },
    deleteSign() {
      let me = this;
      me.$nextTick(function () {
        let delDom = $(".delViceAneDoctor");
        for (let n = 0; n < delDom.length; n++) {
          $(delDom[n]).bind("click", (e) => {
            if (me.submitStatus == "0") {
              var dom = e;
              var signLabelName = $(e.target).data("usertype");
              var userId = $(e.target).data("userid");
              if (!signLabelName || !userId) {
                return;
              }
              let signMapArr = me.signMap[signLabelName];
              let userIndex = signMapArr.findIndex((item) => {
                return userId === item.signerId;
              });
              console.log(signLabelName);
              console.log(userIndex + 1);
              axios({
                url: "portal/signature/delSign",
                method: "put",
                data: {
                  bizId: me.id,
                  bizType: me.typeCode,
                  signLabelName: signLabelName,
                  sortNumber: userIndex + 1,
                },
              })
                .then((res) => {
                  // $(delDom[n]).parent().remove();
                  // $('.' + $(e.target).data('userid')).css("color", "red");
                  let signatureList = me.data.data.signatureList;
                  for (let i = 0; i < signatureList.length; i++) {
                    if (signatureList[i].signerId == userId && signatureList[i].signLabelName == signLabelName) {
                      me.data.data.signatureList.splice(i, 1);
                    }
                  }
                  me.saveSignCb();
                  if (me.deleteSignCb) me.deleteSignCb(signLabelName);
                  console.log(me.data.data.signatureList);
                })
                .catch((err) => {});
            }
          });
        }
      });
    },
    showSignWinAfterCb(step){
        let me = this;
        // if (step === "fcircuitNurse") {
        //   let fcircuitNurseTime = Ext.Date.format(new Date(), "Y-m-d H:i");
        //   me.data.data.content.sign.fcircuitNurseTime = fcircuitNurseTime;
        // }
        let CaSignInfo = [
          "instrumentNurse",
          "operationRoom1",
          "recovery"
        ];
        for (let i = 0; i < CaSignInfo.length; i++) {
          if ($("." + CaSignInfo[i] + "img").length > 0) {
            $("." + CaSignInfo[i]).css("color", "#404040");
          }
        }
    },
    // deleteSignCb(e){
    //     let me = this;
    //     if ($("." + $(e.target).data("userid"))[0].className == 'fcircuitNurse') {
    //       me.data.data.content.sign.fcircuitNurseTime = "";
    //     }
    // },
    focusV(res) {
      for (let aa in this.focus) {
        if (aa == res) {
          this.focus[aa] = true;
        } else {
          this.focus[aa] = false;
        }
      }
    },
    bloodProductsC() {
      if (this.data.data.content.postoperatively.bloodProducts == "有") {
        this.focusV("bloodProducts");
      }
    },
    drugsC() {
      if (this.data.data.content.postoperatively.drugs == "有") {
        this.focusV("drugs");
      }
    },
    specimenC() {
      if (this.data.data.content.intraoperative.specimenContent == "其他") {
        this.focusV("specimen");
      }
    },
    changgeno(content) {
      this.focusV(content);
    },
    async loadOptions({ action }) {
      this.options = this.options;
    },
    remoteMethod(query) {
      axios
        .get("/portal/dictionary/icd-surgerys", {
          params: {
            query: query
          }
        })
        .then(res => {
          let states = [];
          let resData = res.data.data.data;
          for (let i = 0; i < resData.length; i++) {
            let pushres = {
              code: resData[i].code,
              icdCode: resData[i].icdCode,
              alias: resData[i].alias,
              name: resData[i].name
            };
            states.push(pushres);
          }
          this.states = states;
          this.list = this.states.map(item => {
            let query = item.name + item.alias + item.icdCode;
            let name = item.name + ",";
            return { value: name, label: name, code: item.code, query: query };
          });
        })
        .catch(err => {});
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.query.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    },
    cloneObjectFn(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    //人员检索
    querySearchAsync(queryString, cb) {
      var me = this;
      if (queryString) {
      } else {
        cb([]);
      }
    },

    setSurgeryTime() {
      let me = this;
      axios
        .get(
          "anesthesia/record/special/event/" + me.conifgContent.PATIENT_ID,
          {}
        )
        .then(res => {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].eventName == "入手术间") {
              if (me.surgeryEntryTimeValue == "1") {
                if (data[i].eventTime) {
                    data[i].eventTime = me.switchTimeFormat(data[i].eventTime)
                }
                me.data.data.content.basicInformation.surgeryEntryTime =
                  data[i].eventTime;
                me.surgeryEntryTime = data[i].eventTime;
              } else if (
                me.surgeryEntryTimeValue == "3" &&
                !me.data.data.content.basicInformation.surgeryEntryTime
              ) {
                if (data[i].eventTime) {
                    data[i].eventTime = me.switchTimeFormat(data[i].eventTime)
                }
                me.data.data.content.basicInformation.surgeryEntryTime =
                  data[i].eventTime;
                me.surgeryEntryTime = data[i].eventTime;
              }
            } else {
              me.surgeryEntryTime =
                me.data.data.content.basicInformation.surgeryEntryTime;
            }

            if (data[i].eventName == "手术开始") {
              if (me.surgeryBeginTimeValue == "1") {
                if (data[i].eventTime) {
                    data[i].eventTime = me.switchTimeFormat(data[i].eventTime)
                }
                me.data.data.content.basicInformation.surgeryBeginTime =
                  data[i].eventTime;
                me.surgeryBeginTime = data[i].eventTime;
              } else if (
                me.surgeryBeginTimeValue == "3" &&
                !me.data.data.content.basicInformation.surgeryBeginTime
              ) {
                if (data[i].eventTime) {
                    data[i].eventTime = me.switchTimeFormat(data[i].eventTime)
                }
                me.data.data.content.basicInformation.surgeryBeginTime =
                  data[i].eventTime;
                me.surgeryBeginTime = data[i].eventTime;
              }
            } else {
              me.surgeryBeginTime =
                me.data.data.content.basicInformation.surgeryBeginTime;
            }

            if (data[i].eventName == "手术结束") {
              if (me.surgeryEndTimeValue == "1") {
                if (data[i].eventTime) {
                    data[i].eventTime = me.switchTimeFormat(data[i].eventTime)
                }
                me.data.data.content.basicInformation.surgeryEndTime =
                  data[i].eventTime;
                me.surgeryEndTime = data[i].eventTime;
              } else if (
                me.surgeryEndTimeValue == "3" &&
                !me.data.data.content.basicInformation.surgeryEndTime
              ) {
                if (data[i].eventTime) {
                    data[i].eventTime = me.switchTimeFormat(data[i].eventTime)
                }
                me.data.data.content.basicInformation.surgeryEndTime =
                  data[i].eventTime;
                me.surgeryEndTime = data[i].eventTime;
              }
            } else {
              me.surgeryEndTime =
                me.data.data.content.basicInformation.surgeryEndTime;
            }

            if (data[i].eventName == "准备出手术间") {
              if (me.surgeryLeaveTimeValue == "1") {
                if (data[i].eventTime) {
                    data[i].eventTime = me.switchTimeFormat(data[i].eventTime)
                }
                me.data.data.content.basicInformation.surgeryLeaveTime =
                  data[i].eventTime;
                me.surgeryLeaveTime = data[i].eventTime;
              } else if (
                me.surgeryLeaveTimeValue == "3" &&
                !me.data.data.content.basicInformation.surgeryLeaveTime
              ) {
                if (data[i].eventTime) {
                    data[i].eventTime = me.switchTimeFormat(data[i].eventTime)
                }
                me.data.data.content.basicInformation.surgeryLeaveTime =
                  data[i].eventTime;
                me.surgeryLeaveTime = data[i].eventTime;
              }
            } else {
              me.surgeryLeaveTime =
                me.data.data.content.basicInformation.surgeryLeaveTime;
            }
          }
          let patientInfo = me.oldData.patientInfo;
          me.oldData = me.cloneObjectFn(me.data.data.content);
          me.oldData.patientInfo = patientInfo;
        })
        .catch(error => {});
    },
    selectChange(item) {
      console.log(item);
    },
    setReadOnly(flag) {
      let me = this;
      me.disabled = flag;
      me.opeNurseRecordComp.setReadOnly(flag);
    },
    // 初始化文书上要绑定多值组件的地方
    // 由 ContentInfo 外部调用
    initMultivalueConfig(data) {
      this.multivalueConfig = data;
    },
    syncAnesRecordChecked(){
      let me = this;
      if (me.submitStatus == '1') return;
      axios.get(`/anesthesia/record/record/${me.data.data.content.patientInfo.surgeryId}`,{
        params: {
          isTemplate: false
        }
      }).then(res => {
        let crystalTotalStr1 = ''
        let crystalTotalStr2 = ''
        let infusion = res.data.data.infusion;
        for (let a = 0; a < infusion.length; a++) {
          for(let b = a+1; b < infusion.length; b++) {
            if (infusion[a].drugName == infusion[b].drugName) {
              infusion[a].dosage += infusion[b].dosage;
              infusion.splice(b,1)
            }
          }
        }
        for (let i in infusion) {
          if (infusion[i]) {
            if (infusion[i].liquidType == '1') {
              crystalTotalStr1 += `晶体：${infusion[i].drugName}${infusion[i].dosage}${infusion[i].dosageUnitName};`
            } else if (infusion[i].liquidType == '2') {
              crystalTotalStr2 += `胶体：${infusion[i].drugName}${infusion[i].dosage}${infusion[i].dosageUnitName};`
            }
          }
        }
        if (crystalTotalStr1 || crystalTotalStr2) {
          me.data.data.content.intraoperative.infusion = crystalTotalStr1 + crystalTotalStr2
        } else {
          me.data.data.content.intraoperative.infusion = ''
        }
        me.oldData.intraoperative.infusion = me.data.data.content.intraoperative.infusion
      })
    },
    deleteBloodInfusion(key) {
      let me = this;
      if (me.submitStatus == '0') {
        switch (key) {
          case "infusion" :
            me.data.data.content.intraoperative.infusion = "";
            break;
          case "hemorrhage" :
            me.data.data.content.intraoperative.hemorrhage = "";
            break;
          case "urineOther" :
            me.data.data.content.intraoperative.urineOther = "";
            break;
          case "ureternub" :
            me.data.data.content.intraoperative.ureternub = "";
            break;
          case "Cells" :
            me.data.data.content.intraoperative.Cells = "";
            break;
            default :
            break;
        }
      }
    },
    refreshBloodInfusion(key) {
      let me = this;
      if (me.submitStatus == '1') return
        axios.get(
          "anesthesia/record/bloodInfusion/" + me.conifgContent.PATIENT_ID,
          {}
        )
        .then(res => {
          let data = res.data.data;
          let multivalueCompObj = me.opeNurseRecordComp.contentInfo.commonContent[me.idPrefix + '-multivaluecomp'].multivalueCompObj;
          if(data.anesTypeCode!=null&&data.anesTypeCode!=""&&key=='anesTypeName'){
              multivalueCompObj['anesTypeName'].setFieldValue(data.anesTypeCode);
              me.data.data.content.basicInformation.anesTypeName = data.anesTypeCode;
          }
          if (key == 'hemorrhage' || me.data.data.content.intraoperative.hemorrhage == '') {
            me.data.data.content.intraoperative.hemorrhage = data.bloodVolume;
          }
          if (key == 'ureternub' || me.data.data.content.intraoperative.ureternub == '') {
            if (data.urineVolume == "未置导尿管") {
              me.data.data.content.intraoperative.ureter='无';
            } else if(data.urineVolume!==''&&data.urineVolume!==null){
              me.data.data.content.intraoperative.ureter='有';
            }
            me.data.data.content.intraoperative.ureternub = data.urineVolume;
          }
          if (key == 'Cells' || me.data.data.content.intraoperative.Cells == '') {
            if (data.inBloodArr && data.inBloodArr.length>0) {
              let inBloodArr = data.inBloodArr
              me.data.data.content.intraoperative.BloodTransfusion = '有';
              // let precipitate = null;
              // let Cells = null;
              // let plasma = null;
              // let Platelet = null;
              // let OtherBloodType = [];
              // for(let i=0; i<inBloodArr.length; i++){
              //   if(inBloodArr[i].includes('冷沉淀')){
              //     precipitate+=(parseInt(inBloodArr[i].split('：')[1]))
              //   }else if(inBloodArr[i].includes('红细胞')){
              //     Cells+=(parseInt(inBloodArr[i].split('：')[1]))
              //   }else if(inBloodArr[i].includes('血浆')){
              //     plasma+=(parseInt(inBloodArr[i].split('：')[1]))
              //   }else if(inBloodArr[i].includes('血小板')){
              //     Platelet+=(parseInt(inBloodArr[i].split('：')[1]))
              //   }else {
              //     OtherBloodType.push(inBloodArr[i])
              //   }
              // }
                // me.data.data.content.intraoperative.precipitate = precipitate;
                me.data.data.content.intraoperative.Cells = inBloodArr.join('，');
                // me.data.data.content.intraoperative.plasma = plasma;
                // me.data.data.content.intraoperative.Platelet = Platelet;
                // me.data.data.content.intraoperative.OtherBloodType = OtherBloodType.join('，');
            }
          }
          if (key == 'urineOther' || me.data.data.content.intraoperative.urineOther == '') {
            me.data.data.content.intraoperative.urineOther = data.fluid;
          }
          let patientInfo = me.oldData.patientInfo;
          me.oldData = me.cloneObjectFn(me.data.data.content);
          me.oldData.patientInfo = patientInfo;
        })
        .catch(error => {})
    },
  }
};
</script>
<style>
@media print {
   .inputClass .el-input__inner {
      color: #000 !important;
    }
}
</style>
<style lang="less" scoped>
@import "../../../../../../../static/css/common.less";
@import url("../static/css/nurserecord1.less");
.documentBody p {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;

  &:last-child {
    margin-bottom: 0;
  }

  label:not(:first-child) {
    margin-left: 5px;
  }
}
</style>
<style lang="less">
.signBase9 .delImg {
  cursor: pointer;
  position: relative;
  position: absolute;
  top: -4px;
  left: 0;
}

.signBase9 .delDoctorOuter {
  cursor: pointer;
  vertical-align: top;
  position: relative;
  position: absolute;
  left: 0px;
}

.delDoctorOuter:hover .delViceAneDoctor {
  visibility: visible;
}

.delImg:hover .delViceAneDoctor {
  visibility: visible;
}
.signBase9 .signImgAneDoctor {
  width: 60px;
  height: 30px;
  vertical-align: top;
}

.signBase9 .delViceAneDoctor {
  cursor: pointer;
  color: red;
  font-size: 14px;
  transform: scale(0.8);
  position: absolute;
  right: 0px;
  visibility: hidden;
}

.inputClass .el-input__inner {
  font-size: 17px !important;
}

.inputClass .el-input__inner:disabled {
  background-color: white !important;
}

#paper .userColumn .el-date-editor.el-input .el-input__icon {
  line-height: 32px;
}
#paper .userColumn .el-date-editor.el-input input.el-input__inner {
  line-height: 32px;
}

@media print {
  .inputClass .userColumn .el-date-editor.el-input input.el-input__inner {
    height: 28px !important;
    line-height: 32px !important;
  }
   .inputClass .el-input__inner {
      color: #000 !important;
    }
}
</style>
