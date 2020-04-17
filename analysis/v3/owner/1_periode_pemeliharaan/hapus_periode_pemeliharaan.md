@startuml
|pengguna|
start
:memilih menu periode pemeliharaan;
:memilih menu hapus periode pemeliharaan;
|sistem|
:menampilkan dialog konfirmasi 
hapus periode pemeliharaan;
|pengguna|
:melakukan konfirmasi 
hapus periode pemeliharaan;
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