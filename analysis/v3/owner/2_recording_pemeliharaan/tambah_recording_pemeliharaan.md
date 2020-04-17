@startuml
|pengguna|
start
:memilih menu recording pemeliharaan;
split
:memilih menu 
tambah recording 
populasi;
split again
:memilih menu 
tambah recording 
pakan;
split again
:memilih menu 
tambah recording 
pertumbuhan;
end split
|sistem|
:menampilkan form tambah recording;
|pengguna|
:submit form tambah recording;
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