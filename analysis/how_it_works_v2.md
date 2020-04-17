@startuml
actor "User" as user1
actor "User" as user2
actor "User" as user3

cloud "DO vps 1 BE service" as backend {
    node nodejs
}

cloud "DO vps 3 FE service" as frontend {
    node react
}

cloud "Influxdata Managed influxdb" as db_ts {
    database influxdb
}

cloud "AWS Managed MongoDB" as managedMongoDB {
    database MongoDB
}

cloud "DO vps 2 MQTT broker" as iot_broker{
    node mosquitto
}

node "IoT Device" as iot_device_1
node "IoT Device" as iot_device_2
node "IoT Device" as iot_device_3

influxdb -- nodejs : TCP/IP
MongoDB -- nodejs : TCP/IP
nodejs -- mosquitto : MQTT
nodejs -- react : graphQL
mosquitto -- iot_device_1 : MQTT
mosquitto -- iot_device_2 : MQTT
mosquitto -- iot_device_3 : MQTT
react -- user1 : https
react -- user2 : https
react -- user3 : https

@enduml