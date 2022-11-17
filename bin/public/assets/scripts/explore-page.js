// Setup select view flatpickr
flatpickr('#date', {
    disableMobile : true,
});
flatpickr('#time', {
    enableTime : true,
    noCalendar : true,
    time_24hr : true,
    disableMobile : true,
});

// Setup select box with select2
new TomSelect("#driver-type",{
	create: false,
	sortField: {
		field: "text",
		direction: "asc"
	}
});

// change background color on edit filter
document.addEventListener('click', evt => {
    console.log(evt)
});

// document.querySelectorAll('#search-box .input-group input').forEach(item => {
//     item.addEventListener('click', () => {
//         console.log("Heyyyy");
//         document.getElementById('bg-dark').style.display = 'unset';
//     });
// });
// document.querySelectorAll('#search-box .ts-control').forEach(item => {
//     item.addEventListener('click', () => {
//         document.getElementById('bg-dark').style.display = 'unset';
//     });
// });
// document.getElementById('search-box').addEventListener('click', () => {
//     document.getElementById('bg-dark').style.display = 'unset';
// });

let allNoteBox = document.getElementById('search-box-child').getElementsByTagName('*');
for (let i = 0; i < allNoteBox.length; i++) {
    allNoteBox[i].addEventListener('click', function () {
        console.log(allNoteBox[i])
        document.getElementById('bg-dark').style.display = 'unset';
        document.getElementById('search-box').style.zIndex = 1030;
    });
}

document.getElementById('bg-dark').addEventListener('click', function(){
    this.style.display = 'none';
    document.getElementById('search-box').style.zIndex = 'unset';
});

document.onkeydown = evt => {
    evt = evt || window.event;
    evt.keyCode == 27 ? document.getElementById('bg-dark').click() : '';
}



// Showing skeleton template
let objSetView = new SkeletonTemplate('result-part');
objSetView.genTemplate();
// objSetView.setView(8);

// let dataViews = JSON.parse(cars);
// console.log(dataViews);
let objSetViewContent = new ContentTemplate({}, 'result-part');
// setTimeout(() => {
//     objSetViewContent.setView();
// }, 300);

// Filterinng search
document.getElementById('search-now').addEventListener('click', () => {
    document.getElementById('bg-dark').click();
    console.log('esc');
    objSetView.setBlankView();
    objSetView.setView(8);

    setTimeout(() => {
        objSetViewContent.setNewJson(
            `${window.location.origin}/cars/`+
            (document.getElementById('driver-type').value == '' ? '-0-' : document.getElementById('driver-type').value)+'/'+
            (document.getElementById('date').value == '' ? '-0-' : document.getElementById('date').value)+'/'+
            (document.getElementById('time').value == '' ? '-0-' : document.getElementById('time').value)+'/'+
            (document.getElementById('count-people').value == '' ? '-0-' : document.getElementById('count-people').value),
            objSetViewContent
        );
    }, 300);
});
