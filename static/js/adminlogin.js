$(function() {

    $('#coderimg').click(function() {
        $(this).attr('src', '/coders?' + Math.random());
    });


    $('.admin-login').click(function() {
        $('.H').html('');
        // $('input').attr("class", 'layui-input');
        // $('input[name="u_name"]').parent().next('.layui-form-mid').attr("class", 'layui-form-mid layui-word-aux');
        // $('input[name="u_passwd"]').parent().next('.layui-form-mid').attr("class", 'layui-form-mid layui-word-aux');
        console.log('点击登录。。。。');
        $.ajax({
            url: '/admin/login',
            type: 'POST',
            dataType: 'JSON',
            data: $('#loginnings').serialize(),
            success: function(result) {
                console.log($('#loginnings').serialize());
                console.log(result);

                if (result.r == 'coder_err') {

                    // console.log($('#codering').parent());
                    // $('input[name="coder"]').attr("class", 'layui-input inp_coder');
                    // $('input[name="coder"]').parent('.layui-input-inline').next('.coder').next('span').html('验证码错误！');
                    $('input[name="coders"]').parent().parent().next('.layui-form-mid').html('验证码错误！');

                    return;
                }
                if (result.r == 'u_err') {
                    // $('input[name="u_name"]').attr("class", 'layui-input inp_coder');
                    $('input[name="u_name"]').parent().parent().next('.layui-form-mid').html('账号不存在');
                    // $('input[name="u_name"]').parent().parent().next('.layui-form-mid').attr("class", 'layui-form-mid layui-word-aux H');
                }
                if (result.r == 'pwd_err') {
                    // $('input[name="u_passwd"]').attr("class", 'layui-input inp_coder');
                    // $('input[name="m_passwd"]').parent().next('.layui-form-mid').html('密码错误');
                    // $('input[name="m_passwd"]').parent().next('.layui-form-mid').attr("class", 'layui-form-mid layui-word-aux H');
                    $('input[name="u_passwd"]').parent().parent().next('.layui-form-mid').html('密码错误');


                    return;
                }
                if (result.r == 'ok') {
                    console.log('登录成功...');
                    alert('成功登录');
                    window.location.href = '/visitor/app';
                    return;
                }
            }
        });
        console.log('登录额按错。。。。');
    });

});