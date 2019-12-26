const app = require('express')();
const mysql = require('mysql');


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '123456',
    database:'rao'
});

connection.connect();

//查询
app.get('/',function (req,res) {
    new Promise((resolve,reject)=>{
        const sql = 'SELECT * FROM reacts';
        connection.query(sql, function (err,result) {
            if(err){
                console.log('[SELECT ERROR]:',err.message);
            }
            resolve(result)
        });
    })
    .then((result)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.send(result);
    })
});

// 添加数据
app.post('/increase',function(req,res){
    req.on('data',(values)=>{
        let data = JSON.stringify(values);
        let data1 = new Buffer(JSON.parse(data))
        let data3 = data1.toString();
        let data2 = JSON.parse(data3);

        let y = 'INSERT INTO reacts ( `name`,`type`,`content`) VALUES(?,?,?);'
        let n = [data2.name, data2.type, data2.content,]

        connection.query(y, n,function (err,result) {
            if(err){
                console.log('[SELECT ERROR]:',err.message);
            }
            console.log('添加成功')
            
        });
        res.send({
            code: 0,
            msg: '添加成功'
        });
    })  
});

//删除
app.post('/delete',function(req,res){
    req.on('data',(values)=>{
        let data = JSON.stringify(values);
        let data1 = new Buffer(JSON.parse(data))
        let data3 = data1.toString();
        let data2 = JSON.parse(data3);

        let y = `DELETE FROM reacts WHERE id=${data2}`
        connection.query(y, function (err,result) {
            if(err){
                console.log('[SELECT ERROR]:',err.message);
            }
            console.log('删除成功')
        }); 
        res.send({
            code: 0,
            msg: '删除成功'
        });
    })
    
});

//修改
app.post('/modify',function(req,res){
    new Promise((resolve,reject)=>{
        req.on('data',(values)=>{
            let data = JSON.stringify(values);
            let data1 = new Buffer(JSON.parse(data))
            let data3 = data1.toString();
            let data2 = JSON.parse(data3);
    
            let y = `UPDATE reacts SET name='${data2.row.name}',type='${data2.row.type}', content='${data2.row.content}' WHERE id=${data2.id};`
            const n = 'SELECT * FROM reacts';
            connection.query(y,function (err,result) {
                if(err){
                    console.log('[SELECT ERROR]:',err.message);
                }
                console.log(result)
            });
            connection.query(n,function (err,result) {
                if(err){
                    console.log('[SELECT ERROR]:',err.message);
                }
                resolve(result);
            });
        })
    })
    .then((result)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.send(result);  ////服务器响应请求
    });
});
//模糊查询
app.post('/search',function(req,res){
    new Promise((resolve,reject)=>{
        req.on('data',(values)=>{
            let data = JSON.stringify(values);
            let data1 = new Buffer(JSON.parse(data))
            let data3 = data1.toString();
            let data2 = JSON.parse(data3);
            // let n = `select * from reacts where name='${data2}'`;
            let n = `SELECT * FROM reacts WHERE name LIKE '%${data2}%';`;
 
            connection.query(n, function (err,result) {
                if(err){
                    console.log('[SELECT ERROR]:',err.message);
                }
                resolve(result)
            });
        })  
    })
    .then((result)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.send(result);  ////服务器响应请求
    })   
    
});
app.listen(3080,function () {    ////监听3000端口
    console.log('Server running at 3080 port');
});

