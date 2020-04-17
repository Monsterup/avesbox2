@startuml
|pengguna|
start
:memilih menu pengguna;
:memilih menu ubah pengguna;
|sistem|
:menampilkan form ubah pengguna;
|pengguna|
:submit form ubah pengguna;
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