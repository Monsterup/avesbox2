@startuml
|pengguna|
start
:memilih periode budidaya;
:memilih menu tambah 
pemberian pakan;
|sistem|
:menampilkan form 
tambah pemberian pakan;
|pengguna|
:submit form tambah pemberian pakan;
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