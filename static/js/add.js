let descript=null;
let c_address=[];//压缩路径
let origin_address=[];//原图路径
let pic_classify='';
window.onload=function(){	
	 //图片上传
   console.log($('inputinput:checkbox:checked'));
   $.each($('input[type="checkbox"]'),function(){
      $(this).change(function(){
       console.log($(this).parent().css('color'));
       if($(this).parent().css('color')=='rgb(51, 51, 51)'){
          $(this).parent().css('color','red');
        }else{$(this).parent().css('color','rgb(51, 51, 51)');}
      });
    });
    //点击上传图片并显示到页面
    $("#myimg").change(function(){
      //  	console.log('图片添加');
      let _this = this;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '/visitor/add');
      //类似于创建一个表单数据对象<form>  </form>往里面添加信息input，之后就可以用append
      let formdata = new FormData();
      for (const top of _this.files) {
        formdata.append("myimg", top);//追加到表单
      }
      console.log(_this.files);
      //     //不用设置请求头，它本身就是表单了
      xhr.send(formdata);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          // 请求成功以后
          let data = JSON.parse(xhr.responseText).data;
          console.log(data);
          // 保存原图路径             
          for( let b in data){
            let a='/'+data[b];             
            origin_address.push(a);
          }
          console.log(origin_address);
          // ##############
          let str = '';          
          document.querySelector('#origin_address').value =JSON.stringify(origin_address);
          // 进行图片判断 是否压缩
          for( let a in data){
            let b='/'+data[a];  
            let result01=UpladFile(_this.files[a],b);//上传文件方法
          }
          // pic_address=$('#pic_address').val();
          // 循环到页面上
          // for (const top of data.data) {
          //   let str00=top.toString().split(':81/')[1];
          //   str += `<li><img src="${str00}"></li>`;
          // }
          // document.querySelector('.toppic ul').innerHTML = str;
          // ###############
        }
      }       
      console.log("添加完成11111");
    });
    //点击保存，并上传到数据库
    $("#saveimg").click(function(){
      document.querySelector('#descript').value =$('#text01').val();
      descript=document.querySelector('#descript').value
      descript=JSON.stringify(descript);
      if(descript=='""'){
        alert("请添加描述 ！");
      }
      else if(pic_address == null){alert("请添加 图片！");}
      else{
        // 分类上传部分
        console.log($('inputinput:checkbox:checked')); 
        // let fenlei='';
        $.each($('input:checkbox:checked'),function(){
          pic_classify+=$(this).val();
        });
        console.log(pic_classify);
        // ##############       
        console.log(document.querySelector('#pic_classify').value );
        if(pic_classify == ''){alert("请添加 标签！");}
        else{
          document.querySelector('#pic_classify').value=pic_classify;
          console.log(document.querySelector('#pic_classify').value );
          let form = layui.form;
          console.log('图片保存中...');
          console.log(form);
          // 添加分类
          form.on('submit(addpro)', function(data) {
            $.ajax({
              url: '/visitor/addpro',
              type: 'POST',
              dataType: 'JSON',
              data: data.field,
              success: function(result) {
                console.log("图片上传成功。。。");
                if (result.r == 'success') {
                  alert('上传成功！');                    
                  window.location.href = '/visitor/app';
                }
              },
              error:function(erro){
                console.log(erro);
              }
            });             
            return false;
          });
        }
      }    
    });
}
// ################
// 定义一些全局变量
let pic01;
let lujing;
let y_address00=[];

 //对上传文件进行判断 ，看是否压缩
function UpladFile(a,b) {
  //var url = "/pic06_compress"; 
  var form = new FormData();
  if(a.size/1024 < 1025){ //小于等于1M 原图上传
    console.log("小于等于1M 原图上传");
    // let str00='/'+b;
    console.log(b)
    let str='';
    str += `<li><img src="${b}"></li>`;          
    // 绘制图片到li标签
    console.log(str)
    document.querySelector('.toppic ul').innerHTML += str;   
    //传值到input
    //// 保存原图路径到压缩路径
    let c_address00=document.querySelector('#pic_address');   
    console.log(c_address00);        
    console.log(c_address00.value);  
    c_address.push(b)      
    c_address00.value=JSON.stringify(c_address).toString();  
     console.log(".toppic的高度========"+document.querySelector('.toppic'));
    console.log(document.querySelector('.toppic').clientHeight );  
    // document.querySelector('.toppic').style.height =document.querySelector('.toppic').clientHeight*1-50+"px";
    console.log(document.querySelector('.toppic').clientHeight );  

    console.log(".toppic的高度========");  
  }else { 
    console.log("上传大于1M，进行压缩上传中");
    // quality: 0.2为压缩的质量大小，取值范围（0-1）
    photoCompress(a, {quality: 0.2}, function(base64Codes){
      //压缩之前先将以base64的图片url数据转换为Blob  
      var bl = convertBase64UrlToBlob(base64Codes);
      form.append("file", bl, "file_"+Date.parse(new Date())+".jpg"); 
    });
  }
}
 //将以base64的图片url数据转换为Blob           
function convertBase64UrlToBlob(urlData){  
  var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}
//图片压缩
function photoCompress(file,w,objDiv){
  var ready=new FileReader();         
  ready.readAsDataURL(file);
  ready.onload=function(){
    var re=this.result;
    canvasDataURL(re,w,objDiv)
  }
}
// 图片绘制
function canvasDataURL(path, obj, callback){
  var img = new Image();
  img.src = path;
  img.onload = function(){
    var that = this;
    var w = that.width,
    h = that.height,
    scale = w / h;
    w = obj.width || w;
    h = obj.height || (w / scale);
    var quality = 0.7;  // 默认图片质量为0.7
    //生成canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // 创建属性节点
    var anw = document.createAttribute("width");
    anw.nodeValue = w;
    var anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh); 
    ctx.drawImage(that, 0, 0, w, h);
    // 图像质量
    if(obj.quality && obj.quality <= 1 && obj.quality > 0){
     quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    var base64 = canvas.toDataURL('image/jpeg', quality); 
    convertCanvasToImage(base64);
    callback(base64);
  }
}
//图片保存到服务器
function convertCanvasToImage(base64) {
  data=base64.split(',')[1];
  data=window.atob(data);
  var ia = new Uint8Array(data.length);
  for (var i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i);
  };
  var blob=new Blob([ia], {type:"image/png"});
  let formdata1 = new FormData();               
  formdata1.append('myimg',blob);
  axios.post('/visitor/add', formdata1)
  .then(function (response) {
    console.log(response);
    console.log(response.data.data);
    let data=response.data.data;
      let a='/'+data[0];             
      c_address.push(a);
      console.log(c_address);
    //// 保存压缩图路径
    console.log(document.querySelector('#pic_address').value);
    let c_address00=document.querySelector('#pic_address');
    // #####
    // 绘制到页面  绘制图片到li标签
    let str='';
    str += `<li><img src="${a}"></li>`;           
    document.querySelector('.toppic ul').innerHTML += str;
    console.log(".toppic的高度========"+document.querySelector('.toppic'));
    console.log(".toppic的高度========");
    c_address00.value=JSON.stringify(c_address).toString();
    // #####
  })
  .catch(function (error) {
    console.log(error);
  });
}

        