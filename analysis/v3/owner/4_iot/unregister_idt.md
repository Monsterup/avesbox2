@startuml
|pengguna|
start
:memilih menu IoT;
:memilih kandang;
:menghapus alat dari daftar alat pada kandang;
|sistem|
:menampilkan konfirmasi;
|pengguna|
:pilih hapus alat;
|sistem|
if (konfirmasi hapus?) then (ya)
:menghapus data;
:menampilkan pesan sukses;
stop
else (tidak)
:tutup dialog konfirmasi;
stop
endif
@enduml