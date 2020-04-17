@startuml
|pengguna|
start
:memilih menu Stok Pakan;
:memilih menu hapus Stok Pakan;
|sistem|
:menampilkan dialog konfirmasi 
hapus Stok Pakan;
|pengguna|
:melakukan konfirmasi 
hapus Stok Pakan;
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