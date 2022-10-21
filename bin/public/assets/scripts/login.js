const loginVerify = (JSONData) => {
    if(JSONData.id != undefined){
        window.location.replace(`${window.origin}/auth/${JSONData.id}/cars-dashboard`);
    }else{
        // Tampilkan notifikasi login gagal
        alertNotify('Username and password is wrong');
        // Hentikan animasi loading login
        document.getElementById('submit').classList.remove('d-none');
        document.getElementById('loading').classList.add('d-none');
    }
}

const alertNotify = (notify) => {
    let alert = document.getElementById('alert');
    alert.classList.remove('d-none');
    alert.innerText = notify
    setTimeout(() => {
        alert.classList.add('d-none');
    }, 5000);
}

document.getElementById('submit').addEventListener('click', function(){
    let usr = document.getElementById('username').value;
    let pass = document.getElementById('password').value;

    // Buat animasi loading 
    this.classList.add('d-none');
    document.getElementById('loading').classList.remove('d-none');
    // Lakukan cek isi field
    if(usr == undefined || pass == undefined || usr == '' || pass == ''){
        // Munculkan notifikasi gagal 5 detik
        this.classList.remove('d-none');
        document.getElementById('loading').classList.add('d-none');
        alertNotify("Username and password can't blank");
    }else{
        let data = {
            username:usr, password:pass
        };
        data = JSON.stringify(data);
        requestServer(`${window.origin}/login`, 'POST', data, loginVerify);
    }
});