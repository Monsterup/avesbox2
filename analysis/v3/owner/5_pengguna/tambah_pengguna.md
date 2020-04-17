@startuml
|pengguna|
start
:memilih menu pengguna;
:memilih menu tambah pengguna;
|sistem|
:menampilkan form tambah pengguna;
|pengguna|
:submit form tambah pengguna;
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