@startuml
|pengguna|
start
:memilih menu periode pemeliharaan;
:memilih menu tambah periode pemeliharaan;
|sistem|
:menampilkan form tambah periode pemeliharaan;
|pengguna|
:submit form tambah periode pemeliharaan;
|sistem|
:validasi data yang diinput;
if (data valid?) then (ya)
:menyimpan data;
:menampilkan pesan sukses;
stop
else (tidak)
:menampilkan error;
stop
endif
@enduml