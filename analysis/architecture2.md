@startuml
actor user
agent agent
agent -- user : using
cloud "managed influxdb" {
    database influxdb
}
cloud "managed postgre" {
    database postgre
}

cloud gcp_frontend {
    node frontend
}

cloud gcp_backend {
    node backend
}

backend -- frontend
influxdb -- backend
postgre -- backend

frontend -- agent

@enduml