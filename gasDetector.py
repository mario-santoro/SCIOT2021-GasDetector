import paho.mqtt.client as paho
broker="192.168.1.14"
port=1883
def on_publish(client,userdata,result):             #create function for callback
    print("data published \n")
    pass
client1= paho.Client("control1")                           #create client object
client1.on_publish = on_publish                          #assign function to callback
client1.connect(broker,port)                                 #establish connection
import random

value=random.randint(0,100)
print(value)
ret= client1.publish("iot/sensori",value,0,False)                   #publish



