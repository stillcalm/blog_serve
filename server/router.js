const express = require('express')
const router = express.Router()
const db = require('./db')
const jwt = require("jsonwebtoken");

router.get('/', function (req, res) {
    console.log(Object.keys(req))
    console.log(req.headers)
    console.log(req.query)
    console.log(Object.keys(res))
    res.send("Hello,word")
})

// 获取博文列表
router.get('/api/archivesList', function (req, res) {
    db.Archive.find({},{content: 0}, function (err, docs) {
        if (err) {
            console.error(err)
            return
        }
        res.json(docs)
        console.log('请求成功！')
    })
})

// 获取博文详情
router.get('/api/archiveDetail/:id', function (req, res) {
    db.Archive.findOne({ id: req.params.id }, function (err, docs) {
        if (err) {
            console.error(err)
            return
        }
        res.send(docs)
        console.log('请求成功！')
    })
})

//登录
router.post('/api/admin/login', (req, res) => {
    db.User.find({ name: req.body.name, password: req.body.password}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if(docs.length > 0){
            let content ={name: req.body.name}; // 要生成token的主题信息
            let secretOrPrivateKey="suiyi" // 这是加密的key（密钥） 
            let token = jwt.sign(content, secretOrPrivateKey, {
                    expiresIn: 60*60*1  // 1小时过期
                });
            docs[0].token = token    //token写入数据库
            db.User(docs[0]).save(function (err) {
                if (err) {
                res.status(500).send()
                return
                }
                res.send({'status':1, 'msg':'登陆成功', 'token':docs[0].token,'user_name': docs[0]["name"]})     //反给前台
            })
        } else {
            res.send({'status':0, 'msg':'账号或密码错误'});
        }
    })
})

router.post('/api/admin/checkUser',(req, res)=>{
    db.User.find({ name: req.body.user_name,token: req.body.token},(err, docs)=>{
        if (err) {
            res.send(err);
            return
        }
        if(docs.length>0){
            let token = req.body.token; // 从body中获取token
            let secretOrPrivateKey="suiyi"; // 这是加密的key（密钥） 

            jwt.verify(token, secretOrPrivateKey, function (err, decode) {
                if (err) {  //  时间失效的时候/ 伪造的token          
                    res.send({'status':0});            
                } else {
                    res.send({'status':1});
                }
            })
        }else{
            res.send({'status':0});            
        }
    })
})


module.exports = router