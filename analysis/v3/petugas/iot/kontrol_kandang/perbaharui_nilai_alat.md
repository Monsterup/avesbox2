@startuml
|pengguna|
start
:memilih menu IOT Kontrol;
:memilih alat yang ingin dikendalikan;
|sistem|
:menampilkan form setting alat;
|pengguna|
:submit form setting alat;
|sistem|
:validasi data yang diinput;
if (data valid?) then (ya)
:menyimpan data;
:publikasi data;
:menampilkan pesan sukses;
else (tidak)
:menampilkan error;
stop
endif
|alat IoT|
:menerima instruksi;
:menjalankan instruksi;
stop
@enduml