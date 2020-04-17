@startuml
|pengguna|
start
:memilih menu recording pemeliharaan;
:memilih menu ubah recording pemeliharaan;
|sistem|
:menampilkan form ubah recording pemeliharaan;
|pengguna|
:submit form ubah recording pemeliharaan;
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