function formatter(params) {
  console.log(qqqqqqqqqq);
  return  params[0] + params[1] + params[2]
}

let o = {
  format: function a(params) {
    let tip = params[0].axisValue + "<br/>";
    for (let i = 0; i < params.length; i++) {
      tip += `<div style="display:flex;justify-content: space-between;">
                        <div>${params[i].marker}${params[i].seriesName.substring(0, 4)}:</div>
                        <div>${params[i].value ? params[i].value : "-"}</div>
                     </div>`;
    }
    tip += `<div style="display:flex;justify-content: space-between;">
                    <div>${params[2].marker}占用率:</div>
                    <div>${((params[2].value / 24) * 100).toFixed(2)}%</div>
                  </div>`;

    return tip;
  }
};
console.log(JSON.stringify(o));

// o.a = new Function(o.format);
// console.log(o.a);

function adDocRow() {
  debugger
  let insertRow = () => {
    let emrDocument = EMR.getDocument();
    let t = emrDocument.getTablesByCode('table')[0];
    let tableView = t.target.model.view;
    let copyView = $($(t.target.el).find('tr')[$(t.target.el).find('tr').length - 1])[0].view;
    let clippedRows = [copyView.model._clone(true)];
    tableView.insertRows(copyView.el.index, clippedRows);
    let smarts = $(clippedRows[0].view.el).find('.edl-smart')

    smarts.each((i, smart) => {
      if (i === 6) {
        smart.view.setAttribute('code', 'QVQhhRU6Chp')
      }
      smart.view.setValue(null, false, false, false)
      smart.view.updateLineStyle();
    });
    let mergeTdView = $(tableView.bodyView.el).children().eq(0).children()[0].view;
    let rowspan = parseInt(mergeTdView.rowspan || '1');
    $(mergeTdView.el).attr('rowspan', rowspan + 1);
    // let rowspan1 = $(tableView.bodyView.el).children().eq(0).prevObject.length;
    // $(mergeTdView.el).attr('rowspan', Math.max(rowspan + 1 ,rowspan1));
  }

  EMR.editor.execute("execFn", { value: { fn: insertRow } })
}


option = {
  title: {
    top: 10,
    text: '手术室使用情况统计分析图',
    left: 'center',
    textStyle: {
      fontSize: 30
    }
  },
  grid: {
    top: 90,
    bottom: 30
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    },
    extraCssText: 'width:160px;',
    formatterIsFunction: true,
    formatter: function (params) {
      let isOneDay = isOneDay;
      let time = params.find((item) => {
        return item.seriesName === '时长';
      });
      let tip = params[0].axisValue + '<br/>';
      for (let i = 0; i < params.length; i++) {
        let marker = params[i].marker;
        let name = params[i].seriesName;
        let value = params[i].value ? params[i].value : '-';
        let unit = value ? (name === '时长' ? '小时' : '例') : '';
        tip += `<div style="display:flex;justify-content: space-between;">
                 <div>${marker}${name}:</div>
                 <div>${value} ${unit}</div>
             </div>`;
      }
      if (time && flag) {
        tip += `<div style="display:flex;justify-content: space-between;">
            <div> &nbsp;&nbsp;&nbsp;占用率:</div>
            <div>${
          time.value ? ((time.value / 24) * 100).toFixed(2) + ' %' : '-'
        }</div>
          </div>`;
      }
      return tip;
    }
  },
  toolbox: {
    feature: {
      saveAsImage: {
        show: true
      }
    },
    right: '3%'
  },
  legend: {
    top: 45,
    data: ['急诊', '择期', '时长']
  },
  xAxis: [
    {
      type: 'category',
      data: ['01间', '02间', '03间', '04间', '30间'],
      boundaryGap: true,
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '例数',
      min: 0,
      axisLabel: {
        formatter: '{value} 例'
      }
    },
    {
      type: 'value',
      name: '时长',
      min: 0,
      axisLabel: {
        formatter: '{value} 小时'
      }
    }
  ],
  series: [
    {
      name: '急诊',
      type: 'bar',
      barWidth: 40,
      stack: 'number',
      data: ['2', '4', '2', null, null]
    },
    {
      name: '择期',
      type: 'bar',
      barWidth: 40,
      stack: 'number',
      data: ['2', '2', '7', '1', '1']
    },
    {
      name: '时长',
      type: 'line',
      yAxisIndex: 1,
      data: ['17.55', '18.19', '15.83', '2.83', '2.60'],
      label: {
        show: true
      }
    }
  ]
};
