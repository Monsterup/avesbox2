@startuml
|pengguna|
start
:memilih periode budidaya;
:memilih menu tambah data 
pengurangan populasi;
|sistem|
:menampilkan form tambah 
data pengurangan populasi;
|pengguna|
:submit form tambah data
pengurangan populasi;
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