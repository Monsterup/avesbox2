@startuml
|pengguna|
start
:memilih menu tambah periode budidaya;
|sistem|
:menampilkan form tambah periode budidaya;
|user|
:submit form tambah periode budidaya;
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