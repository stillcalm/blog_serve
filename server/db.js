var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost:27017/blog',{
    useNewUrlParser: true 
})

//监听数据库连接状态
mongoose.connection.once('open',()=>{
    console.log('数据库连接成功……')
})
mongoose.connection.once('close',()=>{
    console.log('数据库断开……')
})


const userSchema = new mongoose.Schema({
    name: String,
    password: String
  })

//创建Schema对象（约束）
const archiveSchema = new mongoose.Schema({
    archive_id: String,
    title: String,
    date_write: String,
    date_latest: String,
    content: String,
    tags: Array,
    like: String,
    reader: String
})

const Models = {
  User: mongoose.model('User', userSchema),
  Archive: mongoose.model('Archive', archiveSchema)
}

module.exports = Models



/* Models.User.create({
    name: "admin",
    password: "123456"
    article_id: "1",
    title: "数组优化",
    date_write: "2002-02-14",
    date_latest: "2020-03-12",
    content: "dasdghjghja",
    tags: ['js','vue','性能'],
    like: "0",
    reader: "0"
},(err,docs)=>{
    if(!err){
        console.log('插入成功'+docs)
    }
}) */

