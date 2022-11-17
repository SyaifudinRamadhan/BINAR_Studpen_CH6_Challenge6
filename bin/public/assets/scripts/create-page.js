let btnOp = document.getElementById('btn-op');
let btnLoading = document.getElementById('loading');

const handlerGetData = (JSONData) => {
    if(JSONData.error != undefined){
        // Kembli ke page awal dengan notifikasi error
        JSONData.status == 404 ? window.location.replace(`${window.origin}/auth/${userID}/cars-dashboard?error=${JSONData.error}`) : window.location.replace('/login-page');
    }
}

requestServer(`${window.origin}/auth/${userID}/cars`,'GET',JSON.stringify({}),handlerGetData);

// Handler create data
const handlerCreateData = (JSONData) => {
    JSONData.error != undefined ? window.location.replace(`${window.origin}/auth/${userID}/cars-dashboard?error=${JSONData.error}`) : window.location.replace(`${window.origin}/auth/${userID}/cars-dashboard?notify=Data has created`);
};

const form = document.forms.namedItem('form-create');
form.addEventListener("submit", function (event) {
    event.preventDefault();

    btnOp.classList.add('d-none');
    btnLoading.classList.remove('d-none');
    
    const formData = new FormData(this);
    console.log(formData);
    requestServer(`${window.origin}/auth/${userID}/cars`,'POST',formData,handlerCreateData, setHeader = false);
});