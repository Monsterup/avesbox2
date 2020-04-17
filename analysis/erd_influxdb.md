@startuml
' hide the spot
hide circle
' avoid problems with angled crows feet
skinparam linetype ortho

entity record {
    * id : int unsigned <<auto increment>>
    * time : datetime
    * id_device : int unsigned
    * id_kandang : int unsigned
    * id_sensor : timestamp
    * nilai : timestamp
    * satuan : timestamp
    * id_users : int unsigned <<FK>>
    * id_periode_pemeliharaan : int unsigned <<FK>>
}

entity log_users {
    * id : int unsigned <<auto increment>>
    * time : datetime
    * action : varchar(255)
    * url : varchar(255)
    * id_users : int unsigned <<FK>>
}

entity log_admin {
    * id : int unsigned <<auto increment>>
    * time : datetime
    * action : varchar(255)
    * url : varchar(255)
    * id_admin : int unsigned <<FK>>
}

@enduml