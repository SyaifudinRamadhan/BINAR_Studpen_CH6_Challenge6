let nameCar = document.getElementById('name');
let typeCar = document.getElementById('type_car');
let price = document.getElementById('price');
let available1 = document.getElementById('available');
let available2 = document.getElementById('not-available');
let availableAt = document.getElementById('available_at');
let capacity = document.getElementById('capacity');
let size = document.getElementById('size');
let img = document.getElementById('image-uploaded');
let year = document.getElementById('year');
let desc = document.getElementById('desc');
let trans = document.getElementById('transmission');


let btnOp = document.getElementById('btn-op');
let btnLoading = document.getElementById('loading');

const handlerGetData = (JSONData) => {
    if(JSONData.error != undefined){
        // Kembli ke page awal dengan notifikasi error
        JSONData.status == 404 ? window.location.replace(`${window.origin}/auth/${userID}/cars-dashboard?error=${JSONData.error}`) : window.location.replace('/login-page');
    }else{
        // Proses data view
        nameCar.value = JSONData.car.name;
        typeCar.value = JSONData.car.type_car;
        price.value = JSONData.car.price;
        JSONData.car.available == true ? available1.checked = true : available2.checked = true;
        // avDate = new Date(JSONData.car.available_at);
        availableAt.value = `${JSONData.car.available_at.split('.')[0]}`;
        capacity.value = JSONData.car.capacity;
        size.value = JSONData.car.size;
        img.href = `${window.origin}/${JSONData.car.image}`;
        img.innerHTML = `(Uploaded: ${JSONData.car.image})`;
        year.value = JSONData.car.year;
        desc.value = JSONData.car.description;
        trans.value = JSONData.car.transmission;
    }
}

requestServer(`${window.origin}/auth/${userID}/cars/${carID}`,'GET',JSON.stringify({}),handlerGetData);

// Handler update data
const handlerUpdateData = (JSONData) => {
    JSONData.error != undefined ? window.location.replace(`${window.origin}/auth/${userID}/cars-dashboard?error=${JSONData.error}`) : window.location.replace(`${window.origin}/auth/${userID}/cars-dashboard?notify=Data has updated`);
};

const form = document.forms.namedItem('form-update');
form.addEventListener("submit", function (event) {
    event.preventDefault();

    btnOp.classList.add('d-none');
    btnLoading.classList.remove('d-none');
    
    const formData = new FormData(this);
    console.log(formData);
    requestServer(`${window.origin}/auth/${userID}/cars/${carID}`,'PUT',formData,handlerUpdateData, setHeader = false);
});