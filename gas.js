var FUNCTION_NAME = "mqttconsume";
var amqp = require('amqplib');
var mysql = require('mysql');
var mqtt = require('mqtt'), url = require('url');

   
  var mqtt_url = url.parse(process.env.CLOUDAMQP_MQTT_URL || 'mqtt://guest:guest@<ip_address_ubuntu>:1883');
    var auth = (mqtt_url.auth || ':').split(':');
    var url = "mqtt://" + mqtt_url.host;
    var options = {
        port: mqtt_url.port,
        clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        username: auth[0],
        password: auth[1],
    };

function bin2string(array){
    var result = "";
    for(var i = 0; i < array.length; ++i){
        result+= (String.fromCharCode(array[i]));
    }
    return result;
}
function sendResponse(msg){
    var client = mqtt.connect(url, options);
    client.on('connect', function() {
        client.publish('segnalazione',msg, function() {
            client.end();       
        });
    });
}

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

}

function saveLog(value){
    
    var connection = mysql.createConnection({
        host: '<ip_address>',
        user: 'root',
        password: '',
        database: 'gas-detector'
        
    });
    var data=getDateTime();
    var sql="insert into log (data_segnalazione, valore) values('"+data+"', "+value+")";
    connection.connect();
 
connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  
});
    connection.end();
}


exports.handler = function(context, event) {
  var _event = JSON.parse(JSON.stringify(event));
    var _data = bin2string(_event.body.data);
    var gas=parseInt(_data);
  
  
    if(gas>=60){
        sendResponse("the percentage of gas detected in the home environment is: " +gas+"%");
  
    }
      saveLog(gas);
    context.callback("feedback "+gas);
};


