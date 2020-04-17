@startuml
|pengguna|
start
:memilih menu recording pemeliharaan;
:memilih menu hapus recording pemeliharaan;
|sistem|
:menampilkan dialog konfirmasi 
hapus recording pemeliharaan;
|pengguna|
:melakukan konfirmasi 
hapus recording pemeliharaan;
|sistem|
:validasi data yang diinput;
if (konfirmasi hapus?) then (ya)
:menghapus data;
:menampilkan pesan sukses;
stop
else (tidak)
:tutup dialog konfirmasi;
stop
endif
@enduml