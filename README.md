# 大成工作记录
目录：
* blob：博客。
* readNote：读书笔记。
* dcNote：大成笔记。


003 介入手术护理记录单  护理记录部件编码

pNeC3McLs
qwl3aOELan
VeX2Md5QSr
e2YoyjcfSnv
VPhfrSzI9Y
e8Eq2_bk-Z8
O4Ztgqj3g2
yNZj0eh2L5
d9XrrlTqEp
Arp3QDcAMf
e6BtIFEL_9Y
jCy_NURuZ5
VLvM2fMaXg


QVQhhRU6Chp
HPb5dl_KWa
FOOznRUloJ
e4FWMacrzF0
fnRVv97kOF
e1AkWnzjkVj
e5TNoTdZ0NB
HT7tODh0mE
nMCia0Eaw2
e5EmigIu-RC
H6CbXy5RXc
u4I9Wi31lI


UPDATE pat_document_template SET CONTENT = JSON_REPLACE(CONTENT, '$.path', 'QVQhhRU6Chp', '$.label', 'QVQhhRU6Chp')
WHERE TYPE_CODE = '8c2be9e007fa11ed8461f9c144e7fb73' AND TYPE = 2 AND CATEGORY = 2 AND
content ->> '$.path' IN ('FOOznRUloJ', 'e4FWMacrzF0', 'fnRVv97kOF', 'e1AkWnzjkVj', 'e5TNoTdZ0NB', 'HT7tODh0mE', 'nMCia0Eaw2', 'e5EmigIu-RC', 'H6CbXy5RXc', 'u4I9Wi31lI', 'pNeC3McLs','qwl3aOELan', 'VeX2Md5QSr', 'e2YoyjcfSnv', 'VPhfrSzI9Y', 'e8Eq2_bk-Z8', 'O4Ztgqj3g2', 'yNZj0eh2L5', 'd9XrrlTqEp', 'Arp3QDcAMf', 'e6BtIFEL_9Y', 'jCy_NURuZ5', 'VLvM2fMaXg');


            // [
            //   {
            //     "id": "a045d066274e11e88aed60a44cce202b",
            //     "label": "科室模板",
            //     "children": [
            //       {
            //         "id": "5457fb005b4011edbcbcd1505f2f06a8",
            //         "label": "110355555"
            //       }
            //     ]
            //   },
            //   {
            //     "id": "70cdd5eb274f11e88aed60a44cce202b",
            //     "label": "个人模板",
            //     "children": []
            //   }
            // ]
<template slot-scope="{ node, data }">
  <div class="templateList" v-for="(item, index) in data" :key="item.id">
    <a @click.stop="selectTemplate(item)">{{ item.label }}</a>
    <span class="fa fa-edit templateEdit" @click.stop="showTemplate(item)"></span>
    <span class="fa fa-close templateDel" data-toggle="modal" data-target="#delete_modal" @click.stop="deleteTemplateValue(item)"></span>
  </div>
</template>


<!--              <el-tree-->
<!--                :data="options"-->
<!--                node-key="id"-->
<!--                default-expand-all-->
<!--              >-->
<!--                <template slot-scope="{ node, data }">-->
<!--                  <li class="templateList">-->
<!--                    <a @click.stop="selectTemplate(data)">{{ node.label }}</a>-->
<!--                    <span v-if="!data.children" class="fa fa-edit templateEdit" @click.stop="showTemplate(data)"></span>-->
<!--                    <span v-if="!data.children" class="fa fa-close templateDel" data-toggle="modal" data-target="#delete_modal" @click.stop="deleteTemplateValue(data)"></span>-->
<!--                  </li>-->
<!--                </template>-->
<!--              </el-tree>-->


              <el-tree
                :data="paragraphData"
                node-key="id"
                default-expand-all
                :props="defaultProps"
              >
                <template slot-scope="{ node, data }">
                  <li class="templateList">
                    <a class="nohover" @click.stop="selectTemplate(data, 'paragraph')">{{ !data.id ? data.label : data.name }}</a>
                    <span v-if="!data.items" class="fa fa-edit templateEdit" @click.stop="editParagraphTemplate(data)"></span>
                    <span v-if="!data.items" class="fa fa-close templateDel" data-toggle="modal" data-target="#delete_modal" @click.stop="deleteTemplateValue(data, 'paragraph')"></span>
                  </li>
                </template>
              </el-tree>
applyTemplate.js


QVQhhRU6Chp
HPb5dl_KWa
FOOznRUloJ
e4FWMacrzF0
fnRVv97kOF
e1AkWnzjkVj
e5TNoTdZ0NB
HT7tODh0mE
nMCia0Eaw2
e5EmigIu-RC
H6CbXy5RXc
u4I9Wi31lI


实现Promise

实现xss-filter

实现正则获取url params

合并n个有序链表

渲染一个超长的list，实现dom节点的复用

random7实现random10

实现正则切分千分位（10000 => 10,000）

实现正则切分银行卡卡号（像实体卡一样四位一个空格）

实现jsonp

判断一个ipv4地址是否存在已有的1000万条ipv4地址中（bitmap）

实现bind，实现new

一次可以走一步或者两步，n个阶梯的楼梯有多少种走法

实现扫雷（二维数组，随机分布地雷坐标）

计算累进税率

求一个数组中比左边和右边的元素都大的元素（On）

实现双向绑定

实现InputNumber




```UPDATE pat_document_template SET CONTENT = JSON_REPLACE(CONTENT, '$.path', 'QVQhhRU6Chp', '$.label', 'QVQhhRU6Chp')
WHERE TYPE_CODE = '8c2be9e007fa11ed8461f9c144e7fb73' AND TYPE = 2 AND CATEGORY = 2 AND
JSON_EXTRACT(CONTENT,'$.path') = 'HPb5dl_KWa' OR
JSON_EXTRACT(CONTENT,'$.path') = 'FOOznRUloJ' OR
JSON_EXTRACT(CONTENT,'$.path') = 'e4FWMacrzF0' OR
JSON_EXTRACT(CONTENT,'$.path') = 'fnRVv97kOF' OR
JSON_EXTRACT(CONTENT,'$.path') = 'e1AkWnzjkVj' OR
JSON_EXTRACT(CONTENT,'$.path') = 'e5TNoTdZ0NB' OR
JSON_EXTRACT(CONTENT,'$.path') = 'HT7tODh0mE' OR
JSON_EXTRACT(CONTENT,'$.path') = 'nMCia0Eaw2' OR
JSON_EXTRACT(CONTENT,'$.path') = 'e5EmigIu-RC' OR
JSON_EXTRACT(CONTENT,'$.path') = 'H6CbXy5RXc' OR
JSON_EXTRACT(CONTENT,'$.path') = 'u4I9Wi31lI' OR
JSON_EXTRACT(CONTENT,'$.path') = 'tkxq_v0-B';

dab617f0916311ed9b20f55a4e172efd

{"path": "tkxq_v0-B", "label": "tkxq_v0-B", "value": "模板0010002"}
{"path": "QVQhhRU6Chp", "label": "QVQhhRU6Chp", "value": "0002"}

SELECT * FROM pat_document_template WHERE TYPE_CODE = '8c2be9e007fa11ed8461f9c144e7fb73' AND TYPE = 2 AND CATEGORY = 2 AND(
JSON_EXTRACT(CONTENT,'$.path') = 'HPb5dl_KWa' OR
JSON_EXTRACT(CONTENT,'$.path') = 'FOOznRUloJ' OR
JSON_EXTRACT(CONTENT,'$.path') = 'e4FWMacrzF0' OR
JSON_EXTRACT(CONTENT,'$.path') = 'fnRVv97kOF' OR
JSON_EXTRACT(CONTENT,'$.path') = 'e1AkWnzjkVj' OR
JSON_EXTRACT(CONTENT,'$.path') = 'e5TNoTdZ0NB' OR
JSON_EXTRACT(CONTENT,'$.path') = 'HT7tODh0mE' OR
JSON_EXTRACT(CONTENT,'$.path') = 'nMCia0Eaw2' OR
JSON_EXTRACT(CONTENT,'$.path') = 'e5EmigIu-RC' OR
JSON_EXTRACT(CONTENT,'$.path') = 'H6CbXy5RXc' OR
JSON_EXTRACT(CONTENT,'$.path') = 'u4I9Wi31lI' OR
JSON_EXTRACT(CONTENT,'$.path') = 'tkxq_v0-B');

SELECT JSON_EXTRACT(CONTENT,'$.path'),content ->> '$.path' FROM pat_document_template
WHERE TYPE_CODE = '8c2be9e007fa11ed8461f9c144e7fb73' AND TYPE = 2 AND CATEGORY = 2
AND
JSON_EXTRACT(CONTENT,'$.path') IN ('FOOznRUloJ', 'e4FWMacrzF0', 'fnRVv97kOF', 'e1AkWnzjkVj', 'e5TNoTdZ0NB', 'HT7tODh0mE', 'nMCia0Eaw2', 'e5EmigIu-RC', 'H6CbXy5RXc', 'u4I9Wi31lI', 'tkxq_v0-B');

```


