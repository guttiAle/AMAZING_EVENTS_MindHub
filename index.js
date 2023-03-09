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
        for (let i of listaData.events){
            template += crearTarjetaConInner( i )
        }
        elemento.innerHTML = template
    }
    
    pintarTarjetas(data, xcaja)