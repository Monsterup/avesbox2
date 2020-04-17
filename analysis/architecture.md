@startuml
actor user
agent agent
agent -- user : using

cloud vps {
    database influxdb
    database postgre
    node frontend
    node backend
}

backend -- frontend
influxdb -- backend
postgre -- backend

frontend -- agent

@enduml