global.express = require('express');
global.router = express.Router();


//如果没有登录，不能进行以下操作
// router.use(require('../login_module/checklogin.js'));

//登录post请求
router.post('/login', (req, res) => {

    let d = req.body;
        //验证码验证
        console.log('登录。。。。');
        // console.log(d);
        console.log(d.coders.toLowerCase());
        // console.log(req.session);
        console.log(req.session.coders.toLowerCase());
        console.log('点击登录。。。。');
        if (d.coders.toLowerCase() != req.session.coders.toLowerCase()) {
            console.log('验证码错误。。。。');
            res.json({ r: 'coder_err' });
            return;
        }
        //数据库验证
        let sql = 'SELECT * FROM user WHERE status=1 AND u_name=?';
        conn.query(sql, d.u_name, (err, result) => {
            // console.log(d.m_name);
            // console.log(d.m_passwd);
            // console.log(result);
            // console.log(md5(d.u_passwd));
            if (!result.length) {
                console.log('用户错误。。。。');
                res.json({ r: 'u_err' });
                return;
            }
            if (md5(d.u_passwd) != result[0].u_passwd) {
                console.log('密码错误。。。。');
                res.json({ r: 'pwd_err' });
                return;
            }
            //登录成功
            //保存session信息
            console.log('验证成功。。。。');
            req.session.uid = result[0].uid;
            console.log(new Date().toLocaleString());
            req.session.u_name = result[0].u_name;
            let sql1 = 'UPDATE user SET loginnum=loginnum + 1,lasttime=? WHERE uid=?';
            conn.query(sql1, [new Date().toLocaleString(), result[0].uid], (err, result) => {
                console.log(result);
                res.json({ r: 'ok' });
            });

        });

    });

//加载 首页搜索 页面
router.get('/main_searching', (req, res) => {
    console.log("首页搜索 页面");
    let data={};
    console.log(req.query.data01);
    data.keywords=req.query.data01;
    // res.render('admin/main_searching',data);
    console.log('搜索post请求');
    // console.log(res.keys01);
    // console.log(req.data01);
    console.log(req.query.keys01);
    console.log(req.session);
    // console.log(req.body.pic_classify);
    // let data = {};
    data.uid = req.session.uid;
    data.u_name = req.session.u_name;
    data.pic_classify = req.query.data01;
    let keywords01='"%'+data.pic_classify+'%"';
    console.log(keywords01);
    console.log(typeof keywords01);

    if(req.session.uid==undefined){
        console.log('未登录......');
        res.render('visitor/fast_login',data);
    }
    
    else{
        let sql = `select *from works WHERE pic_classify like ${keywords01}`;
        conn.query(sql,  (err, result) => {
            // console.log(result[0]);
            console.log(result[0]);
            //数据库取出的数据为数组，并进行数据反转
            var result1 = [];
            for (var i = result.length - 1; i >= 0; i--) {
                result1[result1.length] = result[i];
            }
            console.log(result1[0]);
            data.works_list = result1;
            data.works_list.pic_address_list = {};
            let j = 1;
            // ##########################
            // console.log(typeof JSON.parse(result1[0].comment));
            console.log(111111);
             // console.log(JSON.parse(result1[0].comment));
             
             console.log(666666666);
             // console.log(data[0]);
            // #########################
            for (let m of result1) {

                let list = JSON.parse(m.pic_address).data;
                // ####
                if(JSON.parse(m.comment)==null||JSON.parse(m.comment)==''){
               // 总条数
                m.com_list_nums=0;
            }
            else{
                // 总条数
                m.com_list_nums=JSON.parse(m.comment).length;
            }
                // ####
                m.pic_address_list = list;
                j++;
            }
            //#########
            if (err) {
                console.log(err);
                // res.json({ r: 'db_err' });
                return;
            } 
            else {
                let sql = `select count(*) as nums from works WHERE pic_classify like ${keywords01}`;
                conn.query(sql,(err, result2) => {
                    console.log(result2[0].nums);
                    data.num_search=result2[0].nums;
                    if (err) {console.log(err);return;}
                    else{
                        console.log(data);
                        res.render('admin/main_searching',data);
                    }                    
                });
        // #########
             
         }

     });
    }
});

//首页搜索post请求
router.get('/searching', (req, res) => {
    console.log('搜索post请求');
    // console.log(res.keys01);
    // console.log(req.data01);
    console.log(req.query.keys01);
    console.log(req.session);
    // console.log(req.body.pic_classify);
    let data = {};
    data.uid = req.session.uid;
    data.u_name = req.session.u_name;
    data.pic_classify = req.query.keys01;
    let keywords01='"%'+data.pic_classify+'%"';
    console.log(keywords01);
    console.log(typeof keywords01);

    if(req.session.uid==undefined){
        console.log('未登录......');
        res.json({ r: 'nologin' });
    }
    
    else{
        let sql = `select *from works WHERE pic_classify like ${keywords01}`;
        conn.query(sql,  (err, result) => {
            // console.log(result[0]);
            console.log(result[0]);
            //数据库取出的数据为数组，并进行数据反转
            var result1 = [];
            for (var i = result.length - 1; i >= 0; i--) {
                result1[result1.length] = result[i];
            }
            console.log(result1[0]);
            data.works_list = result1;
            data.works_list.pic_address_list = {};
            let j = 1;
            // ##########################
            console.log(typeof JSON.parse(result1[0].comment));
            console.log(111111);
             console.log(JSON.parse(result1[0].comment));
             
             console.log(666666666);
             // console.log(data[0]);
            // #########################
            for (let m of result1) {

                let list = JSON.parse(m.pic_address).data;
                // ####
                if(JSON.parse(m.comment)==null||JSON.parse(m.comment)==''){
                // m.com_list=[];
                m.com_list_nums=0;
            }
            else{
                // m.com_list =JSON.parse(m.comment);
                m.com_list_nums=JSON.parse(m.comment).length;
            }
                // ####
                m.pic_address_list = list;
                j++;
            }
            //#########
            if (err) {
                console.log(err);
                // res.json({ r: 'db_err' });
                return;
            } 
            else {
                let sql = `select count(*) as nums from works WHERE pic_classify like ${keywords01}`;
                conn.query(sql,(err, result2) => {
                    console.log(result2[0].nums);
                    data.num_search=result2[0].nums;
                    if (err) {console.log(err);return;}
                    else{
                        console.log(data);
                        res.render('visitor/fan',data);
                    }                    
                });
        // #########
             
         }

     });
    }
});

//小助手post请求
router.post('/server',(req,res)=>{
    console.log('小助手post请求');
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;