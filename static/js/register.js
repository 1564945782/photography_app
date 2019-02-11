$(function() {
    // 点击注册按钮
    $('#register01').click(function() {
        // $('.H').html('');
        // $('input').attr("class", 'layui-input');
        // $('input[name="u_name"]').parent().next('.layui-form-mid').attr("class", 'layui-form-mid layui-word-aux');
        // $('input[name="u_passwd"]').parent().next('.layui-form-mid').attr("class", 'layui-form-mid layui-word-aux');
        console.log('点击注册。。。。');
        $.ajax({
            url: '/visitor/register',
            type: 'POST',
            dataType: 'JSON',
            data: $('#registers').serialize(),
            success: function(result) {
                console.log($('#registers').serialize());
                console.log(result);

                if (result.r == 'existing') {

                    // alert('账号已存在，直接登录！');
                    var myMessage=confirm('账号已存在！\u000d要直接登录吗？');
                    if(myMessage==true){
                        window.location.href = '/visitor/fast_login';
                    }
                    return;
                }
                if (result.r == 'ok') {
                    var myMessage=confirm('注册成功！\u000d要直接登录吗？');
                    if(myMessage==true){
                        window.location.href = '/visitor/fast_login';
                    }
                    return;
                }
                
            }
        });
        console.log('注册。。。。');
    });

});