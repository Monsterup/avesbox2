@startuml
|pengguna|
start
:memilih menu Pakan;
:memilih menu hapus Pakan;
|sistem|
:menampilkan dialog konfirmasi 
hapus Pakan;
|pengguna|
:melakukan konfirmasi 
hapus Pakan;
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