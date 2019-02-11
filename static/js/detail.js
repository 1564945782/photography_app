layui.use(['form', 'layedit', 'laydate'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;
  
  //日期
  laydate.render({
    elem: '#date'
  });
  laydate.render({
    elem: '#date1'
  });
  
  //创建一个编辑器
  var editIndex = layedit.build('LAY_demo_editor');
  
  //监听指定开关
  form.on('switch(switchTest)', function(data){
    layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
      offset: '6px'
    });
    layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
  });
  
  //监听提交
  form.on('submit(demo1)', function(data){
    
    console.log(data.field);
    // console.log(JSON.stringify(data.field));
    let shuju={};
    shuju.data=data.field;
    console.log(shuju);

    $.ajax({
            url: '/visitor/detail',
            type: 'POST',
            dataType: 'JSON',
            data: (shuju),
            success: function(result) {
                console.log(result);          
                if (result.r == 'nologin') {
                    console.log('修改成功');
                    alter('you did not login!')
                    window.location.href = '/visitor/login';
                    return;
                }
            },
            error:function(erro){
                    console.log(erro);
            }
        });

    
  });
  
  form.render();
});