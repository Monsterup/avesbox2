@startuml
|pengguna|
start
:memilih menu Stok Pakan;
:memilih menu ubah Stok Pakan;
|sistem|
:menampilkan form ubah Stok Pakan;
|pengguna|
:submit form ubah Stok Pakan;
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