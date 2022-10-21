const handlerRegister = (JSONData) => {
    if (JSONData.id != undefined) {
        window.location.replace(`${window.origin}/auth/${JSONData.id}/cars-dashboard`);
    } else {
        // Tampilkan notifikasi login gagal
        alertNotify(JSONData.error);
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


document.getElementById('form-register').addEventListener('submit', function (event) {
    event.preventDefault();

    document.getElementById('submit').classList.add('d-none');
    document.getElementById('loading').classList.remove('d-none');

    let form = new FormData(this);
    let datas = {};
    form.forEach((value, key) => { value != undefined || value != '' ? datas[key] = value : '' });
    datas = JSON.stringify(datas);
    requestServer(`${window.origin}/register`, 'POST', datas, handlerRegister);
});