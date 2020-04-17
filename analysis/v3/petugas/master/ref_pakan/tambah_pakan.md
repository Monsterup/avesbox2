@startuml
|pengguna|
start
:memilih menu master pakan;
:memilih menu tambah pakan;
|sistem|
:menampilkan form tambah pakan;
|pengguna|
:submit form tambah pakan;
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