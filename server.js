var express = require('express');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname,'ui','index.html'));
});


app.get('/createblog',function(req,res) {
  res.sendFile(path.join(__dirname,'ui','createblog.html'));
});

app.get('/login',function(req,res) {
  res.sendFile(path.join(__dirname,'ui','login.html'));
});

app.get('/register',function(req,res) {
  res.sendFile(path.join(__dirname,'ui','register.html'));
});


app.get('/viewblogs',function(req,res) {
  res.sendFile(path.join(__dirname,'ui','viewblogs.html'));
});


app.get('/blog',function(req,res) {
  res.sendFile(path.join(__dirname,'ui','blog.html'));
});

app.get('/logout',function(req,res) {
  res.sendFile(path.join(__dirname,'ui','index.html'));
});

app.get('/success',function(req,res) {
  res.sendFile(path.join(__dirname,'ui','success.html'));
});


app.get('/getblogs',function(req,res) {
  con.query("SELECT * FROM blog order by timestamp DESC", function(error,results,fields) {
    var blogrsp = {"code":200, "blogs":[]};
    if(!error) {
        blogrsp.blogs = results;
        res.send(blogrsp);
    }
  });
});






app.use(express.static(__dirname + '/images'));


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "AkHiL777",
  database: "users"
});

app.post('/insert',function(req,res) {
  console.log('req.body');
  console.log(req.body);
  var sql = "INSERT INTO list(firstname,lastname,email,password,day,month,year) VALUES ('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.email+"','"+req.body.psw+"','"+req.body.day+"','"+req.body.month+"','"+req.body.year+"')";
  var ss = true;
  if(ss) {
    res.redirect('/success');
  }
  res.end()
  con.query(sql,function(err,result) {
    if(err) throw err;
    console.log("Record inserted");
  });
});


app.post('/check',function(req,res) {
  console.log(req.body);
  var email = req.body.uname;
  var psw = req.body.psw;
  console.log("SELECT * FROM list WHERE email = '"+email+"'");
  con.query("SELECT * FROM list WHERE email = '"+email+"'",function(error,results,fields) {
    if(error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    } else{
      
     if(results.length > 0){
	console.log(results[0]);
       if(results[0].password == psw) {
	res.redirect('/blog');
         /*res.send({
           "code":200,
           "success":"login sucessfully"
         });*/
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
        });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email doesnot exists"
      });
    } 
    } 
   });
 });
  
 app.post('/save',function(req,res) {
   console.log(req.body);
   var title = req.body.title;
   var description = req.body.description;  
   console.log('req.body');
   console.log(req.body);
   var sql = "INSERT INTO blog(author,blog,title) VALUES ('"+req.body.author+"','"+req.body.blog+"','"+req.body.title+"')";
   var ss = true;
   if(ss) {
     res.redirect('/blog');
   }
   res.end()
   con.query(sql,function(err,result) {
     if(err) throw err;
     console.log("Record inserted");
  });
});
 

         
      
con.connect(function(err) {
  if (err) throw err;
  else
    console.log("connected!");
});
var port = 8080;
app.listen(8080,function() {
  console.log('Server running on 8080');
});
