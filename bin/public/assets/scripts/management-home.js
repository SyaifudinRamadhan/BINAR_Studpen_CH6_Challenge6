let openSidebar = false;

const sidebarOp = (indicator) => {
    if(indicator == false){
        document.getElementById('main-sidebar').classList.add('col-3');
        document.getElementById('sidebar-open').classList.remove('d-none');
        document.getElementById('content-sidebar').classList.add('col-content-collapse');
        document.querySelector('#content-sidebar nav').classList.add('col-content-collapse');
        return true;
    }else{
        document.getElementById('main-sidebar').classList.remove('col-3');
        document.getElementById('sidebar-open').classList.add('d-none');
        document.getElementById('content-sidebar').classList.remove('col-content-collapse');
        document.querySelector('#content-sidebar nav').classList.remove('col-content-collapse');
        return false;
    }
}

document.querySelectorAll('.collapse-side').forEach(element => {
    element.addEventListener('click', function(){
        openSidebar = sidebarOp(openSidebar);
    });
});

// userID = window.location.pathname.split('/')[2];

document.getElementById('logout').addEventListener('click', ()=>{
    requestServer(`${window.origin}/auth/${userID}/logout`, 'GET', {}, JSONData => {
        console.log(JSONData);
        window.location.replace('/login-page');
    })
})

// handling search by name
document.getElementById('search-name').addEventListener('submit', function (event) {
    event.preventDefault();
    let thisLoc = window.location.href;
    let trueLoc = `${window.origin}/auth/${userID}/cars-dashboard`;
    let param = this.querySelector('input').value;
    thisLoc != trueLoc ? window.location.replace(trueLoc+`?filter=${param}`) : '';
});