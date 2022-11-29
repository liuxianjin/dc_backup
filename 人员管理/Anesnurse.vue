<template>
  <div
    class="anes-nurse dashboard-container extVueStyle"
    style="overflow-y: auto;overflow-x: hidden;"
  >
    <div class="need-maximization-el dashboard-legend block-container">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3 dashboard-legend-list">
            <div class="info-box">
              <span class="info-box-icon bg-aqua">
                <i class="fa fa-user"></i>
              </span>
              <div class="info-box-content" style="position: relative;">
                <span class="info-box-text">个人基本情况</span>
                <!-- <button type="button" class="btn btn-default btn-right" @click="changeUser($event)">
                  <i class="fa fa-users" style="color: #dd4b39;"></i>更改
                </button>
                <span class="info-box-row">姓名：{{personInfo.name+'（'+personInfo.jobNumber+'）'}}</span>-->
                <span class="info-box-row">
                  性别：{{{
                  1: '男',
                  2: '女'
                  }[personInfo.gender]}}
                </span>
                <span class="info-box-row">年龄：{{personInfo.age || ''}}</span>
                <span class="info-box-row">科室：{{personInfo.deptName || ''}}</span>
              </div>
            </div>
          </div>
          <div class="col-md-3 dashboard-legend-list">
            <div class="info-box">
              <span class="info-box-icon bg-red">
                <i class="fa fa-credit-card"></i>
              </span>
              <div class="info-box-content">
                <span class="info-box-text">职称情况</span>
                <span class="info-box-row">类型：{{personType[personInfo.type]}}</span>
                <span class="info-box-row">能级：{{personInfo.energyLevelName}}</span>
                <span class="info-box-row">职称：{{personInfo.jobTitle}}</span>
                <span class="info-box-row">职称获取时间：{{personInfo.jobTitleYear}}</span>
              </div>
            </div>
          </div>
          <div class="col-md-3 dashboard-legend-list">
            <div class="info-box">
              <span class="info-box-icon bg-green">
                <i class="fa fa-phone"></i>
              </span>
              <div class="info-box-content">
                <span class="info-box-text">联系方式情况</span>
                <span class="info-box-row">手机号：{{personInfo.phoneNumber || ''}}</span>
                <span class="info-box-row">微信号：{{personInfo.wechatNumber || ''}}</span>
                <span class="info-box-row">邮箱号：{{personInfo.email || ''}}</span>
              </div>
            </div>
          </div>
          <div class="col-md-3 dashboard-legend-list">
            <div class="info-box">
              <span class="info-box-icon bg-yellow">
                <i class="fa fa-tv"></i>
              </span>
              <div class="info-box-content">
                <span class="info-box-text">文书提交情况</span>
                <span class="info-box-row">术前访视完成率：88%</span>
                <span class="info-box-row">麻醉单完成率：95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row overflow-y">
      <section class="ext-tab col-md-12" v-if="tabConfig!=null">
        <vuetab :tabConfig="tabConfig" :optionCfg="optionCfg"></vuetab>
      </section>
    </div>
    <div class="row need-maximization-el">
      <section class="connectedSortable ui-sortable">
        <template v-if="chartConfigs && chartConfigs.length > 0">
          <!-- 去掉今日本月显示后,页面显示有问题 增加样式 liush -->
          <echartchild
            v-for="(citem) in chartConfigs"
            :style="citem.styleObject"
            :ref="'anes-'+citem.id"
            :data-id="citem.id"
            :chartConfig="citem"
            :key="citem.name"
            :prefix="prefix"
            :colSize="3"
            :minHeight="280"
            :optionCfg="optionCfg"
            periodType="month"
            :isNotShowHelp="false"
            @maximized="maximized"
          ></echartchild>
        </template>
      </section>
    </div>
  </div>
</template>
<script>
import VueTab from "../../components/cardchildren/VueTab";
import EChartChild from "../../components/cardchildren/EChartChild";
export default {
  name: "anes-nurse",
  data() {
    return {
      prefix: "anes",
      optionCfg: {
        userId: null,
        anDeptId: null,
        anDeptName: null,
        date: null
      },
      personInfo: {},
      personType: AimsConfig.personType(),
      tabConfig: null,
      chartConfigs: [],
      isMaximized: false,
      maxWidth: 0,
      maxHeight: 0,
      scrollTop: 0
    };
  },
  components: {
    echartchild: EChartChild,
    vuetab: VueTab
  },
  created() {
    let me = this;
    me.$bus.$on("supervisor.personnel.change", res => {
      me.optionCfg = res;
      me.tabConfig = null;
      me.chartConfigs = [];
      me.$nextTick(function() {
        me.initData();
      });
    });
  },
  beforeDestroy() {
    this.$bus.$off("supervisor.personnel.change");
    this.$bus.$emit(
      "patientItem",
      Object.assign({
        source: "supervisor.personnel",
        personInfo: null,
        prefix: this.prefix,
        title: `选择麻醉护士`,
        roleType: "aneNurse",
        emitEventName: "supervisor.personnel.change"
      })
    );
  },
  mounted() {
    let me = this;
    $(function() {
      $(".connectedSortable").sortable({
        placeholder: "sort-highlight",
        connectWith: ".connectedSortable",
        handle: ".box-header",
        forcePlaceholderSize: true,
        zIndex: 999999
      });
      $(".connectedSortable .box-header, .connectedSortable").css(
        "cursor",
        "move"
      );

      me.userInfo = me.$store.state.frame.user;
      me.getDefaultPerson();
    });
  },
  methods: {
    // 默认当前登录人员
    getDefaultPerson() {
      let me = this;
      // 获取当前登录人员下的麻醉科
      axios
        .get(`/portal/dept/roomtree/${this.userInfo.deptId}`, {
          params: { type: "anes" }
        })
        .then(res => {
          if (res.data.success == true) {
            let data = res.data.data;
            if (data && data.length > 0) {
              me.optionCfg.userId = me.userInfo.userId;
              me.optionCfg.anDeptId = data[0].id;
              me.optionCfg.anDeptName = data[0].name;
              me.optionCfg.date = AimsUtils.dateFormat(
                new Date(),
                "yyyy-MM-dd"
              );

              me.initData();
            }
          }
        });
    },
    initData() {
      let me = this;
      axios
        .get(
          `/supervisor/analysis/${me.prefix}/personnel/${me.optionCfg.userId}/${me.optionCfg.anDeptId}/all/${me.optionCfg.date}`,
          { params: { tabName: "年度麻醉护士工作量情况" } }
        )
        .then(res => {
          if (res.data.success == true) {
            me.operaData(res.data.data);
          }
        });
    },
    operaData(chartData) {
      let me = this,
        tabConfig = me.getTabConfing(),
        chartConfigs = me.getChartConfigs(),
        { tabData, data, personInfo } = chartData;

      if (personInfo) {
        Ext.apply(me.personInfo, {
          name: personInfo.name,
          age: AimsUtils.getAgeByBirth(personInfo.birthday),
          gender: personInfo.gender,
          birthday: personInfo.birthday,
          type: personInfo.type,
          email: personInfo.email,
          phoneNumber: personInfo.phoneNumber,
          wechatNumber: personInfo.wechatNumber,
          jobNumber: personInfo.jobNumber,
          jobTitle: personInfo.jobTitle,
          jobTitleYear: personInfo.jobTitleYear,
          energyLevelName: personInfo.energyLevelName,
          deptName: personInfo.deptName
        });
      }

      if (Ext.isArray(tabData) && tabData.length > 0) {
        // 处理年度手术室数据
        for (let t = 0; t < tabConfig.items.length; t++) {
          let temp = tabConfig.items[t];
          if (!temp.data) temp.data = [];
          for (let d = 0; d < tabData.length; d++) {
            if (tabConfig.title === tabData[d].name) {
              let v = tabData[d].value[temp.valueField];
              if (v && v > 0) temp.data.push([tabData[d].day, v]);
            }
          }
        }
        me.tabConfig = tabConfig;
      }

      // 图形数据
      if (Ext.isArray(chartConfigs) && chartConfigs.length > 0) {
        for (let c = 0; c < chartConfigs.length; c++) {
          let chart = chartConfigs[c];
          if (!chart.data) chart.data = [];
          for (let d = 0; d < data.length; d++) {
            if (chart.name === data[d].name) {
              if (chart.operaData)
                Object.assign(chart, chart.operaData(data[d].value), chart);
            }
          }
        }
        me.chartConfigs = chartConfigs;
      }

      me.$bus.$emit(
        "patientItem",
        Object.assign({
          prefix: me.prefix,
          source: "supervisor.personnel",
          personInfo: me.personInfo,
          optionCfg: me.optionCfg,
          title: `选择麻醉护士`,
          roleType: "aneNurse",
          emitEventName: "supervisor.personnel.change"
        })
      );
    },
    getTabConfing() {
      return {
        id: "anes-nurse-workload",
        task: "NurseWorkloadDay",
        title: "年度麻醉护士工作量情况",
        items: [
          { id: "pacu-cases", name: "复苏例数", valueField: "anesnub" },
          { id: "pacu-duration", name: "复苏时长", valueField: "anestime" }
        ],
        desc: [
          "按照每天复苏例数或复苏时长情况，将日历中每天的颜色用热度进行展示。",
          "颜色的深浅表明了该日的工作量情况。"
        ]
      };
    },
    // 统一处理 singelepie 的数据
    commonSinglePieOperaData(oData) {
      let legendData = [],
        data = [];
      if (oData) {
        for (let o = 0; o < oData.length; o++) {
          legendData.push(oData[o].name);
          data.push({
            value: oData[o].nub == null ? oData[o].value : oData[o].nub,
            name: oData[o].name
          });
        }
      }
      return { legendData, data };
    },
    commonGaugeOperaData(oData) {
      let data = [];
      if (oData) {
        data = oData;
        data[0].value = parseFloat(data[0].value);
      }
      return { data };
    },
    getChartConfigs() {
      let me = this;
      return [
        {
          name: "工作量情况（ASA级别）",
          task: "NurseWorkloadASAMonth",
          id: "anes-nurse-workload-asa",
          prefix: "anes",
          type: "singlepie",
          desc: [],
          legendData: [],
          data: [],
          operaData(oData) {
            return me.commonSinglePieOperaData(oData);
          }
        },
        {
          name: "工作量情况（麻醉方法）",
          task: "NurseWorkloadASAMonth",
          id: "anes-nurse-workload-anestype",
          prefix: "anes",
          type: "singlepie",
          desc: [],
          legendData: [],
          data: [],
          operaData(oData) {
            return me.commonSinglePieOperaData(oData);
          }
        },
        {
          name: "工作量情况（手术科室）",
          task: "NurseWorkloadDeptMonth",
          id: "anes-nurse-workload-surgerydept",
          prefix: "anes",
          type: "singlepie",
          desc: [],
          legendData: [],
          data: [],
          operaData(oData) {
            return me.commonSinglePieOperaData(oData);
          }
        },
        {
          name: "工作量情况（患者年龄段）",
          task: "NurseWorkloadAgeMonth",
          id: "anes-nurse-workload-age",
          prefix: "anes",
          type: "singlepie",
          desc: [],
          legendData: [],
          data: [],
          operaData(oData) {
            return me.commonSinglePieOperaData(oData);
          }
        },         
        {
          name: "复苏床位安排情况",
          task: "NurseWorkloadPacubedMonth",
          id: "anes-nurse-operating-room-arrange",
          prefix: "anes",
          type: "singlepie",
          desc: [],
          legendData: [],
          data: [],
          operaData(oData) {
            return me.commonSinglePieOperaData(oData);
          },
          styleObject: { clear: "both" }
        },
        {
          name: "工作时长情况（复苏时长）",
          task: "NurseWorkloadAgeMonth",
          id: "anes-nurse-workduration-come",
          prefix: "anes",
          type: "gauge",
          detail: { formatter: "{value} h" },
          data: [],
          operaData: me.commonGaugeOperaData
        },
        {
          name: "物资使用情况",
          id: "anes-nurse-material-use",
          prefix: "anes",
          type: "drug-sunburst",
          //minHeight: 340,
          desc: [
            "统计数据共分为两层：",
            "第一层：药品/耗材/器械",
            "第二层：麻醉物资分类名称",
            "第三层：麻醉物资名称",
            "扇形区域大小表明药品使用次数。"
          ]
        },
        {
          name: "复苏收费构成情况",
          id: "anes-nurse-fee",
          prefix: "anes",
          type: "singlepie",
          roseType: "area",
          //minHeight: 340,
          desc: [
            "分类统计麻醉相关收费占比情况：",
            "1、耗材费",
            "2、器械费",
            "3、操作费",
            "4、药品费",
            "扇形面积大小表明收费类型的占比程度。"
          ],
          data: [
            { value: 5, name: "耗材费" },
            { value: 15, name: "器械费" },
            { value: 25, name: "操作费" },
            { value: 30, name: "药品费" }
          ]
        }
      ];
    },
    fullScreen() {
      var dom = $(".extVueStyle")[0];
      dom.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    },
    maximized(e, type = "") {
      // box box-primary need-maximization-el
      let me = this,
        maxHeight =
          window.innerHeight -
          $(".main-header").height() -
          $(".content-header").height() -
          15 * 3, // 三个15的padding值
        maxEl = $(e.target)
          .parents(".box.box-primary")
          .parent(),
        dashboardLegendEl = $(".need-maximization-el.dashboard-legend"),
        // 第三块可拖拽部分 el
        uiSortableEl = $(".connectedSortable.ui-sortable").parents(
          ".need-maximization-el"
        ),
        extTabEl = $(".ext-tab").parent();

      let boxBodyEl = maxEl.find(".box-body");

      if (me.isMaximized) {
        maxHeight = me.maxHeight;
        dashboardLegendEl.css("display", "block");
        if (type === "extTab") uiSortableEl.css("display", "block");
        else {
          extTabEl.show();
          maxEl.siblings().show();
          maxEl.removeClass("col-md-12").addClass("col-md-3");
          maxEl.find(".box").css("margin-top", "15px");
        }
      } else {
        me.maxHeight = boxBodyEl.height();
        me.scrollTop = $(".dashboard-container").scrollTop();

        dashboardLegendEl.css("display", "none");
        if (type === "extTab") uiSortableEl.css("display", "none");
        else {
          extTabEl.hide();
          maxEl.siblings().hide();
          maxEl.removeClass("col-md-3").addClass("col-md-12");
          maxEl.find(".box").css("margin-top", "0px");
        }

        let headerHeight = maxEl.find(".box-header").outerHeight();

        maxHeight = maxHeight - headerHeight - 20 - 5;
      }

      boxBodyEl.height(maxHeight);

      // 重新渲染页面 保持最大化
      // if (type === "extTab") {
      //   if (me.extTabObj) {
      //     me.extTabObj.destroy();
      //     me.extTabObj = null;
      //     me.renderExtTab(maxHeight);
      //   }
      // }
      //  else {
      //   let maxElId = maxEl.data("id");
      //   me.$refs[me.prefix + "-" + maxElId][0].chart.resize();
      // }

      me.isMaximized = !me.isMaximized;

      // 处理滚动条
      if (!me.isMaximized) {
        $(".dashboard-container").scrollTop(me.scrollTop);
      }
    },
    /**
     * 加载文书到 渲染到ext组件中
     */
    loadVueComp(extComp) {
      let me = this;
      new me.$bus.constructor({
        el: extComp.getEl().child("div").dom,
        template: `<thermalpower :id="id" :name="name"></thermalpower>`,
        data: {
          id: extComp.itemId,
          name: extComp.title
        },
        components: {
          thermalpower: Thermalpower
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.anes-nurse {
  .dashboard-legend {
    .container-fluid {
      padding: 0;
    }
    .dashboard-legend-list {
      margin-bottom: 20px;
      height: 114px;
      padding: 0px 10px;
      min-width: 340px;
      & > div {
        height: 100%;
        .info-box-icon {
          font-size: 56px;
          width: 114px;
          height: 114px;
          line-height: 114px;
        }
        .info-box-content {
          padding: 3px 10px;
          margin-left: 114px;
          .info-box-row {
            display: block;
            font-size: 13px;
            color: #999999;
            font-weight: 400;
            height: 21px;
            line-height: 21px;
          }
          .info-box-text {
            font-size: 16px;
            font-weight: 500;
          }
          span {
            font-size: 14px;
          }
          .info-box-number-inline {
            font-weight: bold;
            font-size: 13px;
            color: #333333;
          }
          .btn-right {
            position: absolute;
            top: 3px;
            right: 3px;
            padding: 3px 5px;
            i {
              margin-right: 3px;
            }
          }
        }
      }
    }
  }
}
@import "../../assets/common.less";
</style>
