let comicweb = [];
document.addEventListener('DOMContentLoaded', async (e) => {
    comicweb = await LoadDataV2();

    const marvelContainer = document.getElementById('marvel-container');
    const dcContainer = document.getElementById('dc-container');
    let modal = document.getElementById('myModal');
    let span = document.getElementsByClassName("close")[0];

  


    comicweb.forEach(heroe => {
        const card = crearCard(heroe);

        if (heroe.universo === 'Marvel') {
            marvelContainer.appendChild(card);

        } else if (heroe.universo === 'DC') {
            dcContainer.appendChild(card);
        }

    });

    // comicweb.forEach(heroe => {
    //     const universoFiltro = selectFilter.value;
    //     const nombreFiltro = inputFilter.value;

    //     if(universoFiltro == "todo" || heroe.universo == universoFiltro){
    //         return 
    //     }
    // });

    const verBotones = document.querySelectorAll('[id-heroe]')

    verBotones.forEach(verBoton => {
        verBoton.addEventListener('click',()=>{
            modal.style.display = "block";
            const idHeroe = Number(verBoton.getAttribute("id-heroe"));
            const heroe= comicweb.find(heroe => heroe.id === idHeroe);
            console.log(heroe);
            crearModal(heroe);
            

        })
    })


    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none"
        }

    };


});

async function LoadDataV2() {
    return await fetch("data/personajes.json").then(response => response.json());
};


function crearCard(heroe) {
    const card = document.createElement('div');
    card.classList.add('card');
    let nombre = heroe.nombre.toLowerCase().replace(/\s+/g, '');
    let urlImg = `storage/img/${nombre}.jpeg`

    const imagen = document.createElement('img');
    imagen.src = urlImg;

    const title = document.createElement('h2');
    title.textContent = heroe.nombre;

    const boton = document.createElement('button');
    boton.textContent = "Ver";
    boton.setAttribute("id-heroe", heroe.id);


    card.appendChild(imagen);
    card.appendChild(title);
    card.appendChild(boton);

    
    return card;
}

function crearModal(heroe) {


    const contenido = document.getElementById("modal-content");
    contenido.innerHTML = '';

    let nombre = heroe.nombre.toLowerCase().replace(/\s+/g, '');
    let urlImg = `storage/img/${nombre}.jpeg`

    let imagen = document.createElement("img");
    imagen.src = urlImg;
    contenido.appendChild(imagen);

    let nombreHeroe = document.createElement("h1");
    nombreHeroe.textContent = heroe.nombre;
    contenido.appendChild(nombreHeroe);

    let aliasElement = document.createElement("p");
    aliasElement.textContent = "Alias: " + heroe.alias;
    contenido.appendChild(aliasElement);

    let poderesElement = document.createElement("ul");
    heroe.poderes.forEach(function (poder) {
        let poderElement = document.createElement("li");
        poderElement.textContent = poder;
        poderesElement.appendChild(poderElement);
    });
    contenido.appendChild(poderesElement);

    let descripcionElement = document.createElement("p");
    descripcionElement.textContent = "Descripción: " + heroe.descripcion;
    contenido.appendChild(descripcionElement);

    let grupoElement = document.createElement("p");
    grupoElement.textContent = "Grupo: " + heroe.grupo;
    contenido.appendChild(grupoElement);
}
