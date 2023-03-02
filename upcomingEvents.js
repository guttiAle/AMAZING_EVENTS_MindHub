const xcaja = document.getElementById( 'caja-main' )

function crearTarjetaConInner( elementoTarjeta ){
    return `
<div class="card" style="width: 18rem; height: 23rem;">
    <img src="${elementoTarjeta.image}" class="card-img-top" alt="imagen-${elementoTarjeta.name}" style="height: 10rem;">
    <div class="card-body d-flex justify-content-end gap-2 flex-column">
        <h5 class="card-title">${elementoTarjeta.name}</h5>
        <p class="card-text">${elementoTarjeta.description}</p>
        <a href="./details.html" class="btn btn-primary">Check it</a>
    </div>
</div>
` 
}

function pintarTarjetas( listaData, elemento ){
    let template = ''
    for (let i of listaData){
        template += crearTarjetaConInner( i )
    }
    elemento.innerHTML = template
}

function filtrador(lista){
    eventosFuturos = []
    for ( let q of lista.events){
        if(q.date > lista.currentDate){
            eventosFuturos.push(q)
        }
    }
    pintarTarjetas(eventosFuturos, xcaja)
}

filtrador(data)
