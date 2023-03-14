const tableOne = document.getElementById('table-1')
const tableTwo = document.getElementById('table-2')
const tableThree = document.getElementById('table-3')
const firstTR = document.getElementById('tr-1')

// ----------------------------------- API MindHub -----------------------------------

const url = 'https://mindhub-xj03.onrender.com/api/amazing'

let bgData = []
let upcomingEvents
let pastEvents
let firstTable = []

fetch(url)
    .then(res => res.json())
    .then(json => {
        bgData = json
        upcomingEvents = bgData.events.filter(datum  => datum.date > bgData.currentDate)
        pastEvents = bgData.events.filter(datum  => datum.date < bgData.currentDate)
        highestAttendance(pastEvents)
        lowestAttendance(pastEvents)
        largestCapacity(bgData.events)
        renderTable1(firstTable)
        juntadoraTabla2(upcomingEvents)
        juntadoraTabla3(pastEvents)

    })
    .catch(err => console.log(err))

// ----------------------------------- MAX-MIN ATTENDACE & LARGEST CAPACITY (1st <tr>)  -----------------------------------

function highestAttendance(list){
    let porcentajeAsistencia = list.map(event => (event.assistance * 100) / event.capacity)
    let max = Math.max(...porcentajeAsistencia)

    firstTable.push(bgData.events[(porcentajeAsistencia.indexOf(max))])
}

function lowestAttendance(list){
    let porcentajeAsistencia = list.map(event => (event.assistance * 100) / event.capacity)
    let min = Math.min(...porcentajeAsistencia)
    
    firstTable.push(bgData.events[(porcentajeAsistencia.indexOf(min))])
}

function largestCapacity(list){
    let capacity = list.map(event => event.capacity)
    let max = Math.max(...capacity)
    
    firstTable.push(bgData.events[capacity.indexOf(max)])
}

// ----------------------------------- RENDER FIRST TABLE  -----------------------------------

function createTable1(obj){ 
    return `
    <td>${obj.name}</td>
    `
}

function renderTable1(list, container=firstTR){
    let template = ""
    for(let i of list){
        template += createTable1(i)
    }
    container.innerHTML = template
}

// ----------------------------------- 2nd table -----------------------------------

function quitarRepetidos( listaData ){
    let hashSet = new Set()
    for (let i of listaData){
        hashSet.add(i.category)
    }
    let arr = Array.from(hashSet)
    return arr
}

function calculadoraGanancias(list){
    let categoriasUpcoming = quitarRepetidos(list)
    let dict = {}
    for (let i of categoriasUpcoming){
        dict[i] = 0
        for (j of list){
            if (j.category.includes(i)){
                dict[i] += (j.estimate*j.price)
            }
        }
    }
    return dict
}

function calculadoraAsistencia(list){
    let categoriasUpcoming = quitarRepetidos(list)
    let dict = {}
    let contador 
    for (let i of categoriasUpcoming){
        dict[i] = 0
        contador = 0
        for (let j=0; j < list.length; j++){
            if (list[j].category.includes(i)){
                dict[i] += ((list[j].estimate*100) / list[j].capacity)
                contador += 1
            }
        }
        dict[i] = dict[i] / contador
    }
    return dict
}

function juntadoraTabla2(listaEvFuturos){
    let nombresCategorias = quitarRepetidos(listaEvFuturos)
    let gananciasCategorias = calculadoraGanancias(listaEvFuturos)
    let asistenciaCategorias = calculadoraAsistencia(listaEvFuturos)
    template= `
    <tr>
        <th colspan="3" class="fs-4 text col-4">Upcoming events statistics by category</th>
    </tr>
    <tr>
        <th class="col-4">Categories</th>
        <th class="col-4">Revenues</th>
        <th>Percentage of attendance</th>
    </tr>
    `
    for(let i = 0; i < nombresCategorias.length; i++){
        template += createTable_2(nombresCategorias[i], gananciasCategorias[nombresCategorias[i]], parseInt(asistenciaCategorias[nombresCategorias[i]]))
    }
    tableTwo.innerHTML = template
}


function createTable_2(nombre, ganancia, asistencia){ 
    return `
    <tr>
        <td>${nombre}</td>
        <td>${ganancia}</td>
        <td>${asistencia}%</td>
    </tr>   
    `
}

// ----------------------------------- 3rd table -----------------------------------
function quitarRepetidos3( listaData ){
    let hashSet = new Set()
    for (let i of listaData){
        hashSet.add(i.category)
    }
    let arr = Array.from(hashSet)
    return arr
}

function juntadoraTabla3(listaEvPasados){
    let nombresCategorias3 = quitarRepetidos3(listaEvPasados)
    let gananciasCategorias3 = calculadoraGanancias3(listaEvPasados)
    let asistenciaCategorias3 = calculadoraAsistencia3(listaEvPasados)
    template2= `
    <tr>
        <th colspan="3" class="fs-4 text col-4">Past events statistics by category</th>
    </tr>
    <tr>
        <th class="col-4">Categories</th>
        <th class="col-4">Revenues</th>
        <th>Percentage of attendance</th>
    </tr>
    `
    for(let i = 0; i < nombresCategorias3.length; i++){
        template2 += createTable_3(nombresCategorias3[i], gananciasCategorias3[nombresCategorias3[i]], parseInt(asistenciaCategorias3[nombresCategorias3[i]]))
    }
    tableThree.innerHTML = template2
}

function createTable_3(nombre, ganancia, asistencia){ 
    return `
    <tr>
        <td>${nombre}</td>
        <td>${ganancia}</td>
        <td>${asistencia}%</td>
    </tr>   
    `
}

function calculadoraGanancias3(list){
    let categoriasPast = quitarRepetidos(list)
    let dict2 = {}
    for (let i of categoriasPast){
        dict2[i] = 0
        for (j of list){
            if (j.category.includes(i)){
                dict2[i] += (j.assistance*j.price)
            }
        }
    }
    return dict2
}

function calculadoraAsistencia3(list){
    let categoriasPast = quitarRepetidos3(list)
    let dict = {}
    let contador 
    for (let i of categoriasPast){
        dict[i] = 0
        contador = 0
        for (let j = 0; j < list.length; j++){
            if (list[j].category.includes(i)){
                dict[i] += ((list[j].assistance*100) / list[j].capacity)
                contador += 1
            }
        }
        dict[i] = dict[i] / contador
    }
    return dict
}
