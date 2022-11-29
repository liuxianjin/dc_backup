// 类与对象 创建 UI 控件
// 不使用任何“类”辅助库或者语法的情况下，使用纯JavaScript 实现类风格的代码：
// 父类
/*
function Widget(width, height) {
  this.width = width || 50;
  this.height = height || 50;
  this.$ele = null;
}

Widget.prototype.render = function($where) {
  if (this.$ele) {
    this.$ele.css({
      width: this.width + "px",
      height: this.height + "px"
    }).appendTo($where);
  }
};

//子类
function Button(width, height, label) {
  // "super"调用
  Widget.call(this, width, height);
  this.label = label || "Default";
  this.$ele = $("button").text(label);
}

//让button继承Widget
Button.prototype = Object.create(Widget.prototype);
//重写render方法
Button.prototype.render = function($where) {
  //"super"调用
  Widget.prototype.render.call(this, $where);
  this.$ele.click(this.onClick.bind(this));
};
Button.prototype.onClick = function(e) {
  console.log("Button" + this.label + "cilcked");
};

$(document).ready(function() {
  var $body = $(document.body);
  var btn1 = new Button(50, 30, "Hello");
  var btn2 = new Button(50, 30, "World");
  btn1.render($body);
  btn2.render($body);
});
*/
// ES6语法糖
/*
class Widget {
  constructor(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$ele = null;
  }

  render($where) {
    if (this.$ele) {
      this.$ele.css({
        width: this.width + "px",
        height: this.height + "px"
      }).appendTo($where);
    }
  }
}

class Button extends Widget {
  constructor(width, height, label) {
    super(width, height);
    this.label = label || "Default";
    this.$ele = $("button").text(this.label);
  }

  render($where) {
    super.render($where);
    this.$ele.click(this.onClick.bind(this));
  }

  onClick(e) {
    console.log("Button" + this.label + "cilcked");
  }
}
$(document).ready(function() {
  var $body = $(document.body);
  var btn1 = new Button(50, 30, "Hello");
  var btn2 = new Button(50, 30, "World");
  btn1.render($body);
  btn2.render($body);
})

 */
//事件委托
var Widget = {
  init(width, height) {
    this.width = width;
    this.height = height;
    this.$ele = null;
  },
  render($where) {
    if (this.$ele) {
      this.$ele.css({
        widht: this.width + "px",
        height: this.height + "px"
      }).appendTo($where);
    }
  }
};

var Button = Object.create(Widget);
Button.setup = function(width, height, label) {
  // 委托调用
  this.init(width, height);
  this.label = label;
  this.$ele = $("button").text(label);
};
Button.build = function($where) {
  // 委托调用
  this.render($where);
  this.$ele.click = this.onClick.bind(this);
};
Button.onClick = function(e) {
  console.log("Button" + this.label + "cilcked");
};

$(document).ready(function() {
  var $body = $(document.body);
  var btn1 = Object.create(Button);
  btn1.setup(50, 30, "Hello");
  var btn2 = Object.create(Button);
  btn2.setup(50, 30, "World");
  btn1.render($body);
  btn2.render($body);
});

let arr = {
  "required": {
    "items": [{ "key": "special", "path": "content.anaesthesiabl", "value": "" }, {
      "key": "doctorName",
      "path": "content.anaesthesiabl",
      "value": "",
      "isSign": "sign"
    }, { "key": "generalAnesthesia", "path": "content.anaesthesiaTopl", "value": "" }, {
      "key": "induce",
      "path": "content.anaesthesiaTopl",
      "value": ""
    }], "isAllRequired": false
  },
  "patientInfo": {
    "age": "",
    "name": "无名氏0913.11",
    "gender": "男",
    "deptName": "郑州市第一人民医院航空港院区",
    "bedNumber": null,
    "admissionNumber": null
  },
  "anaesthesiaHo": {
    "r": "",
    "hr": "",
    "bp1": "",
    "bp2": "",
    "spo2": "",
    "breath": { "ett": "", "auto": "", "auxiliary": "", "tracheostomy": "" },
    "remarks": "",
    "takeinId": "",
    "handoverId": "",
    "takeinName": "",
    "takeinSign": "",
    "takeinTime": "",
    "handoverName": "",
    "handoverSign": "",
    "consciousness": ""
  },
  "anaesthesiabl": {
    "other": "",
    "special": "",
    "doctorId": [],
    "doctorName": [],
    "doctorSign": [],
    "otherInput": "",
    "anaphylaxis": "",
    "centralVein": ""
  },
  "anaesthesiaTopl": {
    "ecmo": "",
    "iabp": "",
    "loop": "",
    "depth": "",
    "plane": "",
    "route": "",
    "NaHCO3": "",
    "induce": "快诱导",
    "method": "",
    "plane1": "",
    "cannula": "",
    "loopTime": "",
    "blockTime": "",
    "equipment": "",
    "loopother": "",
    "placement": "",
    "puncture1": "",
    "puncture2": "",
    "puncture3": "",
    "puncture4": "",
    "puncture5": "",
    "puncture6": "",
    "puncture7": "",
    "puncture8": "",
    "puncture9": "",
    "colorGuide": "",
    "loopExpand": true,
    "nerveblock": "",
    "placement1": "",
    "puncture10": "",
    "ultrasound": "",
    "complexJump": "",
    "hardOutside": "",
    "catheterType": "",
    "hardOutside1": "",
    "machinefluid": "",
    "analgesicFlow": "",
    "analgesicMode": "",
    "analgesicTime": "",
    "analgesicType": "",
    "catheterModel": "",
    "colorGuidance": "",
    "electricShock": "",
    "hyperGuidance": "",
    "puncturePoint1": "",
    "puncturePoint2": "",
    "puncturePoint3": "",
    "puncturePoint4": "",
    "puncturePoint5": "",
    "puncturePoint6": "",
    "puncturePoint7": "",
    "puncturePoint8": "",
    "puncturePoint9": "",
    "puncturingType": "",
    "catheterization": "",
    "lndwellingDepth": "",
    "puncturePoint10": "",
    "puncturingPoint": "",
    "puncturingType1": "",
    "ultrafiltration": "",
    "analgesicFormula": "",
    "arterialPuncture": "",
    "catheterization1": "",
    "catheterization2": "",
    "catheterization3": "",
    "deepVeinPuncture": "",
    "lndwellingDepth1": "",
    "puncturingNeedle": "",
    "puncturingPoint1": "",
    "generalAnesthesia": "全身麻醉",
    "lnvasiveOperation": "",
    "puncturingNeedle1": "",
    "stimulateGuidance": "",
    "ventricularassist": "",
    "electricShockCount": "",
    "laryngealMaskCheck": "",
    "laryngealMaskModel": "",
    "trachealIntubation": "",
    "analgesicFormulaObj": [],
    "intraspinalAneInput": "",
    "catheterizationdeep1": "",
    "catheterizationdeep2": "",
    "catheterizationdeep3": "",
    "intraspinalAnesthesia": "",
    "intraoperativeLocation": "",
    "postoperativeAnalgesia": "",
    "arterialPunctureContent": "",
    "deepVeinPunctureContent": "",
    "lnvasiveOperationExpand": true,
    "catheterizationDirection1": "",
    "catheterizationDirection2": "",
    "catheterizationDirection3": "",
    "postoperativeAnalgesiaExpand": true
  },
  "anaesthesiaTopr": {
    "reflex": "",
    "remarks": "",
    "recovery": "",
    "whereabouts": "",
    "consciousness": "",
    "directingForce": "",
    "anestheticPlane": "",
    "whereaboutsInput": "",
    "anesthesiaEffectEvaluation": ""
  }
};

let o = {
  "required": { "items": [], "isAllRequired": true },
  "A3zygeaVj": { "id": "A3zygeaVj", "value": "172", "format": null },
  "F4WzZdCoF": { "id": "F4WzZdCoF", "value": "3", "format": null },
  "GXqPa2KBN": { "id": "GXqPa2KBN", "value": "4F", "format": null },
  "JN-h6TrlA": { "id": "JN-h6TrlA", "value": "2", "format": null },
  "KSbP5st8E": { "id": "KSbP5st8E", "value": "4", "format": null },
  "L3fmg3bwU": { "id": "L3fmg3bwU", "value": "11", "format": null },
  "YH1ADRmcp": { "id": "YH1ADRmcp", "value": "7", "format": null },
  "YksVUUZgX": {
    "id": "YksVUUZgX",
    "value": null,
    "format": "AN",
    "element": {
      "id": "56ee400044c611ebb9a9ff171c832719",
      "code": { "internal": "", "dataElement": "emr.patient.diagnosis" },
      "name": "诊断",
      "type": "element",
      "labels": null,
      "attributes": []
    }
  },
  "Z4v9bxmWO": { "id": "Z4v9bxmWO", "value": "8", "format": null },
  "dAhIwKdZB": {
    "id": "dAhIwKdZB",
    "value": [{
      "code": "fe48f0e0262511ea8a7943e687b80196",
      "name": "造影导管",
      "spec": "4F",
      "alias": "ZYDG",
      "isFee": 1,
      "price": 172,
      "valid": 1,
      "syncId": null,
      "barcode": null,
      "isAgent": 0,
      "isValued": 1,
      "supplier": "国药控股",
      "typeCode": null,
      "unitName": "",
      "userCode": null,
      "priceUnit": "",
      "sortNumber": 407,
      "description": "导管",
      "manufacturer": "",
      "registrationNo": "国械注进20173771812",
      "sterilizationIndate": null
    }],
    "format": null
  },
  "ioOf0AUb2": { "id": "ioOf0AUb2", "value": "10", "format": null },
  "jZd44Qxhx": { "id": "jZd44Qxhx", "value": "13", "format": null },
  "kvo-NnCAh": { "id": "kvo-NnCAh", "value": "1", "format": null },
  "mdEGhQbcU": { "id": "mdEGhQbcU", "value": "5", "format": null },
  "ng4lRzTCU": { "id": "ng4lRzTCU", "value": "国械注进20173771812", "format": null },
  "p_qcE6PAr": { "id": "p_qcE6PAr", "value": "14", "format": null },
  "r3-rs6cMu": { "id": "r3-rs6cMu", "value": "12", "format": null },
  "rvAWmvF4k": { "id": "rvAWmvF4k", "value": "6", "format": null },
  "ETWehqjXmK": { "id": "ETWehqjXmK", "items": {}, "value": "是 否" },
  "G6PsQqNpgt": { "id": "G6PsQqNpgt", "value": "国药控股", "format": null },
  "GkOYErOGI3": { "id": "GkOYErOGI3", "items": {}, "value": "是 否" },
  "Hw_Wd_cOW_": { "id": "Hw_Wd_cOW_", "value": "H74937917614150", "format": null },
  "InhjM5aMhM": {
    "id": "InhjM5aMhM",
    "value": "郑州市第一人民医院航空港院区",
    "format": "A..200",
    "element": {
      "id": "9eee8f20443211eba1e7c93b23114eb3",
      "code": { "internal": "", "dataElement": "emr.patient.hospital.dept" },
      "name": "患者科室",
      "type": "element",
      "labels": null,
      "attributes": []
    }
  },
  "LAOQHDq3Gk": {
    "id": "LAOQHDq3Gk",
    "value": "无名氏0913.11",
    "format": "AN..20",
    "element": {
      "id": "31b094304e7811eb8781eb6a76893430",
      "code": { "internal": "", "dataElement": "emr.patient.name" },
      "name": "姓名",
      "type": "element",
      "labels": null,
      "attributes": []
    }
  },
  "MNCXyf7DOj": { "id": "MNCXyf7DOj", "items": {}, "value": "是 否" },
  "PgxCAh0_gd": {
    "id": "PgxCAh0_gd",
    "value": null,
    "format": "AN..96",
    "element": {
      "id": "d27504f0443211eba1e7c93b23114eb3",
      "code": { "internal": "", "dataElement": "emr.patient.hospital.no" },
      "name": "住院号",
      "type": "element",
      "labels": null,
      "attributes": []
    }
  },
  "QGap9T34zC": {
    "id": "QGap9T34zC",
    "value": "2022-09-13 15:13:52",
    "format": "D8",
    "element": {
      "id": "31d8c4d0443411ebab0c4f22c583501a",
      "code": { "internal": "", "dataElement": "emr.surgery.time" },
      "name": "手术时间",
      "type": "element",
      "labels": null,
      "attributes": []
    }
  },
  "SNtfTTN6RB": {
    "id": "SNtfTTN6RB",
    "value": [{
      "code": "fbdbc690839d11ea97ce434ba6fdfc54",
      "name": "动脉鞘",
      "spec": "5F",
      "alias": "DMQ",
      "isFee": 1,
      "price": 175,
      "valid": 1,
      "syncId": null,
      "barcode": null,
      "isAgent": 0,
      "isValued": 1,
      "supplier": "国药控股",
      "typeCode": null,
      "unitName": "",
      "userCode": null,
      "priceUnit": "元",
      "sortNumber": 402,
      "description": "",
      "manufacturer": "",
      "registrationNo": "国食药监械（进）20143773235",
      "sterilizationIndate": null
    }],
    "format": null
  },
  "SNvB3ARoW4": { "id": "SNvB3ARoW4", "items": {}, "value": "是 否" },
  "WXidgsTN5L": { "id": "WXidgsTN5L", "items": {}, "value": "是 否" },
  "XtzKRzq89S": { "id": "XtzKRzq89S", "value": "175", "format": null },
  "e2tDffpU27": { "id": "e2tDffpU27", "value": "9", "format": null },
  "eaYWXFk1uG": { "id": "eaYWXFk1uG", "items": {}, "value": "是 否" },
  "o_C6hmZ5ft": {
    "id": "o_C6hmZ5ft",
    "value": null,
    "format": "A",
    "element": {
      "id": "1f4ede70443511ebbeff6561335cf2d7",
      "code": { "internal": "", "dataElement": "emr.surgery.type" },
      "name": "手术方式",
      "type": "element",
      "labels": null,
      "attributes": []
    }
  },
  "t_9NzS7nDI": { "id": "t_9NzS7nDI", "items": {}, "value": "是 否" },
  "tx1ZZexccE": { "id": "tx1ZZexccE", "items": {}, "value": "是 否" },
  "zvciajqKQn": { "id": "zvciajqKQn", "items": {}, "value": "是 否" },
  "FOFjeS37hPq": { "id": "FOFjeS37hPq", "value": "10925", "format": null },
  "NSW9A5LKHs5": { "id": "NSW9A5LKHs5", "items": {}, "value": "是 否" },
  "aIByN0ZiyGX": { "id": "aIByN0ZiyGX", "value": "国药控股", "format": null },
  "e0jShfjrBR9": { "id": "e0jShfjrBR9", "items": {}, "value": "是 否" },
  "e0qwM_IUkjB": { "id": "e0qwM_IUkjB", "value": "国药控股", "format": null },
  "e1c4ipOvjts": { "id": "e1c4ipOvjts", "value": "国食药监械（进）20143773235", "format": null },
  "e48-PrhDvil": {
    "id": "e48-PrhDvil",
    "value": [{
      "code": "fde86990778a11e9a9e9e31e330c431f",
      "name": "预装血管支架系统",
      "spec": "H74937917614150",
      "alias": "YZXGZJXT",
      "isFee": 1,
      "price": 10925,
      "valid": 1,
      "syncId": null,
      "barcode": null,
      "isAgent": 0,
      "isValued": 1,
      "supplier": "国药控股",
      "typeCode": null,
      "unitName": "",
      "userCode": null,
      "priceUnit": "元",
      "sortNumber": 406,
      "description": "支架",
      "manufacturer": "",
      "registrationNo": "国械注进20163460466",
      "sterilizationIndate": null
    }],
    "format": null
  },
  "e4TuL_6RgM5": { "id": "e4TuL_6RgM5", "value": "5F", "format": null },
  "e4mdh8isuJc": { "id": "e4mdh8isuJc", "items": {}, "value": "是 否" },
  "e8QLvo0E6m9": { "id": "e8QLvo0E6m9", "items": {}, "value": "是 否" },
  "e1SV6t5GsN18": { "id": "e1SV6t5GsN18", "items": {}, "value": "是 否" },
  "e3FUydamySrN": { "id": "e3FUydamySrN", "value": "国械注进20163460466", "format": null }
};
