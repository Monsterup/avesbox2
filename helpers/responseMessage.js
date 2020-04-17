exports.sendResetPassword = (url, token) => `<h2>Hello,</h2><br>Silahkan klik tautan dibawah untuk ubah passwordmu. <br><br> <b><a href=${url}/${token}>Klik Disini</a></b>`;
exports.sendVerifyEmail = (url, token) => `<h2>Hello,</h2><br>Silahkan klik tautan dibawah untuk verifikasi emailmu. <br><br> <b><a href=${url}/${token}>Klik Disini</a></b>`;
