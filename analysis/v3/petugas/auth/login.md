@startuml
|pengguna|
start
:masuk url login;
|sistem|
:menampilkan halaman login;
|pengguna|
:submit username dan password;
|sistem|
:cek database;
if (data valid?) then (ya)
:menampilkan halaman dashboard;
stop
else (tidak)
:menampilkan error;
stop
endif
@enduml