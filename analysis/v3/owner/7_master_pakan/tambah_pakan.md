@startuml
|pengguna|
start
:memilih menu Pakan;
:memilih menu tambah Pakan;
|sistem|
:menampilkan form tambah Pakan;
|pengguna|
:submit form tambah Pakan;
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