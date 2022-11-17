let listCars;

const skeletonLoading = new SkeletonTemplate('cards-car');
skeletonLoading.genTemplate();
skeletonLoading.setView(9);

if (notify != '' || error != '') {
    let alert = document.getElementById(notify != '' ? 'alert-success' : 'alert-danger');
    alert.innerText = notify != '' ? notify : error;
    alert.classList.remove('d-none');
    setTimeout(() => {
        alert.classList.add('d-none');
    }, 3000);
}

const handlerOpenData = (JSONData) => {
    if (JSONData.error != undefined) {
        window.location.replace('/login-page');
    } else {
        listCars = new ContentTemplateUser(JSONData, 'cards-car');
        listCars.setBlankView();
        listCars.setView();
        handleDeleteClick();
        handlerFilterByQuery();
    }
}

const handlerDeleteData = (JSONData) => {
    if (JSONData.error != undefined) {
        // Notifikasi gagal hapus
        let alert = document.getElementById('alert-danger');
        alert.innerText = JSONData.error;
        alert.classList.remove('d-none');
        setTimeout(() => {
            alert.classList.add('d-none');
        }, 3000);
    } else {
        // Notifikasi berhasil
        let alert = document.getElementById('alert-success');
        alert.innerText = "Data has deleted";
        alert.classList.remove('d-none');
        setTimeout(() => {
            alert.classList.add('d-none');
        }, 3000);
        // Renew JSON Data
        listCars.setBlankView();
        skeletonLoading.setView();
        listCars.setNewJson(`${window.origin}/auth/${userID}/cars`, listCars);
    }
}

requestServer(`${window.origin}/auth/${userID}/cars`, 'GET', {}, handlerOpenData);

// handling size card
document.querySelectorAll('.size').forEach(element => {
    element.addEventListener('click', function () {
        if (this.value == 'sm') {
            listCars.setBlankView();
            skeletonLoading.setView();
            listCars.setNewJson(`${window.origin}/auth/${userID}/cars/size/small`, listCars);
        } else if (this.value == 'md') {
            listCars.setBlankView();
            skeletonLoading.setView();
            listCars.setNewJson(`${window.origin}/auth/${userID}/cars/size/medium`, listCars);
        } else if (this.value == 'lg') {
            listCars.setBlankView();
            skeletonLoading.setView();
            listCars.setNewJson(`${window.origin}/auth/${userID}/cars/size/large`, listCars);
        } else {
            listCars.setBlankView();
            skeletonLoading.setView();
            listCars.setNewJson(`${window.origin}/auth/${userID}/cars`, listCars);
        }
    })
});

// handling delete car
const handleDeleteClick = () => {
    document.querySelectorAll('.btn-delete').forEach(element => {
        element.addEventListener('click', function () {
            let idData = this.getAttribute('value');
            document.querySelector('#form-delete input').value = idData;
        });
    });
}

document.getElementById('form-delete').addEventListener('submit', function (event) {
    event.preventDefault();

    // document.getElementById('submit').classList.add('d-none');
    // document.getElementById('loading').classList.remove('d-none');

    let carID = this.querySelector('input').value;
    // console.log(carID);

    requestServer(`${window.origin}/auth/${userID}/cars/${carID}`, 'DELETE', JSON.stringify({}), handlerDeleteData);
});

// handling search by name
document.getElementById('search-name').addEventListener('submit', function (event) {
    event.preventDefault();
    let param = this.querySelector('input').value;
    // console.log(param);
    listCars.setBlankView();
    skeletonLoading.setView();
    param == undefined || param == '' ? listCars.setNewJson(`${window.origin}/auth/${userID}/cars`, listCars) : listCars.setNewJson(`${window.origin}/auth/${userID}/cars/filter/${param}`, listCars);
});

const handlerFilterByQuery = ()=>{
    if(filter != ''){
        listCars.setBlankView();
        skeletonLoading.setView();
        listCars.setNewJson(`${window.origin}/auth/${userID}/cars/filter/${filter}`, listCars);
    }
}