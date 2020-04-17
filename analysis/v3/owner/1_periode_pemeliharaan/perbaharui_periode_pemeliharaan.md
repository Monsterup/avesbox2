@startuml
|pengguna|
start
:memilih menu periode pemeliharaan;
:memilih menu ubah periode pemeliharaan;
|sistem|
:menampilkan form ubah periode pemeliharaan;
|pengguna|
:submit form ubah periode pemeliharaan;
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