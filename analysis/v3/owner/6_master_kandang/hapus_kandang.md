@startuml
|pengguna|
start
:memilih menu Kandang;
:memilih menu hapus Kandang;
|sistem|
:menampilkan dialog konfirmasi 
hapus Kandang;
|pengguna|
:melakukan konfirmasi 
hapus Kandang;
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