@startuml
|pengguna|
start
:memilih menu IoT;
:memilih kandang;
:mendaftarkan kode alat ke kandang;
|sistem|
:menampilkan form pendaftaran alat;
|pengguna|
:submit form pendaftaran alat;
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