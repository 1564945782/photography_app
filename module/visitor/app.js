global.express = require('express');
global.router = express.Router();
const parseurl=require("parseurl");
const stringquery = require("stringquery");


//加载首页页面
router.get('/app', (req, res) => {
    console.log("首页");
    // console.log(req.session);
    // console.log(req.session.uid);
    let data = {};

    let sql = 'SELECT * FROM works WHERE w_status = 1 order by wid desc limit 0,9';
    conn.query(sql, data, (err, result) => {
        //数据库取出的数据为数组，并进行数据反转
        // var result1 = [];
        // for (var i = result.length - 1; i >=(result.length - 9); i--) {
        //     result1[result1.length] = result[i];
        // }
        // console.log(result[0]);
        
        //判断取出数据是否正确
        if (err) {
            console.log(err);
            return;
        } else {
            data.pic_list = result;
            // console.log(result[0]);
            // console.log(11111111)
            data.uid = req.session.uid;
            // console.log(data)
            // console.log(22222)
            res.render('visitor/main', data);
        }
    });
});
//加载作品详情页面
router.get('/wdetail', (req, res) => {
    console.log("作品详情");
    // console.log(req.session);
    //导出用户id，点击当前图片的wid和w_uid
    let data = {};
    // console.log(req.url);
    let url = req.url;
    var obj = {};　　
    var arr1 = url.split("?");　　
    var arr2 = arr1[1].split("&");　　
    for (var i = 0; i < arr2.length; i++) {　　　　
        var aaa = arr2[i].split("=");　　　　
        obj[aaa[0]] = aaa[1];　　
    }　　
    // console.log(obj);
    
    data.uid = obj.uid;
    data.w_uid = obj.w_uid;
    data.wid = obj.wid;
    // console.log(data);
    //在数据库中取出对应的作品信息
    // let sql = 'SELECT * FROM works WHERE wid = ?';
    let sql = 'SELECT * FROM works AS w RIGHT JOIN user as u on w.uid=u.uid  WHERE w.wid = ?';

    conn.query(sql, data.wid, (err, result) => {
        console.log(result);
        //判断取出数据是否正确
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        } else {
            data.works_detail = result;
            // console.log(data);
            console.log(3333333333);
            // console.log(data.works_detail[0].addtimes);
            data.works_detail[0].addtimes=(JSON.stringify(data.works_detail[0].addtimes).replace(/[a-zA-Z"]/g,' ')).split('.')[0]

            console.log(JSON.parse(result[0].pic_address).data);
            data.works_detail.pic_list = JSON.parse(result[0].pic_address).data;
            // console.log(data);
             // console.log(typeof data.works_detail.pic_list);
             // console.log(typeof data.works_detail[0].comment);
             console.log(typeof JSON.parse(result[0].comment));
             // console.log(JSON.parse(result[0].comment));
             // console.log(JSON.parse(result[0].comment).length);
            // console.log(typeof result[0].comment);
            // console.log(JSON.parse(result[0].comment));
            if(JSON.parse(result[0].comment)==null||JSON.parse(result[0].comment)==''){
                data.com_list=[];
                data.com_list_nums=0;
            }
            else{
                data.com_list =JSON.parse(result[0].comment);
                data.com_list_nums=JSON.parse(result[0].comment).length;
            }
             
             // console.log(data);
            // data.uid = req.session.uid;
            // data.wid = wid;
            //      	console.log(JSON.parse(result[0].pic_address).data[0].split(':81')[1]);
            res.render('visitor/wdetail', data);
        }
    });
    // res.render('visitor/wdetail', data);
});

//作品详情页面post请求
//浏览数
router.post('/wdetailsaw', (req, res) => {
    console.log('浏览');
    // console.log(req.body.wid);
    // console.log(req.data);
    //  console.log(req.session);
    //  let d = req.body.c_name;
    // let uid = 3;
    let wid = req.body.wid;
    // let descript = req.body.descript;
    //  console.log(descript);

    // let pic_address = req.body.pic_address;
    //  console.log(pic_address);
    //  console.log(1111111111);
    let sql = 'UPDATE works SET saw_nums=saw_nums*1+1 WHERE wid=?';
    // let data = [uid, d, descript, pic_address, new Date().toLocaleString()];
    conn.query(sql, wid, (err, result) => {
        // console.log(result);
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        } else {
            res.json({ r: 'success' });
        }

    });
});
//点赞数
router.post('/wdetailzan', (req, res) => {
    console.log('点赞');
    // console.log(req.body);
    // console.log(req.session);
    // console.log(req.session.uid);
    let data = {};
    data.uid = req.session.uid;
    data.u_name = req.session.u_name;

    if(req.session.uid==undefined){
            console.log('未登录......');
            res.json({ r: 'nologin' });
    }
    else{
    // ###
    let wid = req.body.wid;
    let sql = 'UPDATE works SET zan_nums=zan_nums*1+1 WHERE wid=?';
    conn.query(sql, wid, (err, result) => {
        console.log(result);
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        } else {
            res.json({ r: 'success' });
        }
    });
 }
});
//评论
router.post('/wdetailcom', (req, res) => {
    console.log('评论');
    // console.log(req.body);
    // console.log(req.session);
    // console.log(req.session.uid);
    let data = {};
    data.uid = req.session.uid;
    data.u_name = req.session.u_name;

    if(req.session.uid==undefined){
            console.log('未登录......');
            res.json({ r: 'nologin' });
    }
    else{
    // ####
    //查询以前的评论
    let sql = 'SELECT comment FROM works   WHERE wid = ?';
    conn.query(sql,req.body.wid, (err, result) => {
        console.log(result);
        console.log(result[0]);
        console.log('数据库右边链接');
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        } else {
            console.log('查询评论成功');

            if(result[0].comment==''||result[0].comment==null){
                console.log(result[0]);
                console.log('评论为空');
                result[0]={};
                result[0].uid=req.body.uid;
                result[0].comments=req.body.comments.replace(/\\/g, '');
                result[0].time01=new Date().toLocaleString();
                console.log(result);
                console.log('88888');
                console.log(result[0]);
                let sql1 = 'UPDATE works SET comment=? WHERE wid=?';
                conn.query(sql1, [JSON.stringify(result),req.body.wid], (err, results) => {
                    console.log('数据库查看评论成功');
                    console.log(results);   
                    if (err) {
                        console.log(err);
                        res.json({ r: 'db_err' });
                        return;
                    } else {
                        console.log('更新成功');
                        res.json({ r: 'ok' });                   
                 }
             });
            }
            else{
                console.log('评论 不   为空');
                console.log(result);
                console.log(result[0]);
                 console.log(typeof result[0]);
                 console.log(result[0].comment);
                 console.log(typeof result[0].comment);
                console.log(JSON.parse(result[0].comment));
                let result01=JSON.parse(result[0].comment);
                console.log(result01);
                console.log('5555555555');
                let result1={};
                result1.uid=req.body.uid;
                result1.comments=req.body.comments;
                result1.time01=new Date().toLocaleString();

                JSON.parse(result[0].comment).push(result1);
                 console.log(result1);
                result01.push(result1);
                 console.log(result01);
                 console.log('5333333335555555');
                 console.log(result[0]);
                 console.log(result);
                //更新评论信息
                console.log('查看评论成功');
                let sql1 = 'UPDATE works SET comment=? WHERE wid=?';
                conn.query(sql1, [JSON.stringify(result01),req.body.wid], (err, results) => {
                    console.log('数据库查看评论成功');
                    console.log(results);   
                    if (err) {
                        console.log(err);
                        res.json({ r: 'db_err' });
                        return;
                    } else {
                        console.log('更新成功');
                        res.json({ r: 'ok' });
                 }
             });
        }
        }
    });
 }
});

//加载我的页面
router.get('/my', (req, res) => {
    console.log("我的");
    // console.log(req.session);
    // console.log(req.session.uid);
    let data = {};
    data.uid = req.session.uid;
    data.u_name = req.session.u_name;

    if(req.session.uid==undefined){
            // console.log('meidenglu.');
            res.render('nologin/my_nologin',data);
    }
    else{
    
    let sql = 'SELECT COUNT(*) as nums FROM  works where uid=?';
    conn.query(sql,req.session.uid, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        }else{
            // console.log(result[0].nums);
            data.counts=result[0].nums;
            res.render('visitor/my',data);
         }
     });
   }

});
//加载我的的 <个人作品> 页面
router.get('/my_per_works', (req, res) => {
    console.log("个人作品");
    // console.log(req.body);
    // console.log(req.session);
    let data = {};
    data.uid = req.session.uid;
    data.u_name = req.session.u_name;

    if(req.session.uid==undefined){
            console.log('未登录......');
            res.render('visitor/fast_login',data);
    }
    else{
    let sql = 'SELECT * from works AS w LEFT JOIN user AS u ON u.uid = w.uid WHERE w.uid = ?';
    conn.query(sql, data.uid, (err, result) => {
        // console.log(result[0]);
        //数据库取出的数据为数组，并进行数据反转
        var result1 = [];
        for (var i = result.length - 1; i >= 0; i--) {
            result1[result1.length] = result[i];
        }
        // console.log('数据反转 ');
        // console.log((JSON.stringify(result1[0].addtimes).replace(/[a-zA-Z"]/g,' ')).split('.')[0]);
        // console.log(result1[0].addtimes.replace('[a-zA-Z]',' '));

        //判断取出数据是否正确
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        } else {
            //          console.log(result[0]);

            data.works_list = result1;
            // //          console.log(JSON.parse(result[0].pic_address).data);
            data.works_list.pic_address_list = {};
            let i = 1;
            // for (let m of result1) {
            //     m.addtimes=(JSON.stringify(m.addtimes).replace(/[a-zA-Z"]/g,' ')).split('.')[0];
            //     // let list = JSON.parse(m.pic_address).data;
            //     // m.pic_address_list = list;
            //     // i++;
            // }
            // #####################
            for (let m of result1) {
                m.addtimes=(JSON.stringify(m.addtimes).replace(/[a-zA-Z"]/g,' ')).split('.')[0];
                
                let list = JSON.parse(m.pic_address).data;
                // ####
                if(m.comment==null || m.comment==''){
                    console.log("空的")
                     // console.log(m.comment)
                // m.com_list=[];
                m.com_list_nums=0;
            }
            else{
                console.log("非空的");
                 // console.log(m.comment)
                 // console.log(1111111111);
                 // console.log(JSON.parse(m.comment));
                 // console.log(JSON.parse(m.comment)[0]);
                 // console.log(JSON.parse(m.comment).length)
                // m.com_list =JSON.parse(m.comment);
                m.com_list_nums=JSON.parse(m.comment).length;
            }
                // ####
                m.pic_address_list = list;
                i++;
            }
            // #####################

            // console.log('路径');

            // console.log(data.works_list[0]);
            // data.uid=req.session.uid;
            console.log('成功返回');

            //      console.log(JSON.parse(result[0].pic_address).data[0].split(':81/')[1]);
            res.render('visitor/per_works', data);
        }
    });
  }
});


//加载作品详情页面
router.get('/per_wdetail', (req, res) => {
    // console.log(req.session);
    //导出用户id，点击当前图片的wid和w_uid
    let data = {};
    console.log(req.url);
    let url = req.url;
    var obj = {};　　
    var arr1 = url.split("?");　　
    var arr2 = arr1[1].split("&");　　
    for (var i = 0; i < arr2.length; i++) {　　　　
        var aaa = arr2[i].split("=");　　　　
        obj[aaa[0]] = aaa[1];　　
    }　　
    // console.log(obj);
    console.log("作品详情");
    data.uid = obj.uid;
    data.w_uid = obj.w_uid;
    data.wid = obj.wid;
    // console.log(data);
    //在数据库中取出对应的作品信息
    // let sql = 'SELECT * FROM works WHERE wid = ?';
    let sql = 'SELECT * FROM works AS w RIGHT JOIN user as u on w.uid=u.uid  WHERE w.wid = ?';

    conn.query(sql, data.wid, (err, result) => {
        // console.log(result);
        //判断取出数据是否正确
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        } else {
            data.works_detail = result;
            // console.log(data);
            // console.log(3333333333);
            data.works_detail[0].addtimes=(JSON.stringify(data.works_detail[0].addtimes).replace(/[a-zA-Z"]/g,' ')).split('.')[0]
            // m.addtimes=(JSON.stringify(m.addtimes).replace(/[a-zA-Z"]/g,' ')).split('.')[0]
            // console.log(result[0].pic_address);
            data.works_detail.pic_list = JSON.parse(result[0].pic_address).data;
            // console.log(data);
             // console.log(typeof data.works_detail.pic_list);
             // console.log(typeof data.works_detail[0].comment);
             // console.log(typeof JSON.parse(result[0].comment));
             // console.log(JSON.parse(result[0].comment));
            // console.log(typeof result[0].comment);
            // console.log(JSON.parse(result[0].comment));
            if(JSON.parse(result[0].comment)==null){
                data.com_list=[];
                 data.com_list_nums=0;
            }
            else{
                data.com_list =JSON.parse(result[0].comment);
                 data.com_list_nums=JSON.parse(result[0].comment).length;
            }             
             // console.log(data);
            res.render('visitor/per_wdetail', data);       
        }
    });
});

//加载我的的 <收藏> 页面
router.get('/my_collection02', (req, res) => {
    console.log("收藏");
    res.render('visitor/collection02');

});
//加载我的的 <分享会> 页面
router.get('/my_sharing', (req, res) => {
    console.log("分享会");
    res.render('visitor/sharing');

});
//加载我的的 <关于我们> 页面
router.get('/my_regard', (req, res) => {
    console.log("关于我们");
    res.render('visitor/regard');

});

//加载上传图片的页面
router.get('/add', (req, res) => {
    console.log("添加");
    // console.log(req.session);
    // console.log(req.session.uid);
    let data = {};
    data.uid = req.session.uid;
    data.u_name = req.session.u_name;

    if(req.session.uid==undefined){
        console.log('未登录...');
        res.render('visitor/fast_login',data);
        }
    else{
    res.render('visitor/add');
  }

});

//消息的页面
router.get('/info', (req, res) => {
    console.log("消息");
    // console.log(req.session);
    // console.log(req.session.uid);
    res.render('visitor/info');

});

//消息的 <点赞> 页面
router.get('/info_zan', (req, res) => {
    console.log("点赞");
    res.render('visitor/zan');

});

//消息的 <评论> 页面
router.get('/info_comment', (req, res) => {
    console.log("评论");
    res.render('visitor/comment');

});
//消息的 <新粉丝> 页面
router.get('/info_fan', (req, res) => {

    console.log("新粉丝");

    // console.log(req.body);
    // console.log(req.session);
    let data = {};
    data.uid = req.session.uid;
    data.u_name = req.session.u_name;

    if(req.session.uid==undefined){
            console.log('meidenglu.');
            res.render('visitor/fast_login',data);
    }
    else{
    res.render('visitor/fan');
}

});
//消息的 <收录与收藏> 页面
router.get('/info_collection01', (req, res) => {
    // console.log(req.body);
    // console.log(req.session);
    let data = {};
    data.uid = req.session.uid;
    data.u_name = req.session.u_name;

    if(req.session.uid==undefined){
            console.log('meidenglu.');
            res.render('visitor/fast_login',data);
    }
    else{
    console.log("收录与收藏");
    res.render('visitor/collection01');
}

});
//消息的 <小助手> 页面
router.get('/info_robot', (req, res) => {
    console.log("小助手");
    res.render('visitor/robot');

});


//论坛作品的页面
router.get('/works', (req, res) => {
    console.log("论坛");
    console.log("req.url-----");
    console.log(req.url.indexOf('?'));
    let data = {};
    let sql="";
    if(req.url.indexOf('?')==-1){
        console.log("没有 ？的路由");
        sql = 'SELECT * from works AS w LEFT JOIN user AS u ON u.uid = w.uid WHERE w.w_status = 1 order by wid desc';
        // #######
        conn.query(sql, data, (err, result1) => {
        //数据库取出的数据为数组，并进行数据反转
        //判断取出数据是否正确
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        } else {
            // console.log(result1);
            data.works_list = result1;
            data.works_list.pic_address_list = {};
            let i = 1;
            // ##########################
            // #########################
            for (let m of result1) {

                let list = JSON.parse(m.pic_address).data;
                // ####
                if(m.comment==null || m.comment==''){
                    console.log("空的")
                m.com_list_nums=0;
            }
            else{
                console.log("非空的");
                m.com_list_nums=JSON.parse(m.comment).length;
            }
                // ####
                m.pic_address_list = list;
                i++;
            }
            data.uid=req.session.uid;
            res.render('visitor/works', data);
        }
    });
        // ######
    }else{
        console.log("有 ？的路由--------"+req.query.keyword);
        let keyword=req.query.keyword.split("'")[1];
        let keywords01=`'%${keyword}%'`;
        console.log(keyword)
        sql=`SELECT * from works AS w LEFT JOIN user AS u ON u.uid = w.uid WHERE w.w_status = 1 AND pic_classify like ${keywords01} order by wid desc`;
        // let url=req.url.split("?")[1];
        // ################
        conn.query(sql, data, (err, result1) => {
        //数据库取出的数据为数组，并进行数据反转
        //判断取出数据是否正确
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        } else {
            console.log(result1);
            data.works_list = result1;
            data.works_list.pic_address_list = {};
            let i = 1;
            // ##########################
            // #########################
            for (let m of result1) {

                let list = JSON.parse(m.pic_address).data;
                // ####
                if(m.comment==null || m.comment==''){
                    console.log("空的")
                m.com_list_nums=0;
            }
            else{
                console.log("非空的");
                m.com_list_nums=JSON.parse(m.comment).length;
            }
                // ####
                m.pic_address_list = list;
                i++;
            }
            data.uid=req.session.uid;
            res.render('visitor/works', data);
        }
    });
        // ##############
    }
    // if(sql!=''){
    //     console.log("sql!!!!!!!=空")
        
    // }
    

});
//我的设置的页面
router.get('/setting', (req, res) => {
    console.log("设置");
    res.render('visitor/setting');

});

//处理多图片上传array  
router.post('/add', upload.array('myimg', 1000), (req, res) => {
    console.log("图片上传...");
    let data = [];
    for (const top of req.files) {
        let path =top.path.replace(/\\/g, '/');
        data.push(path);
    }
    // console.log(data);
    res.json({ "errno": 0, "data": data });
});

//作品上传的post请求,保存到数据库
router.post('/addpro', (req, res) => {
    console.log(1212);
     // console.log(req.body);
    //  console.log(req.body.myimg);
      // console.log(req.session);
    //  let d = req.body.c_name;
    let uid = req.session.uid;
    let d = req.session.u_name;
    let descript = req.body.descript;
    // console.log(descript);
    // 压缩路径
    let pic_address={"errno":0,"data":[]}
    pic_address.data = JSON.parse(req.body.pic_address);
    // console.log(pic_address)
    // 原图路径
    let origin_address={"errno":0,"data":[]}
    origin_address.data = JSON.parse(req.body.origin_address);
    // console.log(pic_address)
    // console.log(1111111111);
    

    // let origin_address = req.body.origin_address;
    let pic_classify = req.body.pic_classify;
     // console.log(pic_address);
     // console.log(origin_address);
    let sql = `INSERT INTO works (uid,u_name,descript,pic_classify,pic_address,addtimes,origin_address) VALUES (?,?,?,?,?,?,?);`;
    let data = [uid, d, descript,pic_classify,JSON.stringify(pic_address), new Date().toLocaleString(), JSON.stringify(origin_address)];
    conn.query(sql, data, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        }
        // console.log(result);
        // 插入另外的表
        res.json({ r: 'success' });
    });
});

//快捷登录的页面
router.get('/fast_login', (req, res) => {
    console.log("快捷登录");
    res.render('visitor/fast_login');
});

//登录的页面
router.get('/login', (req, res) => {
    console.log("登录");
    res.render('visitor/login');
});
//退出登录的页面
router.get('/loginout', (req, res) => {
    console.log("退出登录");
    delete req.session.uid;
    delete req.session.u_name;
    res.render('visitor/fast_login');
});
//注册的页面
router.get('/register', (req, res) => {
    console.log("注册");
    res.render('visitor/register');
});

//注册的post请求
router.post('/register', (req, res) => {
    console.log("注册");
    let d = req.body;
    // console.log(req.session);
    // console.log(d.u_name);
    // console.log(d.u_pwd); 
    // console.log(md5(d.u_pwd)); 
    let sql = 'SELECT u_name FROM user WHERE status = 1 AND u_name=?';
    conn.query(sql,d.u_name, (err, result) => {
        // console.log(result);
        if(result==''){
            console.log('未注册');
            let sql1 = 'INSERT INTO `user` (u_name,u_passwd) VALUES (?,?);';
            conn.query(sql1, [d.u_name,md5(d.u_pwd)], (err, result1) => {
                // console.log(result1);
                res.json({ r: 'ok' });
            });
        }
         else{
            res.json({ r: 'existing' });
        }
    });
    // res.render('visitor/register');
});


//客服的页面
router.get('/server', (req, res) => {
    console.log("客服");
    res.render('visitor/server');
});
//用户详情的页面
router.get('/detail', (req, res) => {
    console.log("用户详情");
    // console.log(req.session);
    let data = {};
    data.uid=req.session.uid;
    data.u_name=req.session.u_name;

    if(req.session.uid==undefined){
        res.render('nologin/detail_nologin',data);
    }else{
         res.render('visitor/detail',data);
    }
});
//用户详情的post请求
router.post('/detail', (req, res) => {
    console.log(1212);
    console.log("用户详情的post请求");
    let b=req.body;
    // console.log(typeof b);
    // console.log(b);
    // console.log(req.session);
    let uid = req.session.uid;
    let u_name = req.session.u_name;
    if(req.session.uid==undefined){
        res.json({ r: 'nologin' });
        // res.render('nologin/detail_nologin');

    }else{
    let age=new Date().getFullYear()*1-b.data.date.split('-')[0];   
    // console.log(age);
    let address=b.data.province+'-'+b.data.city+'-'+b.data.area;      
    let time02 = b.data.date;
    // console.log(time02);
    // console.log(b.data);
    // console.log(b.data.length);    
    for(var a in b.data){
        if(b.data[a]==''){
           b.data[a]='null';
        }
        // console.log(b.data[a]);        
    }
    let sql = 'UPDATE user SET u_name=?,touxiang=?,age=?,sex=?,both1=?,signs=?,tel=?,profession=?,email=?,address=? WHERE uid=?';
    let data = [b.data.username, b.data.touxiang, age,b.data.sex,time02,b.data.signs,b.data.phone,b.data.modules,b.data.email,address,uid*1];
    conn.query(sql, data, (err, result) => {
        if (err) {
            console.log(err);
            // res.json({ r: 'db_err' });
            return;
        }else{
        // res.json({ r: 'ok' });
           console.log('成功'); 
        }
    });
}
});




module.exports = router;