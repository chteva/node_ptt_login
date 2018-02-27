var net = require('net');
var client = new net.Socket();
var iconv = require('iconv-lite');

var ptt_option = {
port:443,
host:'ptt.cc'
};

var auto_user = {
name:'username',
ps:'pass'
}

//client.setEncoding('big5');

client.connect(ptt_option, function() {
	console.log("connected ptt !!");
});

client.on('data', function(data) {
	data = iconv.decode(data, "big5");
	console.log("Received:"+data);
	if(~data.indexOf('guest')) {
		console.log('Logining page section.....');
		client.write(auto_user.name + "\r\n");	
	} else if(~data.indexOf('密碼')) {
		console.log('Enter password section ....');		
		client.write(auto_user.ps + "\r\n");  
	}
});

client.on('close', function() {
	console.log("Connection closed");
});

//auto close after 4 seconds
setTimeout(function(){client.end();}, 4000);

