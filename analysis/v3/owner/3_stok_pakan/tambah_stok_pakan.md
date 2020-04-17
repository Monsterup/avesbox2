@startuml
|pengguna|
start
:memilih menu Stok Pakan;
:memilih menu tambah Stok Pakan;
|sistem|
:menampilkan form tambah Stok Pakan;
|pengguna|
:submit form tambah Stok Pakan;
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