@startuml
|pengguna|
start
:memilih menu Kandang;
:memilih menu ubah Kandang;
|sistem|
:menampilkan form ubah Kandang;
|pengguna|
:submit form ubah Kandang;
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