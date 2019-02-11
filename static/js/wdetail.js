$(function() {
    console.log("请求成功》》》》");
    let data = {};
    data.uid = $('#uid').html();
    data.touxiang  = $('#touxiang').html();
    data.wid = $('#wid').html();
    data.zan = $('#zan').html();
    console.log($('#uid').html());
    console.log($('#wid').html());
    console.log(data);
    //浏览数加1
    $.ajax({
        url: '/visitor/wdetailsaw',
        type: 'POST',
        dataType: 'JSON',
        data: data,
        success: function(result) {
            //          	 console.log($('#addpro').serialize());
            //              console.log(result);
            console.log("传成功。。。");
            if (result.r == 'success') {
                // alert('上传成功！');
                console.log('浏览数加1！');
                // window.location.href = '/visitor/app';
            }
        },
        error: function(erro) {
            console.log(erro);
        }
    });

    //点击点赞，点赞数加1，并且字体变红，再次点击取消点赞
    $('.zan').each(function() {
        // if(data.zan*1==$('#zan').html()*1){

        // }
        $(this).click(function() {
            console.log('点赞');
            // let zan = $('.zan').length;
            // for (var i = 0; i < zan; i++) {
            //     // $(zan[i]).next.style.color = 'red';
            //     $($('.zan')[i]).children().children().css({ "color": 'red' });
            //     let values01 = $($('.zan')[i]).children().children('span').text() * 1 + 1;
            //     $($('.zan')[i]).children().children('span').html(values01);
            //     console.log(values01);
            // }
            // let data02={};
            //点赞数加1
            $.ajax({
                url: '/visitor/wdetailzan',
                type: 'POST',
                dataType: 'JSON',
                data: data,
                success: function(result) {
                    //          	 console.log($('#addpro').serialize());
                    //              console.log(result);
                    console.log("成功。。。");
                    if (result.r == 'success') {
                        // alert('上传成功！');
                        console.log('点赞数加1！');
                        // window.location.href = '/visitor/app';
                    }
                    else if(result.r == 'nologin'){
                        console.log('未登录');
                         window.location.href = '/visitor/fast_login';
                    }
                },
                error: function(erro) {
                    console.log(erro);
                }
            });
            let zan = $('.zan').length;
            for (var i = 0; i < zan; i++) {
                // $(zan[i]).next.style.color = 'red';
                $($('.zan')[i]).children().children().css({ "color": 'red' });
                let values01 = $($('.zan')[i]).children().children('span').text() * 1 + 1;
                $($('.zan')[i]).children().children('span').html(values01);
                console.log(values01);
            }

            // $('.zan').each
        });
    });
    //评论，更新到当前页面
    $('#send01').click(function() {
        console.log(6666666666);

        console.log($('.pinglun01').val());
        console.log(typeof $('.pinglun01').val());
        if ($('.pinglun01').val() == '') {
            alert('你还没有评论')
        } else {
            console.log('评论..');
            console.log($('.pinglun01').val());
            data.comments =$('.pinglun01').val();
            console.log('评论..'+data);            
            console.log(data);
            $.ajax({
                url: '/visitor/wdetailcom',
                type: 'POST',
                dataType: 'JSON',
                data: data,
                success: function(result) {
                    console.log(result);
                    console.log("成功。。。");
                    if(result.r == 'nologin'){
                        console.log('未登录');
                        window.location.href = '/visitor/fast_login';
                    }
                    if (result.r == 'ok') {
                        // #####
                        console.log('评论成功！');
                         //立即更新评论总数
                         let totals01=$('.totals').children('span').text();
                        $('.totals').children('span').text(totals01*1+1);
                        $('.pinglun').children('a').children('label').children('span').text(totals01*1);
                        $('#pinglin_num00').text(totals01*1+1);

                        //立即更新评论数字
                            console.log(new Date().getFullYear()+'-'+(new Date().getMonth()*1+1)+'-'+(new Date().getDate())+' '+(new Date().getHours())+':'+(new Date().getMinutes())+':'+(new Date().getSeconds()));
                            let new_times01=new Date().getFullYear()+'-'+(new Date().getMonth()*1+1)+'-'+(new Date().getDate())+' '+(new Date().getHours())+':'+(new Date().getMinutes())+':'+(new Date().getSeconds());
                            if(($(".friends")).length!=0){
                            let values02 =$('.pinglun').children().children('span').text()*1+1;
                            $('.pinglun').children().children('span').html(values02);

                            //立即更新评论区
                            $($(".friends")[0]).clone(true).appendTo(".comment_area");
                            console.log(($(".friends")).length);
                            let length01=($(".friends")).length;
                            console.log($($(".friends")[length01-1]));
                            let new_com=$($(".friends")[length01-1]);
                            if(data.touxiang==''){
                                console.log('暂无头像');
                                // $($(".friends")[length01-1]).children('.comments03').children("p").html(data.comments);
                                // $('.pinglun01').val('');
                                // $('.comment02').children('.to03').children('.pinglun01').val('');
                            }
                            $('.pinglun01').val('');
                            $($(".friends")[length01-1]).children('.comments03').children("p").html(data.comments);

                            // console.log(new Date().toLocaleDateString());
                            console.log(new Date().getFullYear()+'-'+(new Date().getMonth()*1+1)+'-'+(new Date().getDate())+' '+(new Date().getHours())+':'+(new Date().getMinutes())+':'+(new Date().getSeconds()));
                            // console.log((new Date().toLocaleString()).toString().split(' ')[0].replace('///g','-'));
                            // console.log((new Date().toLocaleString()).toString().split(' ')[1].replace('',''));


                            $($(".friends")[length01-1]).children('.touxiang').children('.times01').children('span').html(new_times01);   
                            // $('.comment02').children('.to03').children('.pinglun01').val('');
                        }
                        else{
                            console.log('新创建');
                            $('<div class="friends"><div class="touxiang"><div class="col-xs-3 col-sm-3 col-md-3 col-md-offset-3 touxiang to02"><a href="#"> <img src="/img/notx.png" /></a><p>匿名</p></div><div class="col-xs-3 col-sm-3 col-md-3 col-md-offset-3 to02"><p></p></div><div class="col-xs-6 col-sm-6 col-md-6 col-md-offset6 times01 to02"><span id="time01"> <%= b.time01%></span></div></div><div class="comments03"><p><%= b.comments%></p></div></div>').appendTo('.comment_area');
                            // $(' <div class="friends"><div class="touxiang"><a href="#"> <img src="/img/notx.png" /></a><p>匿名</p><span id="time01"> </span></div><div class="comments03"></div></div>').appendTo('.comment_area');
                            $($(".friends").children('.comments03').children("p").html(data.comments));
                            $('.friends').children('.touxiang').children('.times01').children('span').html(new_times01);   
                            $('.comment02').children('.to03').children('.pinglun01').val('');
                        }    
                        // ######
                    }
                },
                error: function(erro) {
                    console.log(erro);
                }
            }); 

         // ####   
        }
    });
});

            



