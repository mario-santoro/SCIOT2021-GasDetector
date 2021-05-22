const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather
const token = '1716579327:AAFtgO22DRD4QGMH2dqjoFRRsdaW1AfNYg0';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
 
var mqtt = require('mqtt');


  var client = mqtt.connect('mqtt://guest:guest@192.168.1.14:1883');

client.on('connect', () => {
  client.subscribe('segnalazione')
   
})

client.on('message',function(topic, message, packet){
	
	bot.sendMessage(769171660, message)

});

 


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
		
  // send a message to the chat acknowledging receipt of their message
	if(msg.text=="open the window" ||msg.text=="turn on alarm"){ 
	  	bot.sendMessage(chatId, '...Ok I '+msg.text);
	  	sendResponse(msg.text);
	}else if(msg.text=="help" ){
  		bot.sendMessage(chatId, 'Hi, to take an action you can write "open the window" or "turn on alarm".');
	}else{
		 bot.sendMessage(chatId, '"'+msg.text+ '" is not a valid command');
	}
});


function sendResponse(msg){
    var cli = mqtt.connect('mqtt://guest:guest@192.168.1.14:1883');
    cli.on('connect', function() {
        cli.publish('iot/segnalazione',msg, function() {
            cli.end();       
        });
    });
}
 
