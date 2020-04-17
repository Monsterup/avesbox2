@startuml
|pengguna|
start
:memilih menu master kandang;
:memilih menu ubah kandang;
|sistem|
:menampilkan form ubah kandang;
|pengguna|
:submit form ubah kandang;
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