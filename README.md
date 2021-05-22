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
```
In local install a package for telegram bot
```console
$ npm i node-telegram-bot-api
$ npm install mqtt
```

## Usage
 

## Future developments
 

## Author
<b>Mario Santoro</b> <br><br>
<img align="center" height="150" src="https://github.com/mario-santoro/gas-detector-SCIOT2021/blob/main/documentation/aboutMe.png?raw=true" >
