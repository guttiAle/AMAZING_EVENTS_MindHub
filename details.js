const container = document.getElementById('caja-main-details')
// ----------------------------------- API MindHub -----------------------------------
const url = 'https://mindhub-xj03.onrender.com/api/amazing'

let bgData = []
const params = new URLSearchParams(location.search)
const id = params.get("id")

let evento
fetch(url)
    .then(res => res.json())
    .then(json => {
        bgData = json
        evento = bgData.events.find(element => element._id == id)
        renderCard(evento, container)
    })



function createCard(obj){
    return `
    <div style="height: 45vh; border: 2px ridge rgba(38, 0, 255, 0.325); border-radius: 10px; background-image: url(${obj.image}); background-size: cover;" class="col-md-5 col-10"></div>
    <div style="height: 45vh;" class="col-sm-6 col-10 text-secondary d-flex flex-column justify-content-center">
        <h3 class="fs-1 text">${obj.name}</h3>
        <p class="fs-5 text">Date: ${obj.date}</p>
        <p class="fs-5 text">${obj.description}</p>
        <p class="fs-5 text">Place: ${obj.place}</p>
        <p class="fs-5 text">Price: ${obj.price}</p>
    </div>
    `
}

function renderCard(obj, element){
    let template = ""
    template += createCard(obj)
    element.innerHTML = template
}