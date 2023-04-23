```sql
UPDATE PAT_DOCUMENT_TEMPLATE SET DEPT_ID = 'a045d066274e11e88aed60a44cce202b'
WHERE CATEGORY = 2 AND DEPT_ID IS NULL AND USER_ID IS NULL
AND JSON_EXTRACT(CONTENT,'$.path') = JSON_EXTRACT(CONTENT,'$.label');

SELECT * FROM PAT_DOCUMENT_TEMPLATE t WHERE JSON_EXTRACT(t.CONTENT,'$.path') = JSON_EXTRACT(t.CONTENT,'$.label') AND VALID = 1;



UPDATE PAT_DOCUMENT_TEMPLATE SET DEPT_ID = 'a045d066274e11e88aed60a44cce202b', TYPE = 2
WHERE CATEGORY = 2 AND DEPT_ID IS NULL AND USER_ID IS NULL
AND JSON_EXTRACT(CONTENT,'$.path') = JSON_EXTRACT(CONTENT,'$.label') AND VALID = 1;

e68262008b3711ed9c80699ecd82e926

86072  17777  16666


UPDATE SYS_AUTH_RESOURCE SET VALID = 0 WHERE ID = '086848e054eb11e88b0e530a109c045c';
```

```

UPDATE pat_document_template SET CONTENT = JSON_REPLACE(CONTENT, '$.path', 'QVQhhRU6Chp', '$.label', 'QVQhhRU6Chp')
WHERE TYPE_CODE = '8c2be9e007fa11ed8461f9c144e7fb73' AND TYPE = 2 AND CATEGORY = 2  AND
content ->> '$.path' IN ('FOOznRUloJ', 'e4FWMacrzF0', 'fnRVv97kOF', 'e1AkWnzjkVj', 'e5TNoTdZ0NB', 'HT7tODh0mE', 'nMCia0Eaw2', 'e5EmigIu-RC', 'H6CbXy5RXc', 'u4I9Wi31lI');


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
WHERE TYPE_CODE = '8c2be9e007fa11ed8461f9c144e7fb73' AND TYPE = 2 AND CATEGORY = 2 AND
content ->> '$.path' IN ('FOOznRUloJ', 'e4FWMacrzF0', 'fnRVv97kOF', 'e1AkWnzjkVj', 'e5TNoTdZ0NB', 'HT7tODh0mE', 'nMCia0Eaw2', 'e5EmigIu-RC', 'H6CbXy5RXc', 'u4I9Wi31lI', 'tkxq_v0-B');



UPDATE pat_document_template SET CONTENT = JSON_REPLACE(CONTENT, '$.path', 'QVQhhRU6Chp', '$.label', 'QVQhhRU6Chp')
WHERE TYPE_CODE = '8c2be9e007fa11ed8461f9c144e7fb73' AND TYPE = 2 AND CATEGORY = 2 AND
content ->> '$.path' IN ('FOOznRUloJ', 'e4FWMacrzF0', 'fnRVv97kOF', 'e1AkWnzjkVj', 'e5TNoTdZ0NB', 'HT7tODh0mE', 'nMCia0Eaw2', 'e5EmigIu-RC', 'H6CbXy5RXc', 'u4I9Wi31lI', 'pNeC3McLs','qwl3aOELan', 'VeX2Md5QSr', 'e2YoyjcfSnv', 'VPhfrSzI9Y', 'e8Eq2_bk-Z8', 'O4Ztgqj3g2', 'yNZj0eh2L5', 'd9XrrlTqEp', 'Arp3QDcAMf', 'e6BtIFEL_9Y', 'jCy_NURuZ5', 'VLvM2fMaXg');
```
```js

```
