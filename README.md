# GasDetector

this is a project for the exam SCIOT (Serverless Computing for IoT) the Università degli Studi di Salerno, Master&#39;s degree in Computer Science Cloud Computing curriculum.
&lt;br&gt;&lt;br&gt;
This project aims to use simulated sensors that send a message on a topic (on RabbitMQ) and a function in Nuclio that recive message and do action.&lt;br&gt;
The idea is simulated sensor for take over the gas in the environment and send it on a topic, while there is a function that recive this value and if it is major than a certain fix number, the function send a message via Telegram&#39;s bot.&lt;br&gt;
The telegram&#39;s bot work in a Nodejs Script.&lt;br&gt;
When the value is segnaled via bot, the user can response with one of action possible (example &quot;open the window&quot;) and it send a message on antoher topic that antoher script simulated in Python use to simulates the work of IoT (for example open the window) and it print a message for the executed action.

## Index

&lt;ul&gt;
    &lt;li&gt; &lt;a href=&quot;https://github.com/mario-santoro/gas-detector-SCIOT2021#architecture&quot;&gt;Architecture&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt; &lt;a href=&quot;https://github.com/mario-santoro/gas-detector-SCIOT2021#prerequisites&quot;&gt;Prerequisites&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt; &lt;a href=&quot;https://github.com/mario-santoro/gas-detector-SCIOT2021#install&quot;&gt;Install&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt; &lt;a href=&quot;https://github.com/mario-santoro/gas-detector-SCIOT2021#usage&quot;&gt;Usage&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt; &lt;a href=&quot;https://github.com/mario-santoro/gas-detector-SCIOT2021#future-developments&quot;&gt;Future developments&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt; &lt;a href=&quot;https://github.com/mario-santoro/gas-detector-SCIOT2021#author&quot;&gt;Author&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;

## Architecture

## Prerequisites

&lt;ul&gt;
  &lt;li&gt;Environment with python (for example Visual Studio Code)&lt;/li&gt;
  &lt;li&gt;OS Linux Ubuntu (also on Virtual machine)&lt;/li&gt;
  &lt;li&gt;DataBase MySQL&lt;/li&gt;
  &lt;li&gt;Install Nodejs on Ubuntu&lt;/li&gt;
  &lt;li&gt;Telegram Bot on BotFather&lt;/li&gt;
&lt;/ul&gt;

## Install

Docker Installation:

```console
$ sudo apt-get update
$ sudo apt-get install \apt-transport-https \ca-certificates \curl \software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo apt-key fingerprint 0EBFCD88
$ sudo add-apt-repository    &quot;deb [arch=amd64] https://download.docker.com/linux/ubuntu \     $(lsb_release -cs) \ stable&quot;
$ sudo apt-get update
$ sudo apt-get install docker-ce
```

In local install a package for telegram bot

```console
$ npm i node-telegram-bot-api
$ npm install mqtt
```

## Usage

In &quot;telegramBot.js&quot; change the token and chat-id with your token and chat-id. &lt;br&gt;
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

While in Nuclio&#39;s Triggers in the section class you must insert &quot;MQTT&quot;, in URL insert &quot;guest:guest@&lt;ip_address_ubuntu&gt;:1883&quot;, in topic &quot;&lt;your_topic_name&gt;&quot;, and in 
QoS &quot;0&quot;. &lt;br&gt;
In Nuclio&#39;s code insert the code in &quot;gas.js&quot; by replacing where needed with your &lt;ip_address_ubuntu&gt; and your topic.&lt;br&gt;
Launch Telegram bot with command:

```console
$ node telegramBot.js
```

Launch the script &quot;iotSensors.py&quot; and &quot;gasDetector.py&quot; on Visual Studio Code for work the program and chat with the bot for choose the action.

## Future developments

As future developments, the chat id and information of each user can be stored in the database when the chatbot is first started.&lt;br&gt;
This information would be associated with the user&#39;s sensors (also stored in the DB with their identifier) in order to understand to which user to send the perceived data.&lt;br&gt;
Another future development is the possibility of asking the chatbot to show it the last N logs stored in the database, in order to monitor the situation. &lt;br&gt;
In the end ask the chatbot to add new IoT devices to take action.

## Author

&lt;b&gt;**Mario Santoro**&lt;/b&gt; &lt;br&gt;&lt;br&gt;
