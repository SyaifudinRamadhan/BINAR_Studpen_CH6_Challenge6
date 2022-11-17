// Abstract class
class TemplateView {
    #JSONData;
    constructor(JSONData, targetDOM) {
        this.#JSONData = JSONData;
        this.target = targetDOM;
    }

    setNewJson(url, childObj) {
        // Metode XHTTPRequest
        const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
            this.#setJSONData(JSON.parse(xhttp.response));
            console.log(JSON.parse(xhttp.response), 'ini hasil response');
            console.log(typeof (functionExp));
            childObj.setView();
        }
        xhttp.open('GET', url);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    }

    _setTemplate(tempateString) {
        this.tempateString = tempateString;
    }

    setView() {
        document.getElementById(this.target).innerHTML += this.tempateString;
    }

    setBlankView() {
        document.getElementById(this.target).innerHTML = '';
    }

    #setJSONData(newData) {
        this.#JSONData = newData;
    }
    getJSONData() {
        return this.#JSONData;
    }
}

// child class / polymorpishm
class SkeletonTemplate extends TemplateView {
    #strTemplate = strTempalate(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'col-md-4');

    constructor(targetDOM) {
        super([{}], targetDOM);
    };

    genTemplate() {
        super._setTemplate(this.#strTemplate);
    }

    setNewJson() {
        console.log('This not using data anymore. Is only skeleton view');
    }

    setView(num) {
        for (let i = 0; i < num; i++) {
            super.setView();
        }
    }
}

class ContentTemplate extends TemplateView {

    constructor(JSONData, targetDOM) {
        super(JSONData, targetDOM);
    };

    #strTemplate;

    #genTemplate(objData) {
        this.#strTemplate = strTempalate(objData.name, objData.type.name, objData.image, objData.price, objData.description, objData.transmission, objData.capacity, objData.year);
        super._setTemplate(this.#strTemplate);
    }

    setView() {
        console.log('ini dijalnakan lohh');
        this.setBlankView();
        this.getJSONData().cars.forEach(element => {
            this.#genTemplate(element);
            super.setView();
        });
    }
}

class ContentTemplateUser extends TemplateView{
    constructor(JSONData, targetDOM) {
        super(JSONData, targetDOM);
    };

    #strTemplate;

    #genTemplate(objData, size) {
        this.#strTemplate = strTempalate2(objData.image, objData.name, objData.type.name, objData.price, objData.updatedAt, objData.id, objData.user_id, size);
        super._setTemplate(this.#strTemplate);
    }

    setView(size) {
        console.log('ini dijalnakan lohh');
        this.setBlankView();
        this.getJSONData().cars.forEach(element => {
            this.#genTemplate(element, size);
            super.setView();
        });
    }
}


const strTempalate = (carName, carType, img, rentPrice, desc, opt, cpty, carYear, column) => {
    return `<div class="${column == undefined ? 'col-md-3' : column} mb-3">
    <div class="card">
      
        ${img == undefined ? '<div class="w-100 card-img-top bg-skeleton img-skeleton"></div>' : '<div class="w-100 card-img-top img-skeleton" style="background-image: url(' + img + ')"></div>'}

      <div class="card-body">
        ${carName == undefined ? '<div class="rounded-pill w-100 bg-skeleton title-skeleton"></div>' : '<h5 class="card-title">' + carName + ' / ' + carType + '</h5>'}
        ${rentPrice == undefined ? '' : '<h4 class="fw-bold">Rp. ' + currencyEncode(rentPrice) + '/hari' + '</h4>'}
        <p class="card-text">
          ${desc == undefined ? '<div class="rounded-pill bg-skeleton mb-2 p1-skeleton"></div>' : '<p class="card-text">' + desc + '</p>'}
          ${cpty == undefined ? '<div class="rounded-pill bg-skeleton mb-2 p2-skeleton"></div>' : '<p class="card-text"><i class="bi bi-people"></i> ' + cpty + ' Orang' + '</p>'}
          ${opt == undefined ? '<div class="rounded-pill bg-skeleton mb-2 p3-skeleton"></div>' : '<p class="card-text"><i class="bi bi-gear"></i> ' + opt + '</p>'}
          ${carYear == undefined ? '<div class="rounded-pill bg-skeleton mb-2 p3-skeleton"></div>' : '<p class="card-text"><i class="bi bi-calendar"></i> Tahun ' + carYear + '</p>'}
        </p>
        ${rentPrice == undefined ? '<div class="rounded-pill w-100 bg-skeleton btn-skeleton"></div>' : '<button class="btn btn__mod w-100 btn-success fw-bold">Pilih Mobil</button>'}
      </div>
    </div>
  </div>`;
}

const strTempalate2 = (image, nameCar, typeCar, price, updatedAt, carID, userID, size) => {
    return `<div class="${size == undefined ? 'col-md-4' : size} mb-4">
    <div class="card-wrapper">
    <div class="card rounded-3">
        <div class="w-100 card-img-top img-skeleton" style="background-image: url('${image}')"></div>
        <div class="card-body">
            <p class="card-text">${nameCar}/${typeCar}</p>
            <p class="card-text fs-6 mt-1 fw-bold price">${price} / hari</p>
            <div class="d-flex align-items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.99984 18.3333C14.6022 18.3333 18.3332 14.6024 18.3332 10C18.3332 5.39762 14.6022 1.66666 9.99984 1.66666C5.39746 1.66666 1.6665 5.39762 1.6665 10C1.6665 14.6024 5.39746 18.3333 9.99984 18.3333Z"
                        stroke="#8A8A8A"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path d="M10 5V10L13.3333 11.6667" stroke="#8A8A8A" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="card-text fw-light">${new Date(updatedAt)}</p>
            </div>
            <div class="row mt-4 row row__mod">
                <div class="col mb-3">
                    <a value="${carID}" data-bs-toggle="modal" href="#modalToogle" role="button" class="btn btn-delete border-1 d-flex align-items-center justify-content-center gap-2 fw-bold">
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 4.5H4H16" stroke="#FA2C5A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M6.25 4.5V3C6.25 2.60218 6.40804 2.22064 6.68934 1.93934C6.97064 1.65804 7.35218 1.5 7.75 1.5H10.75C11.1478 1.5 11.5294 1.65804 11.8107 1.93934C12.092 2.22064 12.25 2.60218 12.25 3V4.5M14.5 4.5V15C14.5 15.3978 14.342 15.7794 14.0607 16.0607C13.7794 16.342 13.3978 16.5 13 16.5H5.5C5.10218 16.5 4.72064 16.342 4.43934 16.0607C4.15804 15.7794 4 15.3978 4 15V4.5H14.5Z"
                                stroke="#FA2C5A"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path d="M10.75 8.25V12.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.75 8.25V12.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Delete
                    </a>
                </div>
                <div class="col mb-3">
                    <a href="${window.origin}/auth/${userID}/cars/${carID}/update-page" class="btn btn-edit border-1 d-flex align-items-center justify-content-center gap-2 fw-bold">
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_40712_3558)">
                                <path
                                    d="M9 3H3.75C3.35218 3 2.97064 3.15804 2.68934 3.43934C2.40804 3.72064 2.25 4.10218 2.25 4.5V15C2.25 15.3978 2.40804 15.7794 2.68934 16.0607C2.97064 16.342 3.35218 16.5 3.75 16.5H14.25C14.6478 16.5 15.0294 16.342 15.3107 16.0607C15.592 15.7794 15.75 15.3978 15.75 15V9.75"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M14.625 1.875C14.9234 1.57663 15.328 1.40901 15.75 1.40901C16.172 1.40901 16.5766 1.57663 16.875 1.875C17.1734 2.17337 17.341 2.57805 17.341 3C17.341 3.42196 17.1734 3.82663 16.875 4.125L9.75 11.25L6.75 12L7.5 9L14.625 1.875Z"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_40712_3558">
                                    <rect width="18" height="18" fill="white" transform="translate(0.75)" />
                                </clipPath>
                            </defs>
                        </svg>
                        Edit
                    </a>
                </div>
            </div>
        </div>
    </div>
    </div>`;
}

const currencyEncode = num => {
    let strNum = num.toString().split('').reverse();
    let result = [];
    for (let i = 0; i < strNum.length; i++) {
        if (i % 3 == 0 && i != 0) {
            result.push('.');
            result.push(strNum[i]);
        } else result.push(strNum[i]);
    }
    let res = '';
    result.reverse().forEach(element => {
        res += element;
    });
    return res;
}

