@startuml
|pengguna|
start
:masuk url daftar;
|sistem|
:menampilkan halaman daftar;
|pengguna|
:submit data diri & 
perusahaan/peternakan;
|sistem|
:mengirim konfirmasi ke email;
|pengguna|
:melakukan pengecekan 
kotak masuk email;
:melakukan konfirmasi;
|sistem|
if (data valid?) then (ya)
:menampilkan halaman dashboard;
stop
else (tidak)
:menampilkan error;
stop
endif
@enduml