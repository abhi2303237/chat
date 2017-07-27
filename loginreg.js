var http=require('http');
var fs= require('fs');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var jsonQuery = require('json-query');
var file = 'user.json';
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var arr = Array();
var found=0;
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
//var jsonobj = obj["user"];
arr= JSON.parse(obj);
for(var i = 0; i<arr.length;i++){
	var temp = arr[i];
	temp=JSON.parse(temp);

	if (temp.email==email){
		found=1;
		break;
	}

}

if (found){
	console.log(temp.email);
	res.end('<script> alert("Email already exist") </script>');
}
else{

		arr.push('{"name":"' + name + '","email":"' + email + '","password":"' + password + '"}');
		console.log(arr);
		obj=JSON.stringify(arr);
		jsonfile.writeFile(file, obj, function (err) {
          console.error(err)
         })
		res.end('<script> alert("Registered") </script>');
	}


});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})