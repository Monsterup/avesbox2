@startuml
|pengguna|
start
:memilih menu stok pakan;
:memilih menu tambah stok pakan;
|sistem|
:menampilkan form tambah stok pakan;
|pengguna|
:submit form tambah stok pakan;
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