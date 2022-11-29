<template>
  <div id="paper" :class="idPrefix" v-if="documentReady">
    <div class="documentWrapper" style="width: 1020px;height: 477mm;text-align: left;position: relative;">
      <div class="document-modal" v-if="disabled"></div>
      <div class="documentPaper">
        <div class="hospital-logo">
          <img :src="logo" />
        </div>
        <div class="documentHeader">
          <span>手术护理记录单</span>
        </div>
        <div class="documentBody noborder inputClass signBase9">
          <p class="documentTreeselect">
            <span class="customh3">姓名:</span>
            <input type="text" v-model="data.data.content.patientInfo.name" readonly="true" class="commonInput" style="width:150px;">
            <span class="customh3">性别:</span>
            <input type="text" v-model="data.data.content.patientInfo.gender" readonly="true" class="commonInput" style="width:20px;">
            <span class="customh3">年龄:</span>
            <input type="text" v-model="data.data.content.patientInfo.age" readonly="true" class="commonInput" style="width:80px;">
            <span class="customh3">病区:</span>
            <input type="text" v-model="data.data.content.patientInfo.deptName" readonly="true" class="commonInput" style="width:200px;">
            <span class="customh3">床号:</span>
            <input type="text" v-model="data.data.content.patientInfo.bedNumber" readonly="true" class="commonInput" style="width:110px;">
            <span class="customh3">住院号:</span>
            <input type="text" v-model="data.data.content.patientInfo.admissionNumber" readonly="true" class="commonInput" style="width:150px;">
            <span class="customh3">手术日期:</span>
            <el-date-picker style="width:150px;" v-model="data.data.content.patientInfo.surgeryDate" :clearable="true" format="yyyy-MM-dd" :disabled="disabled" value-format="yyyy-MM-dd" :editable="false" type="datetime"></el-date-picker>
          </p>
          <div>
            <p class="customh3">一、基本信息：</p>
            <p style="justify-content:flex-start;">
              <span>1、手术间</span>
              <span :id="idPrefix+'-roomName'" class="ASAfont" style="width:100px;display: inline-block;border-bottom: 1px dotted;"></span>


              <!-- <input type="text" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.patientInfo.roomName" style="width:100px;padding: 0px;"> -->
              <label style="margin-left: 0px;">
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.patientInfo.isEmergency" true-value="择期手术" false-value="">
                <span class="isEmergency">择期手术</span>
              </label>
              <label style="margin-left: 30px;">
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.patientInfo.isEmergency" true-value="急诊手术" false-value="">
                <span class="isEmergency">急诊手术</span>
              </label>
            </p>
            <p>
                        <span class="surgeryEntryTime timeHover" style="width: 285px;">2、患者入室时间
                        <el-date-picker style="width:150px;" :readonly="surgeryEntryTimeValue == '1'" @change="surgeryTime" :disabled="disabled" v-model="data.data.content.basicInformation.surgeryEntryTime" :clearable="false" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
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
                        <el-date-picker style="width:145px;" :readonly="surgeryBeginTimeValue == '1'" @change="surgeryTime1" :disabled="disabled" v-model="data.data.content.basicInformation.surgeryBeginTime" :clearable="false" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
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
                        <el-date-picker style="width:145px;" :readonly="surgeryEndTimeValue == '1'" @change="surgeryTime2" :disabled="disabled" v-model="data.data.content.basicInformation.surgeryEndTime" :clearable="false" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
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
                        <el-date-picker style="width:151px;" :readonly="surgeryLeaveTimeValue == '1'" @change="surgeryTime3" :disabled="disabled" v-model="data.data.content.basicInformation.surgeryLeaveTime" :clearable="false" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                        <lancet-tooltip class="refresh1" :mini="true" placement="bottom" style="left: 230;width:22px;height: 25px;">
                            <div slot="options">
                              <!-- <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshTime('4')">
                                  <span class="right-tooltip" style="width: 160px;">从麻醉单提取离室时间</span>
                              </i> -->
                              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:0px;" @click="deleteTime3">
                                  <span class="right-tooltip" style="width: 50px;">删除</span>
                              </i>
                            </div>
                        </lancet-tooltip>
                        </span>
            </p>
            <p style="justify-content:flex-start;">
              <span class="anesTypeName">3、麻醉方式：</span>
              <span class="timeHover" style="width: 70%;">
                        <span :id="idPrefix+'-anesTypeName'" class="ASAfont" style="width: 70%;"></span>
                          <lancet-tooltip class="refresh1" :mini="true" placement="bottom" style="left: 230;width:25px;height: 25px;">
            <div slot="options">
              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshBloodInfusion('anesTypeName')">
                <span class="right-tooltip" style="width: 110px;">同步麻醉方式</span>
              </i>
            </div>
            </lancet-tooltip>
            </span>
            <span class="fluidCirculation">体外循环：</span>
            <label style="margin-left: 0px;">
              <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.basicInformation.fluidCirculation" true-value="是" false-value="">
              <span>是</span>
            </label>
            <label style="margin-left: 30px;">
              <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.basicInformation.fluidCirculation" true-value="否" false-value="">
              <span>否</span>
            </label>
            </p>
            <div id="surgeryHidden">
              <p>
                <span class="operationName">4、手术收费名称：</span>
                <span :id="idPrefix+'-operationName'" class="ASAfont" style="width: 86%;"></span>
              </p>
            </div>
            <div id="surgeryShow">
              <div class="editor">
                <div class="box_relative" style="left: 0px; top: 3px; width: 150px;">
                  <span>4、手术收费名称：</span>
                </div>
                <textarea v-model="surgerName1"  style="height: 90px;text-indent:150px;top:3px;" ></textarea>
                <ul>
                  <li style="margin-left:140px; width:880px;" ></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <!-- <div id="surgeryShow">
              <p style="justify-content:flex-start;">
                  <span>4、手术收费名称：</span>
                  <textarea rows="2" v-model="surgerName1" id="PFTs" class="commonInput" style="width: 870px;height:27px;line-height:27px;"></textarea>
              </p>
            </div> -->
            <p class="customh3" style="padding-top:10px;">二、术中情况：</p>
            <p>
                        <span class="timeHover" style="width: 100%">1、术中输液量：
                          <input type="text" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.infusion" style="width:85%">；
                          <lancet-tooltip class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
            <div slot="options">
              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshBloodInfusion('infusion')">
                <span class="right-tooltip" style="width: 160px;">从麻醉单提取入量合计</span>
              </i>
              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteBloodInfusion('infusion');">
                <span class="right-tooltip" style="width: 50px;">删除</span>
              </i>
            </div>
            </lancet-tooltip>
            </span>
            </p>
            <p>
              <span>2、血型</span>
              <span class="timeHover" style="width: 153px;">
                          <span :id="idPrefix+'-bloodType'" class="ASAfont" style="width: 153px;"></span>
                          <lancet-tooltip class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
            <div slot="options">
              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshBloodInfusion('bloodType')">
                <span class="right-tooltip" style="width: 160px;">从麻醉单提取入量合计</span>
              </i>
              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteBloodInfusion('bloodType');">
                <span class="right-tooltip" style="width: 50px;">删除</span>
              </i>
            </div>
            </lancet-tooltip>
            </span>
            <label>
              <span>输血：</span>
              <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.BloodTransfusion" true-value="无" false-value="">
              <span>无</span>
            </label>
            <label>
              <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.BloodTransfusion" true-value="有" false-value="">
              <span>有；</span>
            </label>
            <span class="timeHover">红细胞：
                          <input type="text" @change="changgeno('')" :readonly="data.data.content.intraoperative.BloodTransfusion !='有' || disabled" v-model="data.data.content.intraoperative.Cells" style="width:125px;">；
                          <lancet-tooltip v-show="data.data.content.intraoperative.BloodTransfusion == '有'" class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
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
            <span class="timeHover">血浆：
                          <input type="text" @change="changgeno('')" :readonly="data.data.content.intraoperative.BloodTransfusion !='有' || disabled" v-model="data.data.content.intraoperative.plasma" style="width:135px;">；
                          <lancet-tooltip v-show="data.data.content.intraoperative.BloodTransfusion == '有'" class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
                            <div slot="options">
                              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshBloodInfusion('plasma')">
                                  <span class="right-tooltip" style="width: 160px;">从麻醉单提取入量合计</span>
                              </i>
                              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteBloodInfusion('plasma');">
                                  <span class="right-tooltip" style="width: 50px;">删除</span>
                              </i>
                            </div>
                          </lancet-tooltip>
                        </span>
            <br>
            <span class="timeHover">冷沉淀：
                          <input type="text" @change="changgeno('')" :readonly="data.data.content.intraoperative.BloodTransfusion !='有' || disabled" v-model="data.data.content.intraoperative.precipitate" style="width:125px;">；
                          <lancet-tooltip v-show="data.data.content.intraoperative.BloodTransfusion == '有'" class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
                            <div slot="options">
                              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshBloodInfusion('precipitate')">
                                  <span class="right-tooltip" style="width: 160px;">从麻醉单提取入量合计</span>
                              </i>
                              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteBloodInfusion('precipitate');">
                                  <span class="right-tooltip" style="width: 50px;">删除</span>
                              </i>
                            </div>
                          </lancet-tooltip>
                        </span>
            </p>
            <p>
                        <span class="timeHover" style="margin-left:27px;">血小板：
                          <input type="text" @change="changgeno('')" :readonly="data.data.content.intraoperative.BloodTransfusion !='有' || disabled" v-model="data.data.content.intraoperative.Platelet" style="width:242px;">；
                          <lancet-tooltip v-show="data.data.content.intraoperative.BloodTransfusion == '有'" class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
            <div slot="options">
              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshBloodInfusion('Platelet')">
                <span class="right-tooltip" style="width: 160px;">从麻醉单提取入量合计</span>
              </i>
              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteBloodInfusion('Platelet');">
                <span class="right-tooltip" style="width: 50px;">删除</span>
              </i>
            </div>
            </lancet-tooltip>
            </span>
            <span class="timeHover">其他：
                          <input type="text" @change="changgeno('')" :readonly="data.data.content.intraoperative.BloodTransfusion !='有' || disabled" v-model="data.data.content.intraoperative.OtherBloodType" style="width:588px;">；
                          <lancet-tooltip v-show="data.data.content.intraoperative.BloodTransfusion == '有'" class="refresh1" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
                            <div slot="options">
                              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshBloodInfusion('OtherBloodType')">
                                  <span class="right-tooltip" style="width: 160px;">从麻醉单提取入量合计</span>
                              </i>
                              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteBloodInfusion('OtherBloodType');">
                                  <span class="right-tooltip" style="width: 50px;">删除</span>
                              </i>
                            </div>
                          </lancet-tooltip>
                        </span>
            </p>
            <p>
                        <span class="timeHover hemorrhage">3、出血量
                          <input type="text" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.hemorrhage" style="width:410px;"><span>ml；</span>
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
            <span class="timeHover urineOther">其他
                          <input type="text" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.urineOther" style="width:420px;"><span>ml；</span>
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
            </p>
            <p style="justify-content:flex-start;">
              <span class="ureter">4、尿管：</span>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.ureter" true-value="无" false-value="">
                <span>无</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.ureter" true-value="有" false-value="">
                <span>有：</span>
              </label>
              <span class="timeHover ureternub">术中尿量
                        <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.ureter !='有' || disabled" v-model="data.data.content.intraoperative.ureternub" style="width:200px;">
                          <lancet-tooltip class="refresh1" v-show="data.data.content.intraoperative.ureter =='有'" :mini="true" placement="bottom" style="left: 230;width:40px;height: 25px;">
            <div slot="options">
              <i class="fa fa-refresh delViceAneDoctorTime dc-tooltip" @click="refreshBloodInfusion('ureternub')">
                <span class="right-tooltip" style="width: 160px;">从麻醉单提取尿量合计</span>
              </i>
              <i class="fa fa-close delViceAneDoctorTime dc-tooltip" style="margin-left:20px;" @click="deleteBloodInfusion('ureternub');">
                <span class="right-tooltip" style="width: 50px;">删除</span>
              </i>
            </div>
            </lancet-tooltip>
            ml;</span>
            </p>
            <p>
              <label>
                <span class="drainage">5、引流：</span>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.drainage" true-value="无" false-value="">
                <span>无</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.drainage" true-value="有" false-value="">
                <span>有：</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.drainageContent" false-value="">
                <span>胶管</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.drainageContent6" false-value="">
                <span>负压引流</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.drainageContent1" false-value="">
                <span>胸腔引流管</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.drainageContent2" false-value="">
                <span>T型管</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.drainageContent4" false-value="">
                <span>心包引流管</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.drainageContent5" false-value="">
                <span>纵膈引流管</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.drainageContent3" false-value="">
              </label>
              <span style="margin-left:10px;">其他</span>
              <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.drainageText" style="width:100%">
            </p>
            <p>
              <span  style="margin-left: 25px;">部位：</span>
              <input type="text" @change="changgeno('')" :readonly="data.data.content.intraoperative.drainage !='有' || disabled" v-model="data.data.content.intraoperative.Position" style="width:100%">
            </p>
            <div class="marginBottom">
              <span class="tube">6、胃管：</span>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.tube" true-value="无" false-value="">
                <span>无</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.tube" true-value="有" false-value="">
                <span>有：</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.tube !='有' || disabled" v-model="data.data.content.intraoperative.tubeOther" true-value="术前留置" false-value="">
                <span class="tubeOther">术前留置</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.tube !='有' || disabled" v-model="data.data.content.intraoperative.tubeOther" true-value="术中留置" false-value="">
                <span class="tubeOther">术中留置；</span>
              </label>

            </div>
            <!-- <div class="marginBottom">
                <span class="invivo">7、体内填塞物品：</span>
                <label>
                    <span>无</span>
                    <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.invivo" true-value="无" false-value="">
                </label>
                <label>
                    <span>有</span>
                    <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.invivo" true-value="有" false-value="">；
                </label>
                <span class="invivoName">名称</span>
                <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.invivo !='有' || disabled" v-model="data.data.content.intraoperative.invivoName" style="width:200px">
                <span class="invivoNum">数目</span>
                <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.invivo !='有' || disabled" v-model="data.data.content.intraoperative.invivoNum" style="width:200px">
                <span class="invivoPosition">部位</span>
                <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.invivo !='有' || disabled" v-model="data.data.content.intraoperative.invivoPosition" style="width:237px">

            </div> -->
            <!-- <p>
                <label>
                    <span class="specimen">8、标本：</span>
                    <span>无</span>
                    <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.specimen" true-value="无" false-value="">
                </label>
                <label>
                    <span>有</span>
                    <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.specimen" true-value="有" false-value="">；
                </label>
                <label>
                    <span>冰冻切片</span>
                    <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.specimenContent" false-value="">
                </label>
                <input type="text" @blur="changgeno('')" :readonly="!data.data.content.intraoperative.specimenContent || disabled" v-model="data.data.content.intraoperative.specimenContentOther" style="width:100%">
                    <span class="specimenContentOther">份；</span>
                <label>
                    <span>石蜡切片</span>
                    <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.specimenContent1" false-value="">
                </label>
                <input type="text" @blur="changgeno('')" :readonly="!data.data.content.intraoperative.specimenContent1 || disabled" v-model="data.data.content.intraoperative.specimenContent1Other" style="width:100%">
                    <span class="specimenContent1Other">份；</span>
                <label>
                    <span>细胞学检查</span>
                    <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.specimenContent2" false-value="">
                </label>
                <input type="text" @blur="changgeno('')" :readonly="!data.data.content.intraoperative.specimenContent2 || disabled" v-model="data.data.content.intraoperative.specimenContent2Other" style="width:100%">
                    <span class="specimenContent2Other">份；</span>
            </p>
            <div class="marginBottom">
                <label>
                    <span style="margin-left:25px;">培养管</span>
                    <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.specimenContent3" false-value="">
                </label>
                <input type="text" @blur="changgeno('')" :readonly="!data.data.content.intraoperative.specimenContent3 || disabled" v-model="data.data.content.intraoperative.specimenContent3Other" style="width:180px">
                    <span class="specimenContent3Other">份；</span>
                <span>其他</span>
                <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.specimen !='有' || disabled" v-model="data.data.content.intraoperative.specimenText" style="width:655px">

            </div> -->
            <div class="marginBottom">
              <label>
                <span class="implantation">7、植入物：</span>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.implantation" true-value="无" false-value="">
                <span>无</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.implantation" true-value="有" false-value="">
                <span>有</span>
              </label>
              <span>(详见：</span><span>
                            <label>
                                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.implantation !='有' || disabled" v-model="data.data.content.intraoperative.clearPoint" true-value="手术物品清点记录单" false-value="">手术物品清点记录单,
                            </label>
                            <label>
                                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.implantation !='有' || disabled" v-model="data.data.content.intraoperative.record" true-value="植入记录表" false-value="">植入记录表)；
                            </label>
                        </span>
            </div>
            <div class="marginBottom">
              <span class="hemostasis">8、使用充气式止血带：</span>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.hemostasis" true-value="无" false-value="">
                <span>无</span>

              </label>
              <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.hemostasis" true-value="有" false-value="">
              <span>有</span>
              <span >(部位：</span><span>
                            <label>
                                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.upper" true-value="左上肢" false-value="">左上肢,
                            </label>
                            <label>
                                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.rightupper" true-value="右上肢" false-value="">右上肢,
                            </label>
                            <label>
                                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.lower" true-value="左下肢" false-value="">左下肢,
                            </label>
                            <label>
                                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.rightlower" true-value="右下肢" false-value="">右下肢)；
                            </label>
                        </span>
            </div>
            <!-- <p>
                <span  style="margin-left:25px;">止血带压力</span>
                <input type="text" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.tourniquet" style="width:100%">
                <span>mmHg (KPa)；</span><span >使用时间</span>
                <el-date-picker style="width:100%" :disabled="disabled" v-model="data.data.content.intraoperative.tourniquetTime" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
             </p>
            <p>
                <span  style="margin-left:25px;">止血带压力</span>
                <input type="text" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.tourniquet1" style="width:100%">
                <span>mmHg (KPa)；</span><span >使用时间</span>
                <el-date-picker style="width:100%" :disabled="disabled" v-model="data.data.content.intraoperative.tourniquetTime1" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
              </p> -->
            <p>
              <span  style="margin-left:25px;">止血带压力</span>
              <input type="text" @change="changgeno('')" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.tourniquet" style="width:100%">
              <span>mmHg (KPa)；</span><span >使用时间</span>
              <el-date-picker style="width:100%" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.tourniquetTime" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
              <span  style="width: 30px; text-align: center;">至</span>
              <el-date-picker style="width:100%" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.tourniquetEndTime" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
            </p>
            <p>
              <span  style="margin-left:25px;">止血带压力</span>
              <input type="text" @change="changgeno('')" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.tourniquet1" style="width:100%">
              <span>mmHg (KPa)；</span><span >使用时间</span>
              <el-date-picker style="width:100%" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.tourniquetTime1" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
              <span  style="width: 30px; text-align: center;">至</span>
              <el-date-picker style="width:100%" :disabled="data.data.content.intraoperative.hemostasis !='有' || disabled" v-model="data.data.content.intraoperative.tourniquetEndTime1" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
            </p>
            <p>
              <span  style="margin-left: 25px;">备注：</span>
              <input type="text" @change="changgeno('')" :readonly="disabled" v-model="data.data.content.intraoperative.remarks" style="width:100%">
            </p>
            <p>
              <label>
                <span class="hemostat">9、桡动脉止血器：</span>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.hemostat" true-value="无" false-value="">
                <span>无</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.hemostat" true-value="有" false-value="">
                <span>有：</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.hemostat !='有' || disabled" v-model="data.data.content.intraoperative.hemostatLeft" false-value="">
                <span>左上肢</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.hemostat !='有' || disabled" v-model="data.data.content.intraoperative.hemostatRight" false-value="">
                <span>右上肢</span>
              </label>

              <span style="margin-left:10px;">开始使用时间</span>
              <el-date-picker style="width:100%" :disabled="data.data.content.intraoperative.hemostat !='有' ||disabled" v-model="data.data.content.intraoperative.startHemostatTime" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>

            </p>
            <p>
              <span style="margin-left: 25px;">备注：</span>
              <input type="text" @change="changgeno('')" :readonly="data.data.content.intraoperative.hemostat !='有' || disabled" v-model="data.data.content.intraoperative.hemostatPosition" style="width:100%">
            </p>
            <p>
              <span class="temperature">10、预防低体温设备：</span>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.temperature" true-value="无" false-value="">
                <span>无</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.temperature" true-value="有" false-value="">
                <span>有：</span>
              </label>

              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.temperature !='有' || disabled" v-model="data.data.content.intraoperative.facility1" false-value="">
                <span >充气式暖风毯</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.temperature !='有' || disabled" v-model="data.data.content.intraoperative.facility2" false-value="">
                <span>冲洗液加温仪</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.temperature !='有' || disabled" v-model="data.data.content.intraoperative.facility3" false-value="">
                <span>输液加温仪</span>
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="data.data.content.intraoperative.temperature !='有' || disabled" v-model="data.data.content.intraoperative.facility4" false-value="">
                <span>其他</span>
              </label>
              <input type="text" @blur="changgeno('')" :readonly="data.data.content.intraoperative.temperature !='有' || disabled" v-model="data.data.content.intraoperative.facilityText" style="width:100%;">；
            </p>

            <div class="marginBottom">
              <span class="damageStatus">11、术中压力性损伤动态管理措施：</span>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.damageStatus" true-value="无" false-value="" style="margin-left:10px">无
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.damageStatus" true-value="有" false-value="" style="margin-left:30px">有
              </label>
            </div>
            <table class="analgesCon">
              <tr>
                <td class="col1" colspan="7">术中压力性损伤动态管理措施</td>
              </tr>

              <tr>
                <td  class="col1" rowspan="4" style="width:12%">动态摇床</td>
                <td style="width:12%">左侧倾斜</td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.leftTilt1" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.leftTilt2" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.leftTilt3" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.leftTilt4" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.leftTilt5" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>右侧倾斜</td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.rightTilt1" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.rightTilt2" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.rightTilt3" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.rightTilt4" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.rightTilt5" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>头低脚高</td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.headLow1" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.headLow2" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.headLow3" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.headLow4" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.headLow5" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>头高脚低</td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.headHeight1" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.headHeight2" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.headHeight3" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.headHeight4" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.headHeight5" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td  class="col1" rowspan="7">局部托起减压</td>
                <td>头部</td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.head1" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.head2" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.head3" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.head4" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.head5" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>肩部</td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.shoulder1" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.shoulder2" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.shoulder3" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.shoulder4" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.shoulder5" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>胸部</td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.chest1" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.chest2" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.chest3" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.chest4" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.chest5" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>髋部</td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.hip1" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.hip2" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.hip3" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.hip4" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.hip5" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>骶尾部</td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.sacralTail1" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.sacralTail2" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.sacralTail3" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.sacralTail4" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.sacralTail5" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>足跟部</td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.footRoot1" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.footRoot2" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.footRoot3" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.footRoot4" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.footRoot5" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>其他部位：</td>
                <td>
                  <input type="text" v-model="data.data.content.surgerTime.otherParts1" :disabled="disabled" class="commonInput" style="width: 100%;">
                </td>
                <td>
                  <input type="text" v-model="data.data.content.surgerTime.otherParts2" :disabled="disabled" class="commonInput" style="width: 100%;">
                </td>
                <td><input type="text" v-model="data.data.content.surgerTime.otherParts3" :disabled="disabled" class="commonInput" style="width: 100%;"></td>
                <td><input type="text" v-model="data.data.content.surgerTime.otherParts4" :disabled="disabled" class="commonInput" style="width: 100%;"></td>
                <td><input type="text" v-model="data.data.content.surgerTime.otherParts5" :disabled="disabled" class="commonInput" style="width: 100%;"></td>
              </tr>
              <tr>
                <td  class="col1" rowspan="2">局部交替垫高</td>
                <td>左侧垫高</td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.heightOnLeft1" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.heightOnLeft2" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.heightOnLeft3" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.heightOnLeft4" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.heightOnLeft5" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>右侧垫高</td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.heightOnRight1" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.heightOnRight2" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.heightOnRight3" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.heightOnRight4" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
                <td class="col1">
                  <select v-model="data.data.content.surgeryPressure.heightOnRight5" style="border:none;">
                    <option value ="√">√</option>
                    <option value ="/" selected="selected">/</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td  class="col1" colspan="2">其他措施：</td>
                <td>
                  <input type="text" v-model="data.data.content.surgerTime.otherMeasures1" :disabled="disabled" class="commonInput" style="width: 100%;">
                </td>
                <td>
                  <input type="text" v-model="data.data.content.surgerTime.otherMeasures2" :disabled="disabled" class="commonInput" style="width: 100%;">
                </td>
                <td><input type="text" v-model="data.data.content.surgerTime.otherMeasures3" :disabled="disabled" class="commonInput" style="width: 100%;"></td>
                <td><input type="text" v-model="data.data.content.surgerTime.otherMeasures4" :disabled="disabled" class="commonInput" style="width: 100%;"></td>
                <td><input type="text" v-model="data.data.content.surgerTime.otherMeasures5" :disabled="disabled" class="commonInput" style="width: 100%;"></td>

              </tr>

              <tr>
                <td  class="col1" colspan="2">签名：</td>
                <td class="col1">
                  <div class="userColumn" style="margin-top: 3px;margin-left:5px;width:130px">
                    <div class="sign sign1Name">
                      <i class="fa fa-key signIcon" @click="showSignWin('护士','surgeryNurse','sign1','护理记录')"></i>
                      <input type="text" class="signInput" v-model="data.data.content.surgerTime.sign1" readonly style="width:120px;">
                    </div>
                  </div>

                  <!-- <input type="text" v-model="data.data.content.surgerTime.sign1" :disabled="disabled" class="commonInput" style="width: 100%;"> -->
                </td>
                <td class="col1">
                  <div class="userColumn" style="margin-top: 3px;margin-left:5px;width:130px">
                    <div class="sign sign2Name">
                      <i class="fa fa-key signIcon" @click="showSignWin('护士','surgeryNurse','sign2','护理记录')"></i>
                      <input type="text" class="signInput" v-model="data.data.content.surgerTime.sign2" readonly style="width:120px;">
                    </div>
                  </div>
                  <!-- <input type="text" v-model="data.data.content.surgerTime.sign2" :disabled="disabled" class="commonInput" style="width: 100%;"> -->
                </td>
                <td class="col1">
                  <div class="userColumn" style="margin-top: 3px;margin-left:5px;width:130px">
                    <div class="sign sign3Name">
                      <i class="fa fa-key signIcon" @click="showSignWin('护士','surgeryNurse','sign3','护理记录')"></i>
                      <input type="text" class="signInput" v-model="data.data.content.surgerTime.sign3" readonly style="width:120px;">
                    </div>
                  </div>
                  <!-- <input type="text" v-model="data.data.content.surgerTime.sign3" :disabled="disabled" class="commonInput" style="width: 100%;"> -->
                </td>
                <td class="col1">
                  <div class="userColumn" style="margin-top: 3px;margin-left:5px;width:130px">
                    <div class="sign sign4Name">
                      <i class="fa fa-key signIcon" @click="showSignWin('护士','surgeryNurse','sign4','护理记录')"></i>
                      <input type="text" class="signInput" v-model="data.data.content.surgerTime.sign4" readonly style="width:120px;">
                    </div>
                  </div>
                  <!-- <input type="text" v-model="data.data.content.surgerTime.sign4" :disabled="disabled" class="commonInput" style="width: 100%;"> -->
                </td>
                <td class="col1">
                  <!-- <input type="text" v-model="data.data.content.surgerTime.sign5" :disabled="disabled" class="commonInput" style="width: 100%;"> -->
                  <div class="userColumn" style="margin-top: 3px;margin-left:5px;width:130px">
                    <div class="sign sign5Name">
                      <i class="fa fa-key signIcon" @click="showSignWin('护士','surgeryNurse','sign5','护理记录')"></i>
                      <input type="text" class="signInput" v-model="data.data.content.surgerTime.sign5" readonly style="width:120px;">
                    </div>
                  </div>
                </td>

              </tr>
              <tr>
                <td  class="col1" colspan="2">时间：</td>
                <td>
                  <el-date-picker style="width:100%;line-height:32px;"  readonly :disabled="disabled" v-model="time1" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                </td>
                <td>
                  <el-date-picker style="width:100%;line-height:32px;"  readonly :disabled="disabled" v-model="time2" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                </td>
                <td>
                  <el-date-picker style="width:100%;line-height:32px;"  readonly :disabled="disabled" v-model="time3" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                </td>
                <td>
                  <el-date-picker style="width:100%;line-height:32px;"  readonly :disabled="disabled" v-model="time4" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                </td>
                <td>
                  <el-date-picker style="width:100%;line-height:32px;"  readonly :disabled="disabled" v-model="time5" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
                </td>

              </tr>
            </table>
            <p class="flexible" style="align-items:flex-start;position: relative;justify-content: normal;">
              <span class="specialRecords">12、术中特殊记录：</span>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.specialRecords" true-value="无" false-value="" style="margin-left:10px">无
              </label>
              <label>
                <input type="checkbox" @change="changgeno('')" :disabled="disabled" v-model="data.data.content.intraoperative.specialRecords" true-value="有" false-value="" style="margin-left:30px">有
              </label>
            </p>
            <p class="flexible" style="align-items:flex-start;position: relative;">
              <textarea rows="2" @change="changgeno('')" :disabled="data.data.content.intraoperative.specialRecords != '有' || disabled" v-model="data.data.content.intraoperative.special" class="commonInput" style="width: 100%;height:218px;line-height:37px;z-index: 1;margin-top: -6px;overflow:hidden;"></textarea>
            <ul style="position: absolute;width:calc(100%);right: 0;z-index: 0;margin-top: -10px;">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            </p>
            <div class="userColumn" style="line-height: 32px;">
              <div>
                <span class="equmentNurse">器械护士：</span>
              </div>
              <div class="sign equmentNurseName">
                <i class="fa fa-key signIcon" @click="showSignWin('手术护士','surgeryNurse','equmentNurse','器械护士')"></i>
                <input type="text" class="signInput" readonly v-model="data.data.content.sign.equmentNurse">
              </div>
              <div style="margin-left: 2%;">
                <span class="fcircuitNurse">巡回护士：</span>
              </div>
              <div class="sign fcircuitNurseName" style="width:300px;">
                <i class="fa fa-key signIcon" @click="showSignWin('手术护士','surgeryNurse','fcircuitNurse','巡回护士')"></i>
                <input type="text" class="signInput" readonly v-model="data.data.content.sign.fcircuitNurse">
              </div>
              <span style="margin-left:2%;">时间：</span>
              <el-date-picker style="width:150px;line-height:32px;" :disabled="disabled" v-model="data.data.content.sign.fcircuitNurseTime" :clearable="true" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" :editable="false" type="datetime"></el-date-picker>
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
        randomSuffix: Math.uuid.v1().replace(/-/g, ""),
        data: {},
        id: null,
        needPatientInfo: false,
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
        surgerName1:'',
        submitStatus: null,
        // 配置要绑定多值组件的元素
        multivalueConfig: [],

        idPrefix: "nurse-nursingrecords"+'_'+Math.uuid.v1().replace(/-/g, ""),
        focus: {
          skin: false,
          drugs: false,
          submitStatus: null,
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
        time1:null,
        time2:null,
        time3:null,
        time4:null,
        time5:null,
        signMap: {
          fcircuitNurse: [],
          equmentNurse:[],
          sign1:[],
          sign2:[],
          sign3:[],
          sign4:[],
          sign5:[],
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
          if (content.basicInformation.anaesthesiaText) {
            content.basicInformation.anaesthesia = "";
          }
          if(content.basicInformation.operationName&&content.basicInformation.operationName.length>0){
            let operationName=content.basicInformation.operationName;
            let tionName = '';
            for (let i = 0; i < operationName.length; i++) {
              if (operationName[i].description) {
                if (i == operationName.length - 1) {
                  tionName += operationName[i].name + '(' + operationName[i].description + ')'
                } else {
                  tionName += operationName[i].name + '(' + operationName[i].description + ')，'
                }
              }else{
                if (i == operationName.length - 1) {
                  tionName += operationName[i].name
                } else {
                  tionName += operationName[i].name + '，'
                }
              }

            }
            this.surgerName1 = tionName;
            //新单子手术名称在watch中更新olddata不然会出发修改保存提示
            // this.oldData.basicInformation.operationName1 = this.data.data.content.basicInformation.operationName1
            this.textareaBaseStyle(this.surgerName1,'PFTs',870);
          }else{
            this.surgerName1='';
            // this.oldData.basicInformation.operationName1 = this.data.data.content.basicInformation.operationName1
            this.textareaBaseStyle(this.surgerName1,'PFTs',870);

          }

          // if (content.postoperatively.drugs != "有") {
          //   content.postoperatively.drugsText = "";
          // }
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
            content.intraoperative.drainageContent4 = "";
            content.intraoperative.drainageContent5 = "";
            content.intraoperative.drainageContent6 = "";
            content.intraoperative.drainageText = "";
            content.intraoperative.Position = "";
          }
          if(content.intraoperative.drainageContent3 != true){
            content.intraoperative.drainageText = "";
          }
          if (content.intraoperative.hemostat != "有") {
            content.intraoperative.hemostatLeft = "";
            content.intraoperative.hemostatRight = "";
            content.intraoperative.startHemostatTime = "";
            content.intraoperative.hemostatPosition = "";
          }
          if (content.intraoperative.implantation != "有") {
            content.intraoperative.clearPoint = "";
            content.intraoperative.record = "";
          }
          if (content.intraoperative.hemostasis != "有") {
            content.intraoperative.upper = "";
            content.intraoperative.rightupper = "";
            content.intraoperative.lower = "";
            content.intraoperative.rightlower = "";
            content.intraoperative.tourniquet="";
            content.intraoperative.tourniquetTime="";
            content.intraoperative.tourniquetEndTime="";
            content.intraoperative.tourniquet1="";
            content.intraoperative.tourniquetTime1="";
            content.intraoperative.tourniquetEndTime1="";

          }

          if (content.intraoperative.ureter != "有") {
            content.intraoperative.ureternub = "";
          }

          if (content.intraoperative.tube != "有") {
            content.intraoperative.tubeOther = "";
          }

          if (content.intraoperative.temperature != "有") {
            content.intraoperative.facility1 = "";
            content.intraoperative.facility2 = "";
            content.intraoperative.facility3 = "";
            content.intraoperative.facility4 = "";
            content.intraoperative.facilityText = "";
          }
          if (content.intraoperative.specialRecords != '有') {
            content.intraoperative.special = ''
          }
          if(content.intraoperative.facility4 !=true){
            content.intraoperative.facilityText = "";
          }
          // TODO
          if ($('.' + this.idPrefix + ' .sign1img').length > 0) {
            $('.' + this.idPrefix + ' .sign1img').remove()
          }
          if ($('.' + this.idPrefix + ' .sign2img').length > 0) {
            $('.' + this.idPrefix + ' .sign2img').remove()
          }
          if ($('.' + this.idPrefix + ' .sign3img').length > 0) {
            $('.' + this.idPrefix + ' .sign3img').remove()
          }
          if ($('.' + this.idPrefix + ' .sign4img').length > 0) {
            $('.' + this.idPrefix + ' .sign4img').remove()
          }
          if ($('.' + this.idPrefix + ' .sign5img').length > 0) {
            $('.' + this.idPrefix + ' .sign5img').remove()
          }
          if ($('.' + this.idPrefix + ' .fcircuitNurseimg').length > 0) {
            $('.' + this.idPrefix + ' .fcircuitNurseimg').remove()
          }
          if ($('.' + this.idPrefix + ' .equmentNurseimg').length > 0) {
            $('.' + this.idPrefix + ' .equmentNurseimg').remove()
          }
          // let CaSignInfo = ["instrumentNurse", "operationRoom1", "recovery", "fcircuitNurse"];
          // let CaSignInfoCopy = JSON.parse(JSON.stringify(CaSignInfo));
          // if (val.data.signatureList) {
          //   val.data.signatureList.forEach(o => {
          //     if (o.signLabelName) {
          //       if ($('.' + this.idPrefix + ' .' + o.signLabelName + 'img').length > 0) {
          //         $('.' + this.idPrefix + ' .' + o.signLabelName + 'img').remove();
          //       }
          //       if (o.signature) {
          //         let dom =
          //           '<span class="' +
          //           o.signLabelName +
          //           'img delImg"><img class=signImgAneDoctor src="' +
          //           o.signature +
          //           '" /><i class="fa fa-remove delViceAneDoctor" data-userid=' +
          //           o.signLabelName +
          //           "></i></span>";
          //         $( '.' + this.idPrefix + ' .' + o.signLabelName + 'Name').append(dom);
          //       } else {
          //         let dom = `<span class="${o.signLabelName}img delDoctorOuter">${o.name}<i class="fa fa-remove delViceAneDoctor" data-userid=${o.signLabelName}></i></span>`;
          //         $( '.' + this.idPrefix + ' .' + o.signLabelName + 'Name').append(dom);
          //       }
          //     }
          //   });
          // }
          if (val.data.signatureList && val.data.signatureList.length > 0) {
            //(允许多个签名处理逻辑)
            // TODO
            let signInfo = val.data.signatureList;
            let fcircuitNurseArr = [],
              equmentNurseArr=[],
              sign1Arr=[],
              sign2Arr=[],
              sign3Arr=[],
              sign4Arr=[],
              sign5Arr=[];
            signInfo.forEach((k) => {
              if (k.signLabelName == "fcircuitNurse") {
                fcircuitNurseArr.push(k);
              }
              if (k.signLabelName == "equmentNurse") {
                equmentNurseArr.push(k);
              }
              if (k.signLabelName == "sign1") {
                sign1Arr.push(k);
              }
              if (k.signLabelName == "sign2") {
                sign2Arr.push(k);
              }
              if (k.signLabelName == "sign3") {
                sign3Arr.push(k);
              }
              if (k.signLabelName == "sign4") {
                sign4Arr.push(k);
              }
              if (k.signLabelName == "sign5") {
                sign5Arr.push(k);
              }
            });
            //初始化签名数组
            this.signMap["fcircuitNurse"] = fcircuitNurseArr;
            this.signMap["equmentNurse"] = equmentNurseArr;
            this.signMap["sign1"] = sign1Arr;
            this.signMap["sign2"] = sign2Arr;
            this.signMap["sign3"] = sign3Arr;
            this.signMap["sign4"] = sign4Arr;
            this.signMap["sign5"] = sign5Arr;

            let  i = 0;
            let  j=0;
            let  k=0;
            let  l=0;
            let  m=0;
            let n=0;
            let p=0;
            fcircuitNurseArr.forEach((o) => {
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
            equmentNurseArr.forEach((o) => {
              if (o.signLabelName) {
                if (o.signature) {
                  let dom = '<span class="' + o.signLabelName + 'img delImg"' + 'style="left: ' + j + 'px"><img class=signImgAneDoctor src="' + o.signature + '" /><i class="fa fa-remove delViceAneDoctor" data-userid=' + o.signerId + " data-usertype=" + o.signLabelName + "></i></span>";
                  $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
                  j += 70;
                } else {
                  let dom = `<span class="${o.signLabelName}img delDoctorOuter" style="left:${j}px">${o.name}<i class="fa fa-remove delViceAneDoctor" data-userid=${o.signerId} data-usertype=${o.signLabelName}></i></span>`;
                  $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
                  j += 70;
                }
              }
            });

            sign1Arr.forEach((o) => {
              if (o.signLabelName) {
                if (o.signature) {
                  let dom = '<span class="' + o.signLabelName + 'img delImg"' + 'style="left: ' + k + 'px"><img class=signImgAneDoctor src="' + o.signature + '" /><i class="fa fa-remove delViceAneDoctor" data-userid=' + o.signerId + " data-usertype=" + o.signLabelName + "></i></span>";
                  $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
                  k += 70;
                } else {
                  let dom = `<span class="${o.signLabelName}img delDoctorOuter" style="left:${k}px">${o.name}<i class="fa fa-remove delViceAneDoctor" data-userid=${o.signerId} data-usertype=${o.signLabelName}></i></span>`;
                  $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
                  k += 70;
                }
              }
            });
            sign2Arr.forEach((o) => {
              if (o.signLabelName) {
                if (o.signature) {
                  let dom = '<span class="' + o.signLabelName + 'img delImg"' + 'style="left: ' + l + 'px"><img class=signImgAneDoctor src="' + o.signature + '" /><i class="fa fa-remove delViceAneDoctor" data-userid=' + o.signerId + " data-usertype=" + o.signLabelName + "></i></span>";
                  $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
                  l += 70;
                } else {
                  let dom = `<span class="${o.signLabelName}img delDoctorOuter" style="left:${l}px">${o.name}<i class="fa fa-remove delViceAneDoctor" data-userid=${o.signerId} data-usertype=${o.signLabelName}></i></span>`;
                  $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
                  l += 70;
                }
              }
            });
            sign3Arr.forEach((o) => {
              if (o.signLabelName) {
                if (o.signature) {
                  let dom = '<span class="' + o.signLabelName + 'img delImg"' + 'style="left: ' + m + 'px"><img class=signImgAneDoctor src="' + o.signature + '" /><i class="fa fa-remove delViceAneDoctor" data-userid=' + o.signerId + " data-usertype=" + o.signLabelName + "></i></span>";
                  $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
                  m += 70;
                } else {
                  let dom = `<span class="${o.signLabelName}img delDoctorOuter" style="left:${m}px">${o.name}<i class="fa fa-remove delViceAneDoctor" data-userid=${o.signerId} data-usertype=${o.signLabelName}></i></span>`;
                  $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
                  m += 70;
                }
              }
            });
            sign4Arr.forEach((o) => {
              if (o.signLabelName) {
                if (o.signature) {
                  let dom = '<span class="' + o.signLabelName + 'img delImg"' + 'style="left: ' + n + 'px"><img class=signImgAneDoctor src="' + o.signature + '" /><i class="fa fa-remove delViceAneDoctor" data-userid=' + o.signerId + " data-usertype=" + o.signLabelName + "></i></span>";
                  $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
                  n += 70;
                } else {
                  let dom = `<span class="${o.signLabelName}img delDoctorOuter" style="left:${n}px">${o.name}<i class="fa fa-remove delViceAneDoctor" data-userid=${o.signerId} data-usertype=${o.signLabelName}></i></span>`;
                  $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
                  n += 70;
                }
              }
            });
            sign5Arr.forEach((o) => {
              if (o.signLabelName) {
                if (o.signature) {
                  let dom = '<span class="' + o.signLabelName + 'img delImg"' + 'style="left: ' + p + 'px"><img class=signImgAneDoctor src="' + o.signature + '" /><i class="fa fa-remove delViceAneDoctor" data-userid=' + o.signerId + " data-usertype=" + o.signLabelName + "></i></span>";
                  $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
                  p += 70;
                } else {
                  let dom = `<span class="${o.signLabelName}img delDoctorOuter" style="left:${p}px">${o.name}<i class="fa fa-remove delViceAneDoctor" data-userid=${o.signerId} data-usertype=${o.signLabelName}></i></span>`;
                  $("." + this.idPrefix + " ." + o.signLabelName + "Name").append(dom);
                  p += 70;
                }
              }
            });
          } else {
            this.signMap["fcircuitNurse"] = [];
            this.signMap["equmentNurse"] = [];
            this.signMap["sign1"] = [];
            this.signMap["sign2"] = [];
            this.signMap["sign3"] = [];
            this.signMap["sign4"] = [];
            this.signMap["sign5"] = [];
          }
          // 检查必填项
          this.checkRequired(val, this.mustFill, false,this.notMustFill || null);
          if (this.cancelCom) {
            let resCom = JSON.parse(sessionStorage.getItem('user'));
            resCom.typeCode = this.typeCode;
            this.opeNurseRecordComp.saveDocument(resCom);
            this.cancelCom = false;
          }
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
      me[`printReadStatus_${me.randomSuffix}`] = "no";
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
      textareaBaseStyle(val,id,limitWidth){
        let dom = document.getElementById(id);
        if (dom) {
          let valueWidth = AimsUtils.getStrLength(val, 17);
          if (valueWidth > limitWidth){
            dom.style.fontSize = 12 + "px";
            if (AimsUtils.getStrLength(val, 12) > limitWidth) {
              dom.style.lineHeight = 13 + "px";
            }else {
              dom.style.lineHeight = 27 + "px";
            }
          }else {
            dom.style.fontSize = 17 + "px";
            dom.style.lineHeight = 27 + "px";
          }
        }
      },
      openPatientHandover(){
        let me = this;
        let origin = window.location.origin;
        window.open(`${origin}/#/operatingroom/patient/documentlist?patientid=${me.params.PATIENT_SYNC_ID}&registerid=${me.params.REGISTER_ID}`)
      },
      // TODO
      deleteTime(){
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

              if (data[i].eventName == "准备出手术间" && key == 4) {
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
      refreshBloodInfusion(key) {
        let me = this;
        if (me.submitStatus == '1') return
        axios.get(
          "anesthesia/record/bloodInfusion/" + me.conifgContent.PATIENT_ID,
          {}
        )
          .then(res => {
            let data = res.data.data;
            let result = me.getDosageData(data);
            me.evalSyncData(key, result, true);
            let patientInfo = me.oldData.patientInfo;
            me.oldData = me.cloneObjectFn(me.data.data.content);
            me.oldData.patientInfo = patientInfo;
          })
          .catch(error => {})
      },
      evalSyncData(key, data, isinit) {
        let me = this;
        let item1 = ['infusion'];
        let item2 = ['Cells', 'plasma', 'precipitate', 'Platelet', 'OtherBloodType'];
        let item3 = ['hemorrhage', 'urineOther','ureternub'];
        let flag = false;
        if (isinit && me.data.data.content.intraoperative.BloodTransfusion == "") {  // 是初始化数据
          for (let m = 0; m < item2.length; m++) {
            if (data.blood[item2[m]]) {
              flag = true;
              break;
            }
          }
          if (flag) {
            me.data.data.content.intraoperative.BloodTransfusion = "有";
          }
        }
        if (key == 'infusion') {
          me.data.data.content.intraoperative.infusion = data.infusion;
        } else {
          if (me.data.data.content.intraoperative.infusion == "") {
            me.data.data.content.intraoperative.infusion = data.infusion;
          }
        }

        let multivalueCompObj = me.opeNurseRecordComp.contentInfo.commonContent[me.idPrefix + '-multivaluecomp'].multivalueCompObj;
        if (data.blood.bloodType == null) {
          data.blood.bloodType = ''
        }
        if (key == 'bloodType') {
          multivalueCompObj['bloodType'].setFieldValue(data.blood.bloodType);
          me.data.data.content.patientInfo.bloodType = data.blood.bloodType;
        } else {
          if (me.data.data.content.patientInfo.bloodType == "") {
            multivalueCompObj['bloodType'].setFieldValue(data.blood.bloodType);
            me.data.data.content.patientInfo.bloodType = data.blood.bloodType;
          }
        }
        if(data.anesTypeCode!=null&&data.anesTypeCode!=""){
          if(key=='anesTypeName'){
            multivalueCompObj['anesTypeName'].setFieldValue(data.anesTypeCode);
            me.data.data.content.basicInformation.anesTypeName = data.anesTypeCode;
          }

        }

        if (me.data.data.content.intraoperative.BloodTransfusion == "有") {
          for (let i = 0; i < item2.length; i++) {
            if (key == item2[i]) {
              me.data.data.content.intraoperative[item2[i]] = data.blood[item2[i]];
            } else {
              if (me.data.data.content.intraoperative[item2[i]] == "") {
                me.data.data.content.intraoperative[item2[i]] = data.blood[item2[i]];
              }
            }
          }
        }

        for (let j = 0; j < item3.length; j++) {
          if (key == item3[j]) {
            if(key=='ureternub'){
              if(data.output.ureternub=='未置导尿管'){
                me.data.data.content.intraoperative.ureter='无';
              }else if(data.output.ureternub!==''&&data.output.ureternub!==null){
                me.data.data.content.intraoperative.ureter='有';
              }
            }
            me.data.data.content.intraoperative[item3[j]] = data.output[item3[j]];
          } else {
            if (me.data.data.content.intraoperative[item3[j]] == "") {
              if(data.output.ureternub=='未置导尿管'){
                me.data.data.content.intraoperative.ureter='无';
              }else if(data.output.ureternub!==''&&data.output.ureternub!==null){
                me.data.data.content.intraoperative.ureter='有';
              }
              me.data.data.content.intraoperative[item3[j]] = data.output[item3[j]]?data.output[item3[j]]:'';
            }
          }
        }

      },
      getDosageData(data) {
        let me = this;
        let totalStrArr = [];
        //晶体合计
        if (data.crystalTotal && data.crystalTotal.length > 0) {
          let crystalTotalStr = `晶体：${data.crystalTotal}`
          totalStrArr.push(`${crystalTotalStr}`)
        }
        //胶体合计
        let colloidTotalStr = ''
        if (data.colloidTotal && data.colloidTotal.length > 0) {
          let colloidTotalStr = `胶体：${data.colloidTotal}`
          totalStrArr.push(`${colloidTotalStr}`)
        }
        let cells = 0;  // 红细胞
        let plasma = 0;  // 血浆
        let precipitate = '';  // 冷沉淀
        let Platelet = 0;  // 血小板
        let OtherBloodType = [];  // 其他
        // "inBloodArr": ["红细胞悬液：10U", "机采血小板：15U"],
        if (data.inBloodArr && data.inBloodArr.length > 0) {
          for (let j = 0; j < data.inBloodArr.length; j++) {
            let bloodItem = data.inBloodArr[j];
            let bloodItems = data.inBloodArr[j].split('：');
            let dosage = parseFloat(bloodItems[1]);
            let dosageUnitName = bloodItems[1].substring(dosage.toString().length);
            if (bloodItems[0] == '红细胞悬液' || bloodItems[0] == '全血' || bloodItems[0] == '洗涤红细胞') {
              cells += me.unitConversion(dosageUnitName, 'U', dosage);
            } else if (bloodItems[0] == '新鲜冰冻血浆' || bloodItems[0] == '普通冰冻血浆') {
              plasma += me.unitConversion(dosageUnitName, 'ml', dosage);
            } else if (bloodItems[0] == '冷沉淀') {
              precipitate = bloodItems[1];
            } else if (bloodItems[0] == '机采血小板' || bloodItems[0] == '手工分血小板') {
              Platelet += me.unitConversion(dosageUnitName, 'U', dosage);
            } else {
              OtherBloodType.push(data.inBloodArr[j]);
            }
          }
        }
        return {
          infusion: totalStrArr.join('；'),
          blood: {
            bloodType: data.bloodType,
            Cells: (cells ? `${cells}U` : ''),
            plasma: (plasma ? `${plasma}ml` : ''),
            precipitate: precipitate,
            Platelet: (Platelet ? `${Platelet}U` : ''),
            OtherBloodType: OtherBloodType.join('；')
          },
          output: {
            ureternub:data.urineVolume,
            hemorrhage: data.bloodVolume,
            urineOther: data.fluid
          },
          anesTypeCode:data.anesTypeCode
        }
      },
      deleteBloodInfusion(key) {
        let me = this;
        if (me.submitStatus == '0') {
          // TODO
          // me.data.data.content.intraoperative[key]
          switch (key) {
            case "infusion" :
              me.data.data.content.intraoperative.infusion = "";
              break;
            case "Cells" :
              me.data.data.content.intraoperative.Cells = "";
              break;
            case "plasma" :
              me.data.data.content.intraoperative.plasma = "";
              break;
            case "precipitate" :
              me.data.data.content.intraoperative.precipitate = "";
              break;
            case "Platelet" :
              me.data.data.content.intraoperative.Platelet = "";
              break;
            case "OtherBloodType" :
              me.data.data.content.intraoperative.OtherBloodType = "";
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
            case "bloodType" :
              let multivalueCompObj = me.opeNurseRecordComp.contentInfo.commonContent[me.idPrefix + '-multivaluecomp'].multivalueCompObj;
              let temp = multivalueCompObj['bloodType'];
              temp.removeAllRec(temp);
              me.data.data.content.patientInfo.bloodType = "";
              break;
            default :
              break;
          }
        }
      },
      /**
       * 血量单位换算关系
       * @param {String}   inputUnit    换算前单位(L,ml,KU,U,IU,万U)
       * @param {String}   outputUnit    换算后单位(L,ml,KU,U)
       * @param {String}   inputNum    换算前数值
       */
      unitConversion: function(inputUnit, outputUnit, inputNum) {
        let me = this;
        var outputNum = Number(inputNum);
        if (inputUnit === 'ml' && outputUnit === 'ml') {
          outputNum = Number(inputNum);
        }
        if (inputUnit === '单位' && outputUnit === 'ml') {
          outputNum = 200 * Number(inputNum);
        }
        if (inputUnit === 'U' && outputUnit === 'ml') {
          outputNum = 200 * Number(inputNum);
        }
        if (inputUnit === 'IU' && outputUnit === 'ml') {
          outputNum = 200 * Number(inputNum);
        }
        if (inputUnit === 'ml' && outputUnit === 'U') {
          outputNum = Number(inputNum) / 200;
        }
        if (inputUnit === 'KU' && outputUnit === 'ml') {
          outputNum = 1000 * 200 * Number(inputNum);
        }
        if (inputUnit === 'KU' && outputUnit === 'U') {
          outputNum = 1000 * Number(inputNum);
        }
        if (inputUnit === 'KU' && outputUnit === 'IU') {
          outputNum = 1000 * Number(inputNum);
        }
        if (inputUnit === '万U' && outputUnit === 'ml') {
          outputNum = 10000 * 200 * Number(inputNum);
        }
        if (inputUnit === '万U' && outputUnit === 'U') {
          outputNum = 10000 * Number(inputNum);
        }
        if (inputUnit === '万U' && outputUnit === 'IU') {
          outputNum = 10000 * Number(inputNum);
        }
        return outputNum;
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
                res.data.data.content.basicInformation =
                  me.data.data.content.basicInformation;
                me.data.data.content = res.data.data.content;
                me.opeNurseRecordComp.contentInfo.initData({
                  operationName: me.data.data.content.basicInformation.operationName,
                  anesTypeName: me.data.data.content.basicInformation.anesTypeName,
                  bloodType: me.data.data.content.patientInfo.bloodType,
                  roomName: me.data.data.content.patientInfo.roomName,
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
                    if (key && new Date(key).getTime() < new Date(time).setSeconds("00")) {
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

      showSignWinAfterCb(step){
        let me = this;
        let currtTime = Ext.Date.format(new Date(), "Y-m-d H:i");
        if (step === "fcircuitNurse") {
          let fcircuitNurseTime = Ext.Date.format(new Date(), "Y-m-d H:i");
          me.data.data.content.sign.fcircuitNurseTime = fcircuitNurseTime;
        }

        if(step==="sign1"){
          me.time1 = currtTime;
        }else if(step==="sign2"){
          me.time2 = currtTime;
        }else if(step==="sign3"){
          me.time3 = currtTime;
        }else if(step==="sign4"){
          me.time4 = currtTime;
        }else if(step==="sign5"){
          me.time5 = currtTime;
        }
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
      //打开签名窗口
      showSignWin(userTypeText, userTypeValue, step, typeName) {
        const me = this;
        let requiredFlag= me.checkRequire();
        let noticeId = me.params.NOTICE_ID || me.res.NOTICE_ID;
        let details = CommonComp.ajaxAttributeList({ scope: "surgery", categoryName: "手术取消", attachId: noticeId || "123" });
        if (details.length && details[0].value && details[0].value.data && details[0].value.data.length && details[0].value.data[0].id == "1") {
          requiredFlag = true;
        }
        if (me.submitStatus == "0") {
          console.log(step);

          if (step == "fcircuitNurse") {
            if(!requiredFlag){
              return;
            }
            if (me.signMap[step].length >= 4) {
              AimsUtils.alert("最多允许四个巡回护士签名！", 3);
              return;
            }
          }
          if (step == "equmentNurse") {
            if(!requiredFlag){
              return;
            }
            if (me.signMap[step].length >= 4) {
              AimsUtils.alert("最多允许四个器械护士签名！", 3);
              return;
            }
          }
          // TODO
          if (step == "sign1") {
            if (me.signMap[step].length >= 1) {
              AimsUtils.alert("最多允许一个护士签名！", 3);
              return;
            }
          }
          if (step == "sign2") {
            if (me.signMap[step].length >= 1) {
              AimsUtils.alert("最多允许一个护士签名！", 3);
              return;
            }
          }
          if (step == "sign3") {
            if (me.signMap[step].length >= 1) {
              AimsUtils.alert("最多允许一个护士签名！", 3);
              return;
            }
          }
          if (step == "sign4") {
            if (me.signMap[step].length >= 1) {
              AimsUtils.alert("最多允许一个护士签名！", 3);
              return;
            }
          }
          if (step == "sign5") {
            if (me.signMap[step].length >= 1) {
              AimsUtils.alert("最多允许一个护士签名！", 3);
              return;
            }
          }
          let data = me.data.data;
          data.typeCode = "4dc8122a96f44c20ab46bc1f86fe98da";
          data.patientId = me.conifgContent.PATIENT_ID;
          data.orDeptId = me.conifgContent.SURGERYROOM_ID;
          let res = JSON.parse(sessionStorage.getItem("user"));
          if (data.id == "") {
            data.creatorId = res.userId;
            data.modifierId = res.userId;
          } else {
            data.modifierId = res.userId;
          }
          delete data.valid;
          const axiosData = me.cloneObjectFn(data);
          axios
            .post("/patient/comm/document", {
              params: axiosData,
            })
            .then((res) => {
              if (me.disabled == true) {
                return;
              }
              me.id = res.data.data.id;
              let businessData = {
                documentId: res.data.data.id,
                patientId: me.conifgContent.PATIENT_ID,
                bizType: me.typeCode,
                signLabelName: step,
                isAdd: true,
                dataSign: Ext.encode(me.data.data.content),
                signLabel: "护理记录单" + "(" + typeName + ")",
              };
              Ext.create("Ext.sign.SignWindow", {
                title: "签名",
                userTypeValue: userTypeValue, //surgeryDoctor,surgeryNurse,aneDoctor
                userTypeText: userTypeText, //手术医生,手术护士,麻醉医生
                userInfo: res,
                businessData: businessData,
                signCb(userData) {
                  let signatureListArr = me.signMap[step];
                  // AIMS5-7354 术前访视签字后不显示 liush 2020-01-03
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
                    signType: 1,
                    signature: userData.signature,
                    signerId: userData.id,
                  };
                  me.data.data.signatureList.push(copySign);
                  if (me.showSignWinAfterCb) me.showSignWinAfterCb(step);

                  me.deleteSign();
                  me.saveSignCb();
                },
              }).show();
            })
            .catch((err) => {});
        }
      },
      checkRequire(){
        let me=this;
        let requiredArr = [{
          "path": "content.basicInformation",
          "key": "surgeryEntryTime",
          "value": ""
        }, {
          "path": "content.basicInformation",
          "key": "surgeryBeginTime",
          "value": ""
        }, {
          "path": "content.basicInformation",
          "key": "surgeryEndTime",
          "value": ""
        }, {
          "path": "content.patientInfo",
          "key": "isEmergency",
          "value": ""
        }, {
          "path": "content.basicInformation",
          "key": "anesTypeName",
          "value": ""
        }, {
          "path": "content.basicInformation",
          "key": "operationName",
          "value": ""
        }, {
          "path": "content.basicInformation",
          "key": "fluidCirculation",
          "value": ""
        }, {
          "path": "content.intraoperative",
          "key": "hemorrhage",
          "value": ""
        }, {
          "path": "content.intraoperative",
          "key": "urineOther",
          "value": ""
        }, {
          "path": "content.intraoperative",
          "key": "ureter",
          "value": ""
        }, {
          "path": "content.intraoperative",
          "key": "ureternub",
          "relation": "content.intraoperative.ureter",
          "relationValue": "有",
          "value": ""
        }, {
          "path": "content.intraoperative",
          "key": "drainage",
          "value": ""
        }, {
          "path": "content.intraoperative",
          "key": "tube",
          "value": ""
        }, {
          "path": "content.intraoperative",
          "key": "tubeOther",
          "relation": "content.intraoperative.tube",
          "relationValue": "有",
          "value": ""
        },  {
          "path": "content.intraoperative",
          "key": "implantation",
          "value": ""
        }, {
          "path": "content.intraoperative",
          "key": "hemostasis",
          "value": ""
        }, {
          "path": "content.intraoperative",
          "key": "hemostat",
          "value": ""
        }, {
          "path": "content.intraoperative",
          "key": "temperature",
          "value": ""
        }, {
          "path": "content.intraoperative",
          "key": "damageStatus",
          "value": ""
        }, {
          "path": "content.intraoperative",
          "key": "specialRecords",
          "value": ""
        }];
        let notRequiredArr = [];
        if(me.isCancelSurgery){

          requiredArr = requiredArr.filter(item=>{
            if(['surgeryBeginTime','surgeryEndTime'].includes(item.key)){
              notRequiredArr.push(item);
              return false;
            }
            return true;
          })
        }
        let requiredFlag = this.checkRequired(me.data, requiredArr, false,notRequiredArr);
        return requiredFlag;

      },
      deleteSignCb(signLabelName){
        let me = this;

        // if(signLabelName=='fcircuitNurse'){
        //   me.data.data.content.sign.fcircuitNurseTime = "";
        // }
        if(signLabelName=='sign1'){
          me.time1 = "";
        }
        if(signLabelName=='sign2'){
          me.time2 = "";
        }
        if(signLabelName=='sign3'){
          me.time3= "";
        }
        if(signLabelName=='sign4'){
          me.time4 = "";
        }
        if(signLabelName=='sign5'){
          me.time5 = "";
        }
      },
      focusV(res) {
        for (let aa in this.focus) {
          if (aa == res) {
            this.focus[aa] = true;
          } else {
            this.focus[aa] = false;
          }
        }
      },
      // bloodProductsC() {
      //   if (this.data.data.content.postoperatively.bloodProducts == "有") {
      //     this.focusV("bloodProducts");
      //   }
      // },
      // drugsC() {
      //   if (this.data.data.content.postoperatively.drugs == "有") {
      //     this.focusV("drugs");
      //   }
      // },

      changgeno(content) {
        this.focusV(content);
      },
      async loadOptions({ action }) {
        this.options = this.options;
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
      // TODO
      switchTimeFormat (time) {
        return new Date(+new Date(time)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'').slice(0,16);
      },
      // 初始化文书上要绑定多值组件的地方
      // 由 ContentInfo 外部调用
      initMultivalueConfig(data) {
        this.multivalueConfig = data;
      },
      //特殊校验必填项处理
      // checkRequiredCb(checkResult){
      //     if(checkResult.requiredArr){
      //       let content=this.data.data.content;
      //       for (let i = 0; i < checkResult.requiredArr.length; i++) {
      //             if(checkResult.requiredArr[i].className=='damageContent'){
      //               if(content.surgeryRisk.damage=='有'&&content.surgeryRisk.damageContent==''&&content.surgeryRisk.damageContent1==''&&content.surgeryRisk.damageContent2==''){
      //                 checkResult.requiredArr[i].required=false;
      //               }else{
      //                  checkResult.requiredArr[i].required=true;

      //               }

      //             }
      //             if(checkResult.requiredArr[i].className=='FallingRiskContent'){
      //               if(content.surgeryRisk.FallingRisk=='有'&&content.surgeryRisk.FallingRiskContent==''&&content.surgeryRisk.FallingRiskContent1==''&&content.surgeryRisk.FallingRiskContent2==''){
      //                 checkResult.requiredArr[i].required=false;
      //               }else{
      //                  checkResult.requiredArr[i].required=true;

      //               }
      //             }
      //             if(checkResult.requiredArr[i].className=='drainageContent'){
      //               if(content.intraoperative.drainage=='有'&&content.intraoperative.drainageContent==''&&content.intraoperative.drainageContent1==''&&content.intraoperative.drainageContent2==''&&content.intraoperative.drainageContent3==''){
      //                 checkResult.requiredArr[i].required=false;
      //               }else{
      //                  checkResult.requiredArr[i].required=true;
      //               }
      //             }
      //               if(checkResult.requiredArr[i].className=='specimenContent'){
      //               if(content.intraoperative.specimen=='有'&&content.intraoperative.specimenContent==''&&content.intraoperative.specimenContent1==''&&content.intraoperative.specimenContent2==''&&content.intraoperative.specimenContent3==''){
      //                 checkResult.requiredArr[i].required=false;
      //               }else{
      //                  checkResult.requiredArr[i].required=true;
      //               }
      //             }

      //               if(checkResult.requiredArr[i].className=='clearPoint'){
      //                 if(content.intraoperative.implantation=='有'&&content.intraoperative.clearPoint==''&&content.intraoperative.record==''){
      //                   checkResult.requiredArr[i].required=false;
      //                 }else{
      //                   checkResult.requiredArr[i].required=true;
      //                 }
      //               }
      //                 if(checkResult.requiredArr[i].className=='upper'){
      //                   if(content.intraoperative.hemostasis=='有'&&content.intraoperative.upper==''&&content.intraoperative.rightupper==''&&content.intraoperative.lower==''&&content.intraoperative.rightlower==''){
      //                     checkResult.requiredArr[i].required=false;
      //                   }else{
      //                     checkResult.requiredArr[i].required=true;
      //                   }
      //               }
      //                 if(checkResult.requiredArr[i].className=='tourniquet'){
      //                   if(content.intraoperative.hemostasis=='有'){
      //                     if((content.intraoperative.tourniquet!=''&&(content.intraoperative.tourniquetTime!=''&&content.intraoperative.tourniquetTime!=null)&&(content.intraoperative.tourniquetEndTime!=''&&content.intraoperative.tourniquetEndTime!=null))
      //                       ||(content.intraoperative.tourniquet1!=''&&(content.intraoperative.tourniquetTime1!=''&&content.intraoperative.tourniquetTime1!=null)&&(content.intraoperative.tourniquetEndTime1!=''&&content.intraoperative.tourniquetEndTime1!=null))){
      //                         checkResult.requiredArr[i].required=true;
      //                       }else{
      //                             checkResult.requiredArr[i].required=false;
      //                       }
      //                   }else{
      //                        checkResult.requiredArr[i].required=true;
      //                   }

      //               }
      //                  if(checkResult.requiredArr[i].className=='facility1'){
      //                   if(content.intraoperative.temperature=='有'&&content.intraoperative.facility1==''&&content.intraoperative.facility2==''&&content.intraoperative.facility3==''){
      //                     checkResult.requiredArr[i].required=false;
      //                   }else{
      //                     checkResult.requiredArr[i].required=true;
      //                   }
      //               }
      //       }
      //       let m=true;
      //      for (let index = 0; index < checkResult.requiredArr.length; index++) {
      //           if(checkResult.requiredArr[index].required==false){
      //             m=false;
      //           }
      //      }
      //      checkResult.requiredFlag=m;
      //    }
      // }
    }
  };
</script>
<style lang="less" scoped>
  @import "../../../../../../../static/css/common.less";
  @import url("../static/css/nurserecord.less");
  .analgesCon {
    border: 1px solid #000;
    border-collapse: collapse;
    margin-bottom: 22px;
    tr, td {
      border: 1px solid #000;
      box-sizing: border-box;
      padding: 3px !important;
    }

    td {
      text-align: left !important;
    }

    td.col1 {
      text-align: center !important;
    }

    input {
      border: none !important;
      text-align: center;
    }
    select {
      text-align: center;
      text-align-last: center;
      width: 100%;
      appearance:none;
      -moz-appearance:none;
      -webkit-appearance:none;
    }
  }

  .editor li {
    height: 30px;
    line-height: 30px;
    width:1018px;
    border-top-width: 0;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-left-width: 0;
    /* border-bottom-style: dotted;
    border-bottom-color: #690; */
    //  border-bottom:1px dashed;
    border-bottom: 1px dotted #000;

  }
  .editor{
    position: relative;
  }
  .editor textarea {
    position: absolute;
    word-break: break-all;
    border: none;
    width: 1018px;
    background: none;
    overflow:hidden;
    line-height: 30px;
    padding:0;
  }
  .box_relative {
    position: relative;
    line-height: 30px;
    z-index: 1000;
    margin-bottom: -31px;
    background: #ffffff;
    font-size: 17px;
  }
  .documentBody p {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    line-height: 18px;
    &:last-child {
      margin-bottom: 0;
    }

  }
  #surgeryShow {
    display: none;
  }

  @media print {
    select {
      appearance:none;
      -moz-appearance:none;
      -webkit-appearance:none;
    }
    .analgesCon {
      margin-bottom: 50px;
    }
    #surgeryShow {
      display: inline-block;
    }
    #surgeryHidden {
      display: none;
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
    color: #404040 !important;
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

  }
</style>
