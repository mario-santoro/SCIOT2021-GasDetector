# GasDetector
this is a project for the exam SCIOT (Serverless Computing for IoT) the Università degli Studi di Salerno, Master's degree in Computer Science Cloud Computing curriculum.
<br><br>
This project aims to use simulated sensors that send a message on a topic (on RabbitMQ) and a function in Nuclio that recive message and do action.<br>
The idea is simulated sensor for take over the gas in the environment and send it on a topic, while there is a function that recive this value and if it is major than a certain fix number, the function send a message via Telegram's bot.<br>
The telegram's bot work in a Nodejs Script.<br>
When the value is segnaled via bot, the user can response with one of action possible (example "open the window") and it send a message on antoher topic that antoher script simulated in Python use to simulates the work of IoT (for example open the window) and it print a message for the executed action.

## Index
<ul>
	<li> <a href="https://github.com/mario-santoro/gas-detector-SCIOT2021#architecture">Architecture</a></li>
	<li> <a href="https://github.com/mario-santoro/gas-detector-SCIOT2021#prerequisites">Prerequisites</a></li>
	<li> <a href="https://github.com/mario-santoro/gas-detector-SCIOT2021#install">Install</a></li>
	<li> <a href="https://github.com/mario-santoro/gas-detector-SCIOT2021#usage">Usage</a></li>
	<li> <a href="https://github.com/mario-santoro/gas-detector-SCIOT2021#future-developments">Future developments</a></li>
	<li> <a href="https://github.com/mario-santoro/gas-detector-SCIOT2021#author">Author</a></li>
</ul>

## Architecture
<img align="center"  src="https://github.com/mario-santoro/gas-detector-SCIOT2021/blob/main/documentation/architecture.png?raw=true" >

## Prerequisites
<ul>
  <li>Environment with python (for example Visual Studio Code)</li>
  <li>OS Linux Ubuntu (also on Virtual machine)</li>
  <li>DataBase MySQL</li>
  <li>Install Nodejs on Ubuntu</li>
  <li>Telegram Bot on BotFather</li>
</ul> 

## Install
Docker Installation:
```console
$ sudo apt-get update
$ sudo apt-get install \apt-transport-https \ca-certificates \curl \software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo apt-key fingerprint 0EBFCD88
$ sudo add-apt-repository    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \     $(lsb_release -cs) \ stable"
$ sudo apt-get update
$ sudo apt-get install docker-ce
if Ubuntu 18.4
$ sudo apt install docker.io
```
In local install a package for telegram bot
```console
$ sudo apt install npm
$ npm i node-telegram-bot-api
$ npm install mqtt
```

## Usage
In "telegramBot.js" change the token and chat-id with your token and chat-id. <br>
Launch RabbitMQ with command:
```console
$ sudo docker run -p 9000:15672 -p 1883:1883 -p 5672:5672  cyrilix/rabbitmq-mqtt
```
Launch Nuclio with command:
```console
$ sudo docker run -p 8070:8070 -v /var/run/docker.sock:/var/run/docker.sock -v /tmp:/tmp nuclio/dashboard:stable-amd64
```
In Nuclio after create a project and a new Nodejs function in the section configuration, in Build commands, you must insert follow command:
```console
npm install --global moment
npm install amqplib mqtt
npm install mysql
npm i node-telegram-bot-api
```
While in Nuclio's Triggers in the section class you must insert "MQTT", in URL insert "guest:guest@<ip_address_ubuntu>:1883", in topic "<your_topic_name>", and in 
QoS "0".  <br>
In Nuclio's code insert the code in "gas.js" by replacing where needed with your <ip_address_ubuntu> and your topic.<br>
Launch Telegram bot with command:
```console
$ node telegramBot.js
```
Launch the script "iotSensors.py" and "gasDetector.py" on Visual Studio Code for work the program and chat with the bot for choose the action.  

## Future developments
As future developments, the chat id and information of each user can be stored in the database when the chatbot is first started.<br>
This information would be associated with the user's sensors (also stored in the DB with their identifier) in order to understand to which user to send the perceived data.<br>
Another future development is the possibility of asking the chatbot to show it the last N logs stored in the database, in order to monitor the situation. <br>
In the end ask the chatbot to add new IoT devices to take action.

## Author
<b>Mario Santoro</b> <br><br>
<img align="center" height="150" src="https://github.com/mario-santoro/gas-detector-SCIOT2021/blob/main/documentation/aboutMe.png?raw=true" >
