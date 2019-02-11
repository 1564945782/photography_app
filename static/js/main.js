$(function() {
    var layer=layui.layer;
    console.log("请求成功》》》》");

    // 跳转到作品详情页面
    $(".container").on("click", "a", function() {
        let _this = this;
        console.log(_this);
        console.log($(_this).children('#uid').text());
        let uid = $(_this).children('#uid').text()
        let w_uid = $(_this).children('#w_uid').text()
        let wid = $(_this).children('#wid').text()
        console.log(uid, w_uid, wid);
        window.location.href = "/visitor/wdetail?uid=" + uid + "&w_uid=" + w_uid + "&wid=" + wid;
    });
    //关键字搜索
    $('#search_tap01').click(function() {
        console.log('点击搜索');
        console.log($('#keyword').val());
        let val01=$('#keyword').val();
        let data01={};
        data01.keys01=val01;
        if(val01=='搜索作品'||val01==''){
            // alert('请输入关键字！');
            // layer.msg('请输入关键字！');
            layer.open({
                title:'提示',
                content:'请输入关键字！'
            });
            
        }else{
            console.log(data01);
            window.location.href=`/admin/main_searching?data01=${val01}`;
     }
    });





});