@startuml
|pengguna|
start
:memilih menu master kandang;
:memilih menu tambah kandang;
|sistem|
:menampilkan form tambah kandang;
|pengguna|
:submit form tambah kandang;
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