@startuml
|pengguna|
start
:memilih menu Kandang;
:memilih menu tambah Kandang;
|sistem|
:menampilkan form tambah Kandang;
|pengguna|
:submit form tambah Kandang;
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