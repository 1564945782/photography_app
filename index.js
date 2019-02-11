//模块引入
global.express = require('express');
global.ejs = require('ejs');
global.bodyParser = require('body-parser');
global.md5 = require('md5');
global.mysql = require('mysql');
global.async = require('async');
global.session = require('express-session');
global.cookieParser = require('cookie-parser');
global.svgCaptcha = require('svg-captcha');
global.multer = require('multer');

//定义各种参数
global.hostname = 'http:localhost:81/';
global.secret = 'sports.app.leaf.www';//随机
//启用中间件
global.app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(bodyParser.json());
app.use(cookieParser(secret));

// 启用session
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 3600 * 1000
    }
}));


//ejs模板引擎设置
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', 'views');



//数据库连接
global.conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0801410',
    port: 3306,
    database: 'photoapp',
    multipleStatements: true
});
conn.connect();

//文件上传  使用multer中的API：diskStorage    //destination存放路径      //filename文件命名方式
//按照年份、月份存放文件      es6方式，把字符串填充到两位padStart(长度，'在前面填充的字符'),满足长度的则不补。
//时间戳（1970开始）+随机数（0~1），去掉0和小数点，截取几位数+文件后缀=文件名    用.分成数组取数组中最后一个值
//保证文件唯一性   substr(start, length)
//originalname文件原始名称  取文件后缀   		
global.diskstorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2, '0')}`);
    },
    filename: function(req, file, cb) {
        let houzhui=file.originalname.split('.').pop();
        if(houzhui=='blob'){
            let filename = new Date().valueOf() + '_' + Math.random().toString().substr(2, 8) + '.png';
            cb(null, filename);
            return;
        }
        let filename = new Date().valueOf() + '_' + Math.random().toString().substr(2, 8) + '.' + houzhui;
        cb(null, filename)
    }
});
// 上传文件夹设置  //存放在uploads里面的年、月文件夹里面
global.upload = multer({ storage: diskstorage });

//验证码图片
app.get('/coders', (req, res) => {
    var captcha = svgCaptcha.create({
        noise: 4,
        ignoreChars: '0oli',
        size: 2,
        inverse: true,
        fontSize:84,
        background: 'rgba(255, 152, 0, 0.43)',
        height: 50,
        width: 150
    });
    console.log(req.session);
    console.log('验证码图片');
    console.log(captcha.text);
    coders = captcha.text;
    req.session.coders = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});

// 方便测试---后面要删除
app.use(function(req, res, next) {
    req.session.uid = 1;
    req.session.u_name = 'leaf';
    next();
	//if(req.session.uid==undefined){res.redirect('/fast_login.html');}
	//else{next();}
});






//子路由   用户
app.use('/admin', require('./module/admin/login'));
//游客 首页
app.use('/visitor', require('./module/visitor/app'));

//资源托管
app.use('/visitor/uploads', express.static('uploads'));
app.use('/uploads', express.static('uploads'));
app.use(express.static('static'));

//设置监听端口
app.listen(81, () => {
    console.log('服务器启动成功...');
})