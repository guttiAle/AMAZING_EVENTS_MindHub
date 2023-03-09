const xcaja = document.getElementById( 'caja-main' )
const xcategoria = document.getElementById( 'div-filtros' )
const xbusqueda = document.getElementById('barra-busqueda')
// ----------------------------------- CREADO DE CATEGORIAS -----------------------------------

function crearCategorias (elementoCategoria, iterador){
    return `
    <div class="input-group mb-0 d-flex flex-row align-items-center">
        <div class="">
            <input class="form-check-input mt-0" type="checkbox" value="${elementoCategoria[iterador]}" aria-label="Checkbox for following text input" style="width: 1.5rem; height: 1.5rem;">
        </div>
        <p class="ms-0" style="margin: 0; text-align: center; width: 5rem;">${elementoCategoria[iterador]}</p>
    </div>
    `
}

function pintarCategorias( listaCategorias, elemento ){
    let template = ''
    for (let j = 0; j < listaCategorias.length; j++){
        template += crearCategorias( listaCategorias, j )
    }
    elemento.innerHTML = template
}

function quitarRepetidos( listaData ){
    let hashSet = new Set()
    for (let i of listaData.events){
        hashSet.add(i.category)
    }
    let arr = Array.from(hashSet)
    pintarCategorias(arr, xcategoria)
}

quitarRepetidos(data)
// ------------------------------------------ FILTRADO POR CATEGORIAS ---------------------------------------------------

let checks = document.querySelectorAll('.form-check-input')
pintarTarjetas(data.events, xcaja)

let mySet = new Set()

function llamadorCategorias(listaBusqueda){
    let contador = 0
    checks.forEach((e)=>{
        if (e.checked == true){
            mySet.add(e.value)
            contador += 1
        } else {
            mySet.delete(e.value)
        }
    })
    let listaCategoriaSeleccionada = Array.from(mySet)
    return comparadorDeCategorias(listaCategoriaSeleccionada, listaBusqueda, contador)
}

function comparadorDeCategorias(listaCat, listaRecibida, contador){
    let listaComparadora = []
    for (let i = 0; i < listaRecibida.length; i++){
        if ( listaCat.includes(listaRecibida[i].category)){
            listaComparadora.push(listaRecibida[i])
        }
    }
    if (contador == 0 && listaComparadora.length == 0){
        return listaRecibida
    } else {
        return listaComparadora
    }
}

// ------------------------------ FILTRADO POR BARRA DE BUSQUEDA -----------------------------------------

let mySet2 = new Set()
function comparadorDeBusqueda(){
    let stringBusqueda = xbusqueda.value
    for (let i = 0; i < data.events.length; i++){
        if (((data.events[i].name).toLowerCase()).includes(stringBusqueda.toLowerCase())){
            mySet2.add(data.events[i])
        } else {
            mySet2.delete(data.events[i])
        }
    }
    let listaCategoriasBusqueda = Array.from(mySet2)
    return listaCategoriasBusqueda
}

// ------------------------------------ FILTRADO CRUZADO --------------------------------------------------

xcategoria.addEventListener( 'change', e => {
    pintarTarjetas( filtroCruzado(), xcaja  )
} )

xbusqueda.addEventListener( 'input', e =>{
    pintarTarjetas( filtroCruzado(), xcaja  )
})

function filtroCruzado(){
    return llamadorCategorias( comparadorDeBusqueda())
}

// ----------------------------------- CREADO DE TARJETAS ---------------------------------------------------

function crearTarjetaConInner( elementoTarjeta ){
    return `
    <div class="card" style="width: 18rem; height: 23rem;">
        <img src="${elementoTarjeta.image}" class="card-img-top" alt="imagen-${elementoTarjeta.name}" style="height: 10rem;">
        <div class="card-body d-flex justify-content-end gap-2 flex-column">
            <h5 class="card-title">${elementoTarjeta.name}</h5>
            <p class="card-text">${elementoTarjeta.description}</p>
            <a href="./details.html?id=${elementoTarjeta._id}&${elementoTarjeta.name}" class="btn btn-primary">Check it</a>
        </div>
    </div>
    ` 
}

function pintarTarjetas( listaData, elemento ){
    let template = ''
    if (listaData.length == 0){
        template += `<h1>No matches found</h1>`
    } else {
        try {
            for (let i of listaData){
                if (i.category){
                    template += crearTarjetaConInner( i )
                }
            }
            } catch (err) {
                template += `<h1>No matches found</h1>`
            }
    }
    elemento.innerHTML = template
}
