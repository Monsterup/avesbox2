@startuml
actor user_1
actor user_2
actor user_3

cloud "managed influxdb" {
    database influxdb
}
cloud "managed postgre" {
    database postgre
}

cloud "independence cloud database" {
    database influxdb_indp
    database postgre_indp
}

cloud gcp_backend {
    queue load_balancer_be
    node backend_1
    node backend_2
    node backend_3
}

cloud gcp_frontend {
    node frontend_1
    node frontend_2
    node frontend_3
    queue load_balancer
}

influxdb <-- backend_1
influxdb <-- backend_2
influxdb_indp <-- backend_3

postgre <-- backend_1
postgre <-- backend_2
postgre_indp <-- backend_3


backend_1 <-- load_balancer_be
backend_2 <-- load_balancer_be
backend_3 <-- load_balancer_be

load_balancer_be <-- frontend_1
load_balancer_be <-- frontend_2
load_balancer_be <-- frontend_3

frontend_1 <-- load_balancer
frontend_2 <-- load_balancer
frontend_3 <-- load_balancer

load_balancer <-- user_1
load_balancer <-- user_2
load_balancer <-- user_3

@enduml