const express = require('express')
const port=3000
const router = require('./server/router')
const app = express()
const bodyParser = require('body-parser')


//设置跨域访问
app.all('*', function(req, res, next){
  res.header('Access-Control-Allow-Origin',  '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method === 'OPTIONS'){
    res.sendStatus(200);
  }else{
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(router);


app.listen(port, () => {
  console.log(`express server start at http://localhost:${port}`)
})