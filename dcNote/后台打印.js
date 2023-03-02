
function onselectChange(value){
  let dparams=document.querySelector('.document-params');
  let tparams=document.querySelector('.template-params');
  if(value==="template"){
    $(tparams).removeClass("disabled")
    $(dparams).addClass("disabled")
  }else{
    $(dparams).removeClass("disabled")
    $(tparams).addClass("disabled")
  }
}

function print(data) {
  console.timeEnd('print')
  var printIframe = document.getElementById(data.id);
  if (printIframe.contentWindow.document.execCommand) {
    try {
      printIframe.contentWindow.document.execCommand('print', false, null);
    } catch (e) {
      printIframe.contentWindow.print();
      printIframe.remove();
    }
  } else {
    printIframe.contentWindow.print();
    printIframe.remove();
  }
}
function messageHandler(messageEvent) {
  if (messageEvent.origin !== window.location.origin) {
    return
  }
  var data = messageEvent;
  if (data.method === 'forcePrint') {
    print(data);
  } else if (data.method === 'print' || data.method === 'preview') {
    let usedFrame = document.getElementById(data.id);
    if (usedFrame) {
      usedFrame.parentNode.removeChild(usedFrame);
    }

    var iframe = document.createElement('iframe');
    document.getElementById('previewContainer').appendChild(iframe);

    iframe.setAttribute('src', data.src);
    iframe.setAttribute('id', data.id);
    iframe.setAttribute('style', `position:absolute; width:100%; height:100%; border:0;display:${data.method === 'print' ? 'none' : ''};`);
    iframe.type = "application/pdf";

    if (data.method === 'print') {
      var printIframe = document.getElementById(data.id);
      printIframe.onload = function () {
        print(data);
      }
    } else if (data.method === 'preview') {
      document.getElementById(data.id).onload = function () {
        console.timeEnd('print')
      }
    }
  }
}
function getPDFBlob(data) {
  if (!data) {
    return;
  }
  ;
  /* let uInt8array=new Uint8Array(content.length);
   for(let i=0;i<content.length;++i){
       uInt8array[i]=content[i]
   }*/
  let uInt8array = new Uint8Array(Int8Array.from(data));
  let url = URL.createObjectURL(new Blob([uInt8array], {type: 'application/pdf'}))
  // debugger;
  return url
}

$("#print").on('click', function () {
  console.time('print')
  // debugger
  let items=$('form>table>tbody>tr>td').children('input,select');
  let pitems=$('form>table>tbody>tr>td>table td').children('input,textarea');
  let params={params:{}};
  items.each(function (i,item){
    let val = $(item).val()
    if(['true','false'].includes(val)){
      val=val=='true';
      params[$(item).attr('name')]=val
    }else{
      val&&(params[$(item).attr('name')]=val)
    }
  })
  pitems.each(function (i,item){
    let val = $(item).val();
    if(item.tagName==='TEXTAREA'&&val){
      val=JSON.parse(JSON.stringify(new Function(`return ${val}`)()))
    }
    val&&(params.params[$(item).attr('name')]=val)
  })
  if(params.params.documentId){
    try{
      let val=JSON.parse(JSON.stringify(new Function(`return ${params.params.documentId}`)()))
      params.params.documentId=val;
      console.log(val)
    }catch (e) {

    }
  }
  /* if(!params.params.documentId)
   params.params.document=window.ddata*/
  $.ajax({
    url: "/emr/archive/pdf",
    type: 'POST',
    data:JSON.stringify(params),
    headers: {
      //Connection: "Keep-Alive",
      // 'Transfer-Encoding':'chunked'
    },
    contentType:"application/json; charset=utf-8",
    xhr:function (){
      let xhr=$.ajaxSettings.xhr();
      xhr.onprogress=function (e){
        let res=e.target.responseText
        console.log(res)
        let data=res.substring(res.lastIndexOf('<br/>')+5);
        if(data.startsWith('buffer')){
          xhr.onprogress=null
        }else{
          console.log(data)
        }
      }
      return xhr
    },
    success: function (res) {
      if(typeof res == "string"){
        console.time("formatBuff")
        let data=res.substring(res.lastIndexOf('<br/>buffer:,')+13).split(",")
        console.timeEnd("formatBuff")
        messageHandler({
          origin: window.location.origin,
          id: 'test',
          method: 'print',
          src:/*'/print'*/getPDFBlob(data)
        })
      }else{
        let data=res.content;
        if(res.success===true){
          messageHandler({
            origin: window.location.origin,
            id: 'test',
            method: 'print',
            src:/*'/print'*/getPDFBlob(data)
          })
        }else{
          alert(data)
        }
      }
    }
  })
})

