@startuml

scale 1000*1100
left to right direction
skinparam packageStyle rectangle
actor Petugas
actor "Owner/Manajer Perusahaan" as Owner

'skinparam linetype ortho

frame "   " {
    Petugas -- (Login)
    Petugas -- (Pengelolaan Kandang)
    Petugas -- (Pengelolaan Perkembangan Ternak)
    Petugas -- (Pengelolaan Pakan)
    Petugas -- (Pengelolaan IoT)
}

frame "   " {
    Owner -- (Login)
    Owner -- (Pengelolaan Kandang)
    Owner -- (Pengelolaan Perkembangan Ternak)
    Owner -- (Pengelolaan Pakan)
    Owner -- (Pengelolaan IoT)
    Owner -- (Pengguna)
}

@enduml