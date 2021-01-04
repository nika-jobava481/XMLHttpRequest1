var api = 'https://europroductcms.azurewebsites.net/api/fetchProducysStepByStep/0/100';

var select = document.querySelector("#selectProduct");
var allOptions = document.querySelectorAll("#opt");
var select = document.querySelector("select");
var loadingAnim = document.querySelector(".spinner-border");
var cardArea = document.querySelector("#card-area");

var xmlHttpReq = new XMLHttpRequest();
xmlHttpReq.open("GET", api);
xmlHttpReq.onloadend = function () {
    var objects = JSON.parse(xmlHttpReq.responseText);
    addSelectionData(objects);
    loadingAnim.style.display = "none";
}
xmlHttpReq.send();

function addSelectionData(products) {
    for (var i = 0; i < products.length; i++) {
        select.innerHTML += getSelectionHtml(products[i]);
    }
    getEventListenersAndGetElements();
}

var cardIdNumber;

function getSelectionHtml(obj) {
    return `<option value="${obj.Id}" id="opt">${obj.Name}</option>`
}

function getEventListenersAndGetElements() {
    select.addEventListener("change", function () {
        cardIdNumber = this.value;

        getProductCard();
    });
}




function getProductCard() {
    var api2 = `https://europroductcms.azurewebsites.net/api/getProductById/${cardIdNumber}`;

    var xmlHttpReq1 = new XMLHttpRequest();
    xmlHttpReq1.open("GET", api2);
    xmlHttpReq1.onloadend = function () {
        var objects = JSON.parse(xmlHttpReq1.responseText);
        addProductData(objects);
    }
    xmlHttpReq1.send();
}


function addProductData(products) {
    cardArea.innerHTML = getProductHtml(products);
}

function getProductHtml(obj) {
    return `        <div class="card">
    <div class="card-top">
        <div class="img-area"><img
                src="${obj.MainImageUrl}"
                alt=""></div>
        <div class="header-area">
            <h2>${obj.Name}</h2>
            <p><i class="fas fa-tag"></i>&nbsp; ${obj.OtherCategories["0"].Name}</p>
        </div>
    </div>
    <div class="card-bottom">
        <h2>შემადგენლობა</h2>
        ${obj.LongDescription}
    </div>
</div>
</div>`
}