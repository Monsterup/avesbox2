@startuml
|pengguna|
start
:memilih menu Pakan;
:memilih menu ubah Pakan;
|sistem|
:menampilkan form ubah Pakan;
|pengguna|
:submit form ubah Pakan;
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