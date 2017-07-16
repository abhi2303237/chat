var http=require('http');
var fs= require('fs');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var file = 'user.json';
var urlencodedParser = bodyParser.urlencoded({ extended: false })
/*
http.createServer(function (req,res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	var data = fs.readFileSync('index.html');
	res.write(data);
}).listen(8081);
console.log('server UP');
*/
var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello World');
   var data = fs.readFileSync('loginreg.html');
	res.write(data);

})
app.post('/register',urlencodedParser,function(req,res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	var name =req.body.name;
	var email=req.body.email;
	var password=req.body.password;
	

/*
var str = '{ "user" : [ ]}';
var obj = JSON.parse(str);
*/
var obj = jsonfile.readFileSync(file);
obj["user"].push('{"name":"' + name + '","email":"' + email + '","password":"' + password + '"}');

jsonfile.writeFile(file, obj, function (err) {
  console.error(err)
})

console.log(obj);
res.end('<script> alert("Registered") </script>');

});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})