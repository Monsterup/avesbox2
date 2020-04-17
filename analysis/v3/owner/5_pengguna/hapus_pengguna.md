@startuml
|pengguna|
start
:memilih menu pengguna;
:memilih menu hapus pengguna;
|sistem|
:menampilkan dialog konfirmasi hapus pengguna;
|pengguna|
:melakukan konfirmasi hapus pengguna;
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